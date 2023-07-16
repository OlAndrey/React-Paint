import Tools from './Tool'

export default class Eraser extends Tools {
  isMouseDown: boolean = false

  constructor(context: HTMLCanvasElement, color: string, lineWidth: number) {
    super(context, color, lineWidth)
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
    if (this.ctx) {
      this.ctx.fillStyle = 'white'
      this.ctx.strokeStyle = 'white'
    }
  }

  mouseUp() {
    this.isMouseDown = false
    if (this.ctx) {
      this.ctx.beginPath()
      this.ctx.fillStyle = this.color
      this.ctx.strokeStyle = this.color
    }
  }

  mouseMove(e: MouseEvent) {
    const target = e.target as HTMLCanvasElement
    const x = e.pageX - target.offsetLeft
    const y = e.pageY - target.offsetTop
    if (this.isMouseDown) {
      this.draw(x, y)
    }
  }

  draw(x: number, y: number) {
    if (this.ctx) {
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
}
