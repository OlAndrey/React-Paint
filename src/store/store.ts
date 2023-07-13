import { configureStore } from '@reduxjs/toolkit'
import canvasSlice from './reducers/canvasSlice'
import toolSlice from './reducers/toolSlice'

export const store = configureStore({
  reducer: {
    canvas: canvasSlice,
    tool: toolSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch