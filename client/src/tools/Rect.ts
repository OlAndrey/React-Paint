import { IStaticDrawRect } from '../types/tools'
import Tools from './Tool'

export default class Rect extends Tools {
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
    const target = e.target as HTMLCanvasElement
    this.startX = e.pageX - target.offsetLeft
    this.startY = e.pageY - target.offsetTop
    this.saved = this.canv.toDataURL()
    if (this.ctx) this.ctx.beginPath()
    this.isMouseDown = true
  }

  mouseUp(e: MouseEvent) {
    const target = e.target as HTMLCanvasElement
    const width = e.pageX - target.offsetLeft - this.startX
    const height = e.pageY - target.offsetTop - this.startY

    this.isMouseDown = false
    if (this.ctx) this.ctx.beginPath()
    if (this.socket) {
      const obj = {
        type: 'draw',
        params: {
          room: this.room,
          func: 'rect',
          args: {
            startX: this.startX,
            startY: this.startY,
            width,
            height,
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
      const width = x - this.startX
      const height = y - this.startY

      if (this.ctx) {
        this.ctx.clearRect(0, 0, this.canv.width, this.canv.height)
        this.ctx.drawImage(img, 0, 0, this.canv.width, this.canv.height)

        this.ctx.beginPath()
        this.ctx.lineWidth = this.lineWidth
        this.ctx.fillStyle = 'white'
        this.ctx.strokeStyle = this.color
        this.ctx.rect(this.startX, this.startY, width, height)
        this.ctx.stroke()
        this.ctx.fill()
      }
    }
  }

  static staticDraw(ctx: CanvasRenderingContext2D | null, args: IStaticDrawRect) {
    const { startX, startY, width, height, lineWidth, color } = args
    if (ctx) {
      const thisColor = ctx.strokeStyle
      const thisLineWidth = ctx.lineWidth

      ctx.lineWidth = lineWidth
      ctx.fillStyle = 'white'
      ctx.strokeStyle = color

      ctx.beginPath()
      ctx.rect(startX, startY, width, height)
      ctx.stroke()
      ctx.fill()
      ctx.beginPath()

      ctx.strokeStyle = thisColor
      ctx.lineWidth = thisLineWidth
    }
  }
}
