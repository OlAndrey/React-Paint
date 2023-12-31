import { IStaticDrawFill } from '../types/tools'
import Tools from './Tool'

export default class Fill extends Tools {
  socket: WebSocket
  floodFill: (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    fillColor: number[],
    range: number
  ) => Promise<unknown>

  constructor(context: HTMLCanvasElement, socket: WebSocket, room: string) {
    super(context, room)
    this.socket = socket
    this.floodFill = floodFill
    this.listenEvent()
  }

  listenEvent() {
    this.canv.onmousedown = this.mouseDown.bind(this)
  }

  mouseDown(e: MouseEvent) {
    const target = e.target as HTMLCanvasElement
    const x = e.pageX - target.offsetLeft
    const y = e.pageY - target.offsetTop
    const fillColor = this.hexToRGBA(this.color as string)
    if (this.ctx) {
      console.log(fillColor)
      this.floodFill(this.ctx, x, y, fillColor, 1).then(() => {
        if (this.socket) {
          const obj = {
            type: 'draw',
            params: {
              room: this.room,
              func: 'fill',
              args: {
                x,
                y,
                color: fillColor
              }
            }
          }
          this.socket.send(JSON.stringify(obj))
        }
      })
    }
  }

  hexToRGBA(hex: string, alpha = 255) {
    const hexArr = hex.match(/\w\w/g)
    if (hexArr) {
      const rgb = hexArr.map((x) => parseInt(x, 16)) as number[]
      return rgb.concat([alpha])
    }
    return [0, 0, 0, 0]
  }

  static staticFill(ctx: CanvasRenderingContext2D | null, args: IStaticDrawFill) {
    const { x, y, color } = args
    if (ctx) floodFill(ctx, x, y, color)
  }
}

const getPixel = (imageData: ImageData, x: number, y: number) => {
  if (x < 0 || y < 0 || x >= imageData.width || y >= imageData.height) {
    return [-1, -1, -1, -1]
  } else {
    const offset = (y * imageData.width + x) * 4
    return imageData.data.slice(offset, offset + 4)
  }
}

const setPixel = (imageData: ImageData, x: number, y: number, color: number[]) => {
  const offset = (y * imageData.width + x) * 4
  imageData.data[offset + 0] = color[0]
  imageData.data[offset + 1] = color[1]
  imageData.data[offset + 2] = color[2]
  imageData.data[offset + 3] = color[3]
}

const colorsMatch = (
  a: Uint8ClampedArray | number[],
  b: Uint8ClampedArray | number[],
  rangeSq: number = 0
) => {
  const dr = a[0] - b[0]
  const dg = a[1] - b[1]
  const db = a[2] - b[2]
  const da = a[3] - b[3]
  return dr * dr + dg * dg + db * db + da * da < rangeSq
}

const floodFill = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  fillColor: number[],
  range = 1
) => {
  return new Promise((resolve) => {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
    const visited = new Uint8Array(new ArrayBuffer(imageData.width), imageData.height)
    const targetColor = getPixel(imageData, x, y)

    if (!colorsMatch(targetColor, fillColor)) {
      const rangeSq = range * range
      const pixelsToCheck = [x, y]
      while (pixelsToCheck.length > 0) {
        const y = pixelsToCheck.pop() as number
        const x = pixelsToCheck.pop() as number

        const currentColor = getPixel(imageData, x, y)
        if (!visited[y * imageData.width + x] && colorsMatch(currentColor, targetColor, rangeSq)) {
          setPixel(imageData, x, y, fillColor)
          visited[y * imageData.width + x] = 1
          pixelsToCheck.push(x + 1, y)
          pixelsToCheck.push(x - 1, y)
          pixelsToCheck.push(x, y + 1)
          pixelsToCheck.push(x, y - 1)
        }
      }

      ctx.putImageData(imageData, 0, 0)
      resolve('Success!')
    }
  })
}
