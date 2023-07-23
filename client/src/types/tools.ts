export interface ITool{
    canv: HTMLCanvasElement
    ctx: CanvasRenderingContext2D | null
    lineWidth: number
    setColor: (hex: string) => void
    setLineWidth: (num: number) => void
    destroyEvent: () => void
}

export interface IStaticDrawPencil {
    startX: number,
    startY: number,
    x: number,
    y: number,
    lineWidth: number,
    color: string
}

export interface IStaticDrawLine {
    startX: number,
    startY: number,
    x: number,
    y: number,
    lineWidth: number,
    color: string
}

export interface IStaticDrawRect {
    startX: number,
    startY: number,
    width: number,
    height: number,
    lineWidth: number,
    color: string
}

export interface IStaticDrawCircle {
    startX: number,
    startY: number,
    x: number,
    y: number,
    lineWidth: number,
    color: string
}

export type IStaticDraw = IStaticDrawPencil | IStaticDrawLine | IStaticDrawRect | IStaticDrawCircle