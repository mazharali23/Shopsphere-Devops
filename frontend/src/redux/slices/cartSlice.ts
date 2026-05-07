import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export type CartItem = {
  id: string;
  product_id: string;
  quantity: number;
  name: string;
  price_cents: number;
  currency: string;
  image_url: string | null;
  inventory_count: number;
};

type CartState = {
  items: CartItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: CartState = {
  items: [],
  status: "idle",
  error: null
};

export const fetchCartThunk = createAsyncThunk("cart/get", async () => {
  const res = await api.get("/v1/cart");
  return (res.data.data as { items: CartItem[] }).items;
});

export const upsertCartThunk = createAsyncThunk(
  "cart/upsert",
  async (payload: { productId: string; quantity: number }) => {
    const res = await api.put("/v1/cart/items", payload);
    return (res.data.data as { items: CartItem[] }).items;
  }
);

export const removeCartThunk = createAsyncThunk("cart/remove", async (productId: string) => {
  const res = await api.delete(`/v1/cart/items/${productId}`);
  return (res.data.data as { items: CartItem[] }).items;
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart(state) {
      state.items = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartThunk.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(fetchCartThunk.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.items = a.payload;
      })
      .addCase(fetchCartThunk.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.error.message || "Failed to load cart";
      })
      .addCase(upsertCartThunk.fulfilled, (s, a) => {
        s.items = a.payload;
      })
      .addCase(removeCartThunk.fulfilled, (s, a) => {
        s.items = a.payload;
      });
  }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;

