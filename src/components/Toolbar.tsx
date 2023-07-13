import '../styles/toolbar.css'
import { toolbarDataLeft, toolbarDataRight } from '../utils/toolBar'
import Pencil from '../tools/Pencil'
import Rect from '../tools/Rect'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { setTool } from '../store/reducers/toolSlice'

const ToolBar = () => {
  const { canvas } = useAppSelector((state) => state.canvas)
  const { tool } = useAppSelector((state) => state.tool)
  const dispatch = useAppDispatch()

  const selectedTool = (selectedTool: string) => {
    if (canvas) {
      new Pencil(canvas)
      if (tool === selectedTool) {
        dispatch(setTool(''))
      } else dispatch(setTool(selectedTool))
    }
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
