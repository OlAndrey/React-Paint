export default class Tools {
  canv: HTMLCanvasElement
  ctx: CanvasRenderingContext2D | null
  lineWidth: number
  color: string

  constructor(canv: HTMLCanvasElement, color: string, lineWidth: number = 5) {
    this.canv = canv
    this.ctx = canv.getContext('2d')
    this.color = color
    this.lineWidth = lineWidth
    this.destroyEvent()
  }

  setColor(hex: string): void {
    this.color = hex
  }

  destroyEvent(): void {
    this.canv.onmousedown = null
    this.canv.onmouseup = null
    this.canv.onmousemove = null
  }
}
