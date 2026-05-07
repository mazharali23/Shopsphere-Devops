import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

type User = {
  id: string;
  email: string;
  full_name: string;
  role: "customer" | "admin";
};

type AuthState = {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null
};

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (payload: { email: string; password: string; fullName: string }) => {
    const res = await api.post("/v1/auth/register", payload);
    return res.data.data as { user: User; accessToken: string };
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }) => {
    const res = await api.post("/v1/auth/login", payload);
    return res.data.data as { user: User; accessToken: string };
  }
);

export const meThunk = createAsyncThunk("auth/me", async () => {
  const res = await api.get("/v1/auth/me");
  return (res.data.data as { user: User }).user;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem("accessToken");
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(registerThunk.fulfilled, (s, a) => {
        s.status = "succeeded";
        localStorage.setItem("accessToken", a.payload.accessToken);
        s.user = a.payload.user;
      })
      .addCase(registerThunk.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.error.message || "Register failed";
      })
      .addCase(loginThunk.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(loginThunk.fulfilled, (s, a) => {
        s.status = "succeeded";
        localStorage.setItem("accessToken", a.payload.accessToken);
        s.user = a.payload.user;
      })
      .addCase(loginThunk.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.error.message || "Login failed";
      })
      .addCase(meThunk.fulfilled, (s, a) => {
        s.user = a.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

