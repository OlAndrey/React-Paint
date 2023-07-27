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
    radiusX: number,
    radiusY: number,
    lineWidth: number,
    color: string
}

export interface IStaticDrawEraser {
    x: number,
    y: number,
    lineWidth: number,
}

export interface IStaticDrawFill {
    x: number
    y: number
    color: number[]
}

export type IStaticDraw = IStaticDrawPencil | IStaticDrawLine | IStaticDrawRect | IStaticDrawCircle | IStaticDrawEraser | IStaticDrawFill