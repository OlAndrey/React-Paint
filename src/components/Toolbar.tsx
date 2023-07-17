import { useEffect } from 'react'
import '../styles/toolbar.css'
import { toolbarDataLeft, toolbarDataRight } from '../utils/toolBar'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { setTool, setToolColor, setToolLineWidth, setToolName } from '../store/reducers/toolSlice'
import Tools from '../tools/Tool'
import Pencil from '../tools/Pencil'
import Line from '../tools/Line'
import Rect from '../tools/Rect'
import Circle from '../tools/Circle'
import Eraser from '../tools/Eraser'
import Fill from '../tools/Fill'

const ToolBar = () => {
  const { canvas } = useAppSelector((state) => state.canvasState)
  const { tool, toolName, toolColor, toolLineWidth } = useAppSelector((state) => state.toolState)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (canvas) {
      let currentTool = null
      switch (toolName) {
        case 'pencil':
          currentTool = new Pencil(canvas)
          break

        case 'line':
          currentTool = new Line(canvas)
          break

        case 'rect':
          currentTool = new Rect(canvas)
          break

        case 'circle':
          currentTool = new Circle(canvas)
          break

        case 'eraser':
          currentTool = new Eraser(canvas)
          break

        case 'fill':
          currentTool = new Fill(canvas)
          break

        default:
          currentTool = new Tools(canvas)
          break
      }
      dispatch(setTool(currentTool))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toolName, canvas])

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
