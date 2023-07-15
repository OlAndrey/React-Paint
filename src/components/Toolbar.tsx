import { useEffect } from 'react'
import '../styles/toolbar.css'
import { toolbarDataLeft, toolbarDataRight } from '../utils/toolBar'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { setTool } from '../store/reducers/toolSlice'
import Tools from '../tools/Tool'
import Pencil from '../tools/Pencil'
import Line from '../tools/Line'
import Rect from '../tools/Rect'
import Circle from '../tools/Circle'
import Eraser from '../tools/Eraser'
import Fill from '../tools/Fill'

const ToolBar = () => {
  const { canvas } = useAppSelector((state) => state.canvasState)
  const { tool } = useAppSelector((state) => state.toolState)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (canvas) {
      switch (tool) {
        case 'pencil':
          new Pencil(canvas)
          break

        case 'line':
          new Line(canvas)
          break

        case 'rect':
          new Rect(canvas)
          break

        case 'circle':
          new Circle(canvas)
          break

        case 'eraser':
          new Eraser(canvas)
          break

        case 'fill':
          new Fill(canvas)
          break

        default:
          new Tools(canvas)
          break
      }
    }
  }, [tool, canvas])

  const selectedTool = (selectedTool: string) => {
    if (tool === selectedTool) dispatch(setTool(''))
    else dispatch(setTool(selectedTool))
  }

  return (
    <div className="toolbar">
      {toolbarDataLeft.map((item, index) => (
        <button
          key={index}
          className={'toolbar__btn ' + (tool === item.name ? 'toolbar__btn-active' : '')}
          onClick={() => selectedTool(item.name)}
        >
          <img alt={item.name} src={item.src} />
        </button>
      ))}

      <input style={{ marginLeft: 10 }} type="color" />

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
