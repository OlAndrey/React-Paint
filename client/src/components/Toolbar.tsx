import '../styles/toolbar.css'
import { toolbarData } from '../utils/toolBar'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { setToolColor, setToolLineWidth, setToolName } from '../store/reducers/toolSlice'
import { undo, redo } from '../store/reducers/ActionCreator'
import { useTool } from '../hooks/toolbar'
import Icon from './Icon'

type ToolBarPropsType = {
  canvas: HTMLCanvasElement | null
  socket: WebSocket | null
}

const ToolBar: React.FC<ToolBarPropsType> = ({ canvas, socket }) => {
  const { room, canvasUsers, redoList, undoList } = useAppSelector((state) => state.canvasState)
  const { toolName, toolColor, toolLineWidth } = useAppSelector((state) => state.toolState)
  const tool = useTool(canvas, toolName, socket, room)
  const dispatch = useAppDispatch()

  const selectedTool = (selectedTool: string) => {
    if (toolName === selectedTool) {
      dispatch(setToolName(''))
      if (tool) tool.destroyEvent()
    } else dispatch(setToolName(selectedTool))
  }

  return (
    <div className="toolbar">
      {toolbarData.map((item, index) => (
        <button
          key={index}
          className={'toolbar__btn ' + (toolName === item.name ? 'toolbar__btn-active' : '')}
          onClick={() => selectedTool(item.name)}
        >
          <Icon name={item.src} />
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

      <div className="toolbar__user-num">
        <Icon name="EyeIcon" fill="none" />
        {canvasUsers}
      </div>

      <button
        className="toolbar__btn"
        disabled={!undoList.length}
        onClick={() => {
          if (canvas) dispatch(undo(canvas, undoList[undoList.length - 1]))
        }}
      >
        <Icon name="UndoIcon" fill="none" />
      </button>

      <button
        className="toolbar__btn"
        disabled={!redoList.length}
        onClick={() => {
          if (canvas) dispatch(redo(canvas, redoList[redoList.length - 1]))
        }}
      >
        <Icon name="RedoIcon" fill="none" />
      </button>
      <button className="toolbar__btn">
        <Icon name="SaveIcon" />
      </button>
    </div>
  )
}

export default ToolBar
