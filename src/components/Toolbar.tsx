import { FC, useEffect } from 'react'
import '../styles/toolbar.css'
import { toolbarDataLeft, toolbarDataRight } from '../utils/toolBar'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { setToolColor, setToolLineWidth, setToolName } from '../store/reducers/toolSlice'
import { useTool } from '../hooks/toolbar'

type ToolBarPropsType = {
  canvas: HTMLCanvasElement | null
}

const ToolBar: FC<ToolBarPropsType> = ({ canvas }) => {
  const { toolName, toolColor, toolLineWidth } = useAppSelector((state) => state.toolState)
  const tool = useTool(canvas, toolName)
  const dispatch = useAppDispatch()

  useEffect(() => {
    console.log('tool', tool)
  }, [tool])

  const selectedTool = (selectedTool: string) => {
    if (toolName === selectedTool) {
      dispatch(setToolName(''))
      if (tool) tool.destroyEvent()
    } else dispatch(setToolName(selectedTool))
  }

  return (
    <div className="toolbar">
      {toolbarDataLeft.map((item, index) => (
        <button
          key={index}
          className={'toolbar__btn ' + (toolName === item.name ? 'toolbar__btn-active' : '')}
          onClick={() => selectedTool(item.name)}
        >
          <img alt={item.name} src={item.src} />
        </button>
      ))}

      <input
        style={{ width: 100, marginLeft: 10 }}
        type="range"
        min={1}
        max={15}
        step={1}
        value={toolLineWidth}
        onChange={(e) => {
          dispatch(setToolLineWidth(+e.target.value))
          if (tool) tool.setLineWidth(+e.target.value)
        }}
      />

      <input
        style={{ marginLeft: 10 }}
        type="color"
        value={toolColor}
        onChange={(e) => {
          dispatch(setToolColor(e.target.value))
          if (tool) tool.setColor(e.target.value)
        }}
      />

      {toolbarDataRight.map((item, index) => (
        <button
          key={(index + 1) * 5}
          style={index === 0 ? { marginLeft: 'auto' } : {}}
          className={'toolbar__btn'}
        >
          <img alt={item.name} src={item.src} />
        </button>
      ))}
    </div>
  )
}

export default ToolBar
