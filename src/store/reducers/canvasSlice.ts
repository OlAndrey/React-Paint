import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface CanvasState {
  canvas: HTMLCanvasElement | null
}

const initialState: CanvasState = {
  canvas: null
}

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setCanvas: (state, action: PayloadAction<any>) => {
      state.canvas = action.payload
    },
  }
})

export const { setCanvas } = canvasSlice.actions

export default canvasSlice.reducer
