import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ToolState {
  tool: string
}

const initialState: ToolState = {
  tool: ''
}

export const toolSlice = createSlice({
  name: 'tool',
  initialState,
  reducers: {
    setTool: (state, action: PayloadAction<string>) => {
      state.tool = action.payload
    }
  }
})

export const { setTool } = toolSlice.actions

export default toolSlice.reducer
