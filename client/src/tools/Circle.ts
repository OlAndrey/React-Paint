import Tools from './Tool'

export default class Circle extends Tools {
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
    this.isMouseDown = true
    this.saved = this.canv.toDataURL()
    if (this.ctx) {
      this.ctx.fillStyle = 'white'
      this.ctx.beginPath()
    }
  }

  mouseUp() {
    if (this.ctx) {
      this.ctx.fillStyle = 'black'
      this.ctx.beginPath()
    }
    this.isMouseDown = false
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
      const radiusX = Math.sqrt((x - this.startX) ** 2)
      const radiusY = Math.sqrt((y - this.startY) ** 2)
      if (this.ctx) {
        this.ctx.clearRect(0, 0, this.canv.width, this.canv.height)
        this.ctx.drawImage(img, 0, 0, this.canv.width, this.canv.height)

        this.ctx.beginPath()
        this.ctx.strokeStyle = this.color
        this.ctx.lineWidth = this.lineWidth
        this.ctx.ellipse(this.startX, this.startY, radiusX, radiusY, 0, 0, Math.PI * 2)
        this.ctx.stroke()
        this.ctx.fill()
      }
    }
  }
}
