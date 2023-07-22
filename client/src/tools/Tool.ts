export default class Tools {
  canv: HTMLCanvasElement
  ctx: CanvasRenderingContext2D | null
  color: string | CanvasGradient | CanvasPattern
  lineWidth: number
  room: string

  constructor(canv: HTMLCanvasElement, room: string) {
    this.canv = canv
    this.room = room
    this.ctx = canv.getContext('2d')
    this.color = this.ctx?.strokeStyle || '#000000'
    this.lineWidth = this.ctx?.lineWidth || 1
    this.destroyEvent()
  }

  setColor(hex: string): void {
    this.color = hex
  }

  setLineWidth(width: number): void {
    this.lineWidth = width
  }

  destroyEvent(): void {
    this.canv.onmousedown = null
    this.canv.onmouseup = null
    this.canv.onmousemove = null
  }
}
