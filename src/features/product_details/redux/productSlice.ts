import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Product } from '../../../types/product'
import { fetchProductById } from '../api/productApi'

interface ProductState {
  product: Product | null
  loading: boolean
  error: string | null
}

const initialState: ProductState = {
  product: null,
  loading: false,
  error: null
}

export const getProductById = createAsyncThunk(
  'product/getProductById',
  async (productId: string) => {
    const response = await fetchProductById(productId)
    return response
  }
)

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false
        state.product = action.payload
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch product'
      })
  }
})

export default productSlice.reducer