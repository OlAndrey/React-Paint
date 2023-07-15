import Tools from './Tool'

export default class Fill extends Tools {
  constructor(context: HTMLCanvasElement) {
    super(context)
    this.listenEvent()
  }

  listenEvent() {
    this.canv.onmousedown = this.mouseDown.bind(this)
  }

  mouseDown(e: MouseEvent) {
    const target = e.target as HTMLCanvasElement
    const x = e.pageX - target.offsetLeft
    const y = e.pageY - target.offsetTop
    if (this.ctx) {
      this.floodFill(this.ctx, x, y, [255, 0, 0, 255])
    }
  }

  getPixel(imageData: ImageData, x: number, y: number) {
    if (x < 0 || y < 0 || x >= imageData.width || y >= imageData.height) {
      return [-1, -1, -1, -1]
    } else {
      const offset = (y * imageData.width + x) * 4
      return imageData.data.slice(offset, offset + 4)
    }
  }

  setPixel(imageData: ImageData, x: number, y: number, color: number[]) {
    const offset = (y * imageData.width + x) * 4
    imageData.data[offset + 0] = color[0]
    imageData.data[offset + 1] = color[1]
    imageData.data[offset + 2] = color[2]
    imageData.data[offset + 3] = color[0]
  }

  colorsMatch(
    a: Uint8ClampedArray | number[],
    b: Uint8ClampedArray | number[],
    rangeSq: number = 0
  ) {
    const dr = a[0] - b[0]
    const dg = a[1] - b[1]
    const db = a[2] - b[2]
    const da = a[3] - b[3]
    return dr * dr + dg * dg + db * db + da * da < rangeSq
  }

  floodFill(ctx: CanvasRenderingContext2D, x: number, y: number, fillColor: number[], range = 1) {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
    const visited = new Uint8Array(new ArrayBuffer(imageData.width), imageData.height)
    const targetColor = this.getPixel(imageData, x, y)

    if (!this.colorsMatch(targetColor, fillColor)) {
      const rangeSq = range * range
      const pixelsToCheck = [x, y]
      while (pixelsToCheck.length > 0) {
        const y = pixelsToCheck.pop() as number
        const x = pixelsToCheck.pop() as number

        const currentColor = this.getPixel(imageData, x, y)
        if (
          !visited[y * imageData.width + x] &&
          this.colorsMatch(currentColor, targetColor, rangeSq)
        ) {
          this.setPixel(imageData, x, y, fillColor)
          visited[y * imageData.width + x] = 1
          pixelsToCheck.push(x + 1, y)
          pixelsToCheck.push(x - 1, y)
          pixelsToCheck.push(x, y + 1)
          pixelsToCheck.push(x, y - 1)
        }
      }

      ctx.putImageData(imageData, 0, 0)
    }
  }
}
