import { useEffect, useRef } from 'react'
import '../styles/canvas.css'
import { useAppDispatch } from '../hooks/redux'
import { setCanvas } from '../store/reducers/canvasSlice'

const Canvas = () => {
  const canvRef = useRef() as React.MutableRefObject<HTMLCanvasElement>
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (canvRef.current) dispatch(setCanvas(canvRef.current))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvRef.current])

  return (
    <div className="canvas">
      <canvas ref={canvRef} width={600} height={400} id="canvas" />
    </div>
  )
}

export default Canvas
