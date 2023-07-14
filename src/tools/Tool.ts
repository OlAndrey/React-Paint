export default class Tools {
  canv: HTMLCanvasElement
  ctx: CanvasRenderingContext2D | null
  radius: number = 5

  constructor(canv: HTMLCanvasElement) {
    this.canv = canv
    this.ctx = canv.getContext('2d')
    this.destroyEvent()
  }

  destroyEvent(): void {
    this.canv.onmousedown = null
    this.canv.onmouseup = null
    this.canv.onmousemove = null
  }
}
