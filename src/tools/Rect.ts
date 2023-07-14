import Tools from './Tool'

export default class Rect extends Tools {
  startX: number = 0
  startY: number = 0
  saved: string = ''
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
    this.saved = this.canv.toDataURL()
    if (this.ctx) this.ctx.beginPath()
    this.isMouseDown = true
  }

  mouseUp() {
    if (this.ctx) this.ctx.beginPath()
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
      const width = x - this.startX
      const height = y - this.startY

      if (this.ctx) {
        this.ctx.clearRect(0, 0, this.canv.width, this.canv.height)
        this.ctx.drawImage(img, 0, 0, this.canv.width, this.canv.height)

        this.ctx.beginPath()
        this.ctx.fillStyle = 'white'
        this.ctx.rect(this.startX, this.startY, width, height)
        this.ctx.stroke()
        this.ctx.fill()
      }
    }
  }
}
