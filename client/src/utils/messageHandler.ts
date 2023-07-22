import Line from '../tools/Line'
import Pencil from '../tools/Pencil'
import { IStaticDraw, IStaticDrawLine, IStaticDrawPencil } from '../types/tools'

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

      case 'draw-finish':
        if (ctx) {
          ctx.beginPath()
        }
        break

      default:
        console.warn(`Type: ${type} unknown`)
        break
    }
  }
}
