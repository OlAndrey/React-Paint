import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface CanvasState {
  canvas: HTMLCanvasElement | null
  socket: WebSocket | null
  userName: string
  room: string
  canvasUsers: number
  undoList: string[]
  redoList: string[]
}

const initialState: CanvasState = {
  canvas: null,
  socket: null,
  userName: '',
  room: '',
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
    setSocket: (state, action: PayloadAction<WebSocket>) => {
      state.socket = action.payload
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload
    },
    setRoom: (state, action: PayloadAction<string>) => {
      state.room = action.payload
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
  setSocket,
  setUserName,
  setRoom,
  setCanvasUsers,
  pushToUndo,
  popToUndo,
  pushToRedo,
  popToRedo
} = canvasSlice.actions

export default canvasSlice.reducer
