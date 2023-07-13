import Tools from "./Tool"

export default class Rect extends Tools {
  startX: number = 0
  startY: number = 0
  isMouseDown: boolean = false

  constructor(context: HTMLCanvasElement) {
    super(context)
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
  }

  mouseUp() {
    if (this.ctx) this.ctx.beginPath()
    this.isMouseDown = false
  }

  mouseMove(e: MouseEvent) {
    const target = e.target as HTMLCanvasElement
    const [x, y] = [e.pageX - target.offsetLeft, e.pageY - target.offsetTop]
    if (this.isMouseDown) {
      this.draw(x, y)
    }
  }

  draw(x: number, y: number) {
    const width = x - this.startX
    const height = y - this.startY
    if (this.ctx) {
      this.ctx.fillStyle = 'white'
      this.ctx.rect(this.startX, this.startY, width, height)
      this.ctx.stroke()
      this.ctx.fill()
    }
  }
}
