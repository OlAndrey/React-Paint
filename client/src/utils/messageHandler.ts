import Pencil from '../tools/Pencil'
import Line from '../tools/Line'
import Rect from '../tools/Rect'
import Circle from '../tools/Circle'
import Eraser from '../tools/Eraser'
import {
  IStaticDraw,
  IStaticDrawCircle,
  IStaticDrawEraser,
  IStaticDrawFill,
  IStaticDrawLine,
  IStaticDrawPencil,
  IStaticDrawRect
} from '../types/tools'
import Fill from '../tools/Fill'

export const messageHandler = (
  obj: {
    type: string
    params: { [k: string]: string | number | IStaticDraw }
  },
  canvas: HTMLCanvasElement | null,
  infoConnect: (numm: number) => void,
  infoRoom: (a: any, b: boolean) => void
) => {
  const type = obj.type
  const params = obj.params
  if (canvas) {
    const ctx = canvas.getContext('2d')

    switch (type) {
      case 'info-room':
        infoConnect(params.clients as number)
        break

      case 'info-connect':
        infoRoom(params, true)
        break

      case 'info-leave':
        infoRoom(params, false)
        break

      case 'draw-pencil':
        Pencil.staticDraw(ctx, params.args as IStaticDrawPencil)
        break

      case 'draw-line':
        Line.staticDraw(ctx, params.args as IStaticDrawLine)
        break

      case 'draw-rect':
        Rect.staticDraw(ctx, params.args as IStaticDrawRect)
        break

      case 'draw-circle':
        Circle.staticDraw(ctx, params.args as IStaticDrawCircle)
        break

      case 'draw-eraser':
        Eraser.staticDraw(ctx, params.args as IStaticDrawEraser)
        break

      case 'draw-fill':
        Fill.staticFill(ctx, params.args as IStaticDrawFill)
        break

      case 'draw-finish':
        if (ctx) ctx.beginPath()
        break

      default:
        console.warn(`Type: ${type} unknown`)
        break
    }
  }
}
