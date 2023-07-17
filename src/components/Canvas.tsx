import { FC, MutableRefObject, useEffect, useRef } from 'react'
import '../styles/canvas.css'

type CanvasPropsType = {
  setCanvas: (canvas: HTMLCanvasElement) => void
}

const Canvas: FC<CanvasPropsType> = ({ setCanvas }) => {
  const canvRef = useRef() as MutableRefObject<HTMLCanvasElement>

  useEffect(() => {
    if (canvRef.current) setCanvas(canvRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvRef.current])

  return (
    <div className="canvas">
      <canvas ref={canvRef} width={600} height={400} id="canvas" />
    </div>
  )
}

export default Canvas
