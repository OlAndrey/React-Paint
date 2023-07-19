export interface ITool{
    canv: HTMLCanvasElement
    ctx: CanvasRenderingContext2D | null
    lineWidth: number
    setColor: (hex: string) => void
    setLineWidth: (num: number) => void
    destroyEvent: () => void
}