import { IStaticDrawPencil } from '../types/tools'
import Tools from './Tool'

export default class Pencil extends Tools {
  isMouseDown: boolean = false
  socket: WebSocket

  constructor(context: HTMLCanvasElement, socket: WebSocket, room: string) {
    super(context, room)
    this.socket = socket
    this.draw = this.draw.bind(this)
    this.listenEvent()
  }

  listenEvent() {
    this.canv.onmousedown = this.mouseDown.bind(this)
    this.canv.onmouseup = this.mouseUp.bind(this)
    this.canv.onmousemove = this.mouseMove.bind(this)
  }

  mouseDown() {
    this.isMouseDown = true
  }

  mouseUp() {
    this.isMouseDown = false
    if (this.ctx) this.ctx.beginPath()

    if (this.socket) {
      const obj = {
        type: 'draw',
        params: {
          room: this.room,
          func: 'finish'
        }
      }
      this.socket.send(JSON.stringify(obj))

  }}

  mouseMove(e: MouseEvent) {
    const target = e.target as HTMLCanvasElement
    const x = e.pageX - target.offsetLeft
    const y = e.pageY - target.offsetTop
    if (this.isMouseDown) {
      this.draw(x, y)
      if (this.socket) {
        const obj = {
          type: 'draw',
          params: {
            room: this.room,
            func: 'pencil',
            args: {
              x,
              y,
              lineWidth: this.lineWidth,
              color: this.color
            }
          }
        }
        this.socket.send(JSON.stringify(obj))
      }
    }
  }

  draw(x: number, y: number) {
    if (this.ctx) {
      this.ctx.strokeStyle = this.color
      this.ctx.fillStyle = this.color
      this.ctx.lineWidth = this.lineWidth
      this.ctx.lineTo(x, y)
      this.ctx.stroke()

      this.ctx.beginPath()
      this.ctx.arc(x, y, this.lineWidth / 2, 0, Math.PI * 2)
      this.ctx.fill()

      this.ctx.beginPath()
      this.ctx.moveTo(x, y)
    }
  }

  static staticDraw(ctx: CanvasRenderingContext2D | null, args: IStaticDrawPencil) {
    const { x, y, lineWidth, color } = args
    if (ctx) {
      const thisColor = ctx.strokeStyle
      const thisLineWidth = ctx.lineWidth

      ctx.strokeStyle = color
      ctx.fillStyle = color
      ctx.lineWidth = lineWidth
      ctx.lineTo(x, y)
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(x, y, lineWidth / 2, 0, Math.PI * 2)
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(x, y)

      ctx.strokeStyle = thisColor
      ctx.fillStyle = thisColor
      ctx.lineWidth = thisLineWidth
    }
  }
}
