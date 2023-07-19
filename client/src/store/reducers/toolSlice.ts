import { PayloadAction, createSlice } from '@reduxjs/toolkit'
// import { ITool } from '../../types/tools'

interface ToolState {
  // tool: ITool | null
  toolName: string
  toolColor: string
  toolLineWidth: number
}

const initialState: ToolState = {
  // tool: null,
  toolName: '',
  toolColor: '#000000',
  toolLineWidth: 1
}

export const toolSlice = createSlice({
  name: 'tool',
  initialState,
  reducers: {
    // setTool: (state, action: PayloadAction<any>) => {
    //   state.tool = action.payload
    // },
    setToolName: (state, action: PayloadAction<string>) => {
      state.toolName = action.payload
    },
    setToolColor: (state, action: PayloadAction<string>) => {
      state.toolColor = action.payload
    },
    setToolLineWidth: (state, action: PayloadAction<number>) => {
      state.toolLineWidth = action.payload
    },
  }
})

export const { setToolName, setToolColor, setToolLineWidth } = toolSlice.actions

export default toolSlice.reducer
