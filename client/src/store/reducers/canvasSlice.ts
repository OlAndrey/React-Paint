import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface CanvasState {
  canvas: HTMLCanvasElement | null
  undoList: string[]
  redoList: string[]
}

const initialState: CanvasState = {
  canvas: null,
  undoList: [],
  redoList: []
}

export const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    setCanvas: (state, action: PayloadAction<any>) => {
      state.canvas = action.payload
    },
    pushToUndo: (state, action: PayloadAction<string>) => {
      state.undoList.push(action.payload)
    },
    popToUndo: (state) => {
      state.undoList.pop()
    },
    pushToRedo: (state, action: PayloadAction<string>) => {
      state.redoList.push(action.payload)
    },
    popToRedo: (state) => {
      state.redoList.pop()
    },
  }
})

export const { setCanvas, pushToUndo, popToUndo, pushToRedo, popToRedo } = canvasSlice.actions

export default canvasSlice.reducer
