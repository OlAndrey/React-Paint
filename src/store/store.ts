import { configureStore } from '@reduxjs/toolkit'
import canvasSlice from './reducers/canvasSlice'
import toolSlice from './reducers/toolSlice'

export const store = configureStore({
  reducer: {
    canvasState: canvasSlice,
    toolState: toolSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch