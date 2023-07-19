import { useEffect, useState } from 'react'
import { ITool } from '../types/tools'
import Tools from '../tools/Tool'
import Pencil from '../tools/Pencil'
import Line from '../tools/Line'
import Rect from '../tools/Rect'
import Circle from '../tools/Circle'
import Eraser from '../tools/Eraser'
import Fill from '../tools/Fill'

export const useTool = (canvas: HTMLCanvasElement | null, toolName: string) => {
  const [tool, setTool] = useState<ITool>()

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
      setTool(currentTool)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toolName, canvas])
  return tool
}
