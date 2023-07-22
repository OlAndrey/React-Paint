import { IStaticDrawLine } from '../types/tools'
import Tools from './Tool'

export default class Line extends Tools {
  startX: number = 0
  startY: number = 0
  saved: string = ''
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

  mouseDown(e: MouseEvent) {
    this.isMouseDown = true
    const target = e.target as HTMLCanvasElement
    this.startX = e.pageX - target.offsetLeft
    this.startY = e.pageY - target.offsetTop
    if (this.ctx) {
      this.ctx.beginPath()
      this.ctx.moveTo(this.startX, this.startY)
    }

    this.saved = this.canv.toDataURL()
  }

  mouseUp(e: MouseEvent) {
    const target = e.target as HTMLCanvasElement
    const x = e.pageX - target.offsetLeft
    const y = e.pageY - target.offsetTop
    this.isMouseDown = false
    if (this.ctx) {
      this.ctx.beginPath()
    }
    if (this.socket) {
      const obj = {
        type: 'draw',
        params: {
          room: this.room,
          func: 'line',
          args: {
            startX: this.startX,
            startY: this.startY,
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

  mouseMove(e: MouseEvent) {
    const target = e.target as HTMLCanvasElement
    const currentX = e.pageX - target.offsetLeft
    const currentY = e.pageY - target.offsetTop
    if (this.isMouseDown) {
      this.draw(currentX, currentY)
    }
  }

  draw(x: number, y: number) {
    const img = new Image()
    img.src = this.saved
    img.onload = async () => {
      if (this.ctx) {
        this.ctx.clearRect(0, 0, this.canv.width, this.canv.height)
        this.ctx.drawImage(img, 0, 0, this.canv.width, this.canv.height)
        this.ctx.lineWidth = this.lineWidth
        this.ctx.strokeStyle = this.color

        this.ctx.beginPath()
        this.ctx.moveTo(this.startX, this.startY)
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
      }
    }
  }

  static staticDraw(ctx: CanvasRenderingContext2D | null, args: IStaticDrawLine) {
    const { startX, startY, x, y, lineWidth, color } = args
    if (ctx) {
      const thisColor = ctx.strokeStyle
      const thisLineWidth = ctx.lineWidth

      ctx.lineWidth = lineWidth
      ctx.strokeStyle = color

      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.lineTo(x, y)
      ctx.stroke()
      ctx.beginPath()

      ctx.strokeStyle = thisColor
      ctx.lineWidth = thisLineWidth
    }
  }
}
