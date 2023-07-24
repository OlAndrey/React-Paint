import { FC, MouseEvent, MutableRefObject, useEffect, useRef } from 'react'
import '../styles/canvas.css'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { pushToUndo } from '../store/reducers/canvasSlice'
import { getImage, postImage } from '../utils/fetchImage'

type CanvasPropsType = {
  setCanvas: (canvas: HTMLCanvasElement) => void
}

const Canvas: FC<CanvasPropsType> = ({ setCanvas }) => {
  const canvRef = useRef() as MutableRefObject<HTMLCanvasElement>
  const dispatch = useAppDispatch()
  const { room } = useAppSelector((state) => state.canvasState)

  useEffect(() => {
    if (canvRef.current) setCanvas(canvRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvRef.current])

  useEffect(() => {
    if (room) {
      getImage(canvRef.current, room)
    }
  }, [room])

  const mouseDownHandler = (e: MouseEvent) => {
    const target = e.target as HTMLCanvasElement
    dispatch(pushToUndo(target.toDataURL()))
  }

  return (
    <div className="canvas">
      <canvas
        onMouseDown={mouseDownHandler}
        onMouseUp={() => postImage(canvRef.current, room)}
        ref={canvRef}
        width={600}
        height={400}
        id="canvas"
      />
    </div>
  )
}

export default Canvas
