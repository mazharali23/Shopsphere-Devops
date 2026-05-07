import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export type Product = {
  id: string;
  sku: string;
  name: string;
  description: string;
  price_cents: number;
  currency: string;
  image_url: string | null;
  inventory_count: number;
};

type ProductsState = {
  items: Product[];
  selected: Product | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: ProductsState = {
  items: [],
  selected: null,
  status: "idle",
  error: null
};

export const fetchProductsThunk = createAsyncThunk("products/list", async () => {
  const res = await api.get("/v1/products?page=1&limit=24");
  return res.data.data as Product[];
});

export const fetchProductThunk = createAsyncThunk("products/get", async (id: string) => {
  const res = await api.get(`/v1/products/${id}`);
  return res.data.data as Product;
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsThunk.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(fetchProductsThunk.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.items = a.payload;
      })
      .addCase(fetchProductsThunk.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.error.message || "Failed to load products";
      })
      .addCase(fetchProductThunk.fulfilled, (s, a) => {
        s.selected = a.payload;
      });
  }
});

export default productsSlice.reducer;

