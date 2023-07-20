import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface CanvasState {
  canvas: HTMLCanvasElement | null
  userName: string
  canvasUsers: number
  undoList: string[]
  redoList: string[]
}

const initialState: CanvasState = {
  canvas: null,
  userName: '',
  canvasUsers: 0,
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
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload
    },
    setCanvasUsers: (state, action: PayloadAction<number>) => {
      state.canvasUsers = action.payload
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
    }
  }
})

export const {
  setCanvas,
  setUserName,
  setCanvasUsers,
  pushToUndo,
  popToUndo,
  pushToRedo,
  popToRedo
} = canvasSlice.actions

export default canvasSlice.reducer
