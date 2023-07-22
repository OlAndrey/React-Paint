import { useEffect, useState } from 'react'
import { ITool } from '../types/tools'
import Tools from '../tools/Tool'
import Pencil from '../tools/Pencil'
import Line from '../tools/Line'
import Rect from '../tools/Rect'
import Circle from '../tools/Circle'
import Eraser from '../tools/Eraser'
import Fill from '../tools/Fill'

export const useTool = (canvas: HTMLCanvasElement | null, toolName: string, socket: WebSocket | null, room: string) => {
  const [tool, setTool] = useState<ITool>()

  useEffect(() => {
    if (canvas && socket) {
      let currentTool = null
      switch (toolName) {
        case 'pencil':
          currentTool = new Pencil(canvas, socket, room)
          break

        case 'line':
          currentTool = new Line(canvas, socket, room)
          break

        case 'rect':
          currentTool = new Rect(canvas, socket, room)
          break

        case 'circle':
          currentTool = new Circle(canvas, socket, room)
          break

        case 'eraser':
          currentTool = new Eraser(canvas, socket, room)
          break

        case 'fill':
          currentTool = new Fill(canvas, socket, room)
          break

        default:
          currentTool = new Tools(canvas, room)
          break
      }
      setTool(currentTool)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toolName, canvas])
  return tool
}
