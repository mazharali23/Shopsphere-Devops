import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export type Order = {
  id: string;
  status: string;
  total_cents: number;
  currency: string;
  created_at: string;
};

type OrdersState = {
  items: Order[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: OrdersState = {
  items: [],
  status: "idle",
  error: null
};

export const fetchOrdersThunk = createAsyncThunk("orders/list", async () => {
  const res = await api.get("/v1/orders");
  return res.data.data as Order[];
});

export const checkoutThunk = createAsyncThunk(
  "orders/checkout",
  async (shippingAddress: Record<string, string>) => {
    const res = await api.post("/v1/orders", { shippingAddress });
    return res.data.data as Order;
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersThunk.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(fetchOrdersThunk.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.items = a.payload;
      })
      .addCase(fetchOrdersThunk.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.error.message || "Failed to load orders";
      })
      .addCase(checkoutThunk.fulfilled, (s, a) => {
        s.items = [a.payload, ...s.items];
      });
  }
});

export default ordersSlice.reducer;

