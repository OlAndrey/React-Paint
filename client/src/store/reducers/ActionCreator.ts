import { AppDispatch } from '../store'
import { popToRedo, popToUndo, pushToRedo, pushToUndo } from './canvasSlice'

export const undo = (canvas: HTMLCanvasElement, imageData: string) => (dispatch: AppDispatch) => {
  const ctx = canvas.getContext('2d')
  dispatch(popToUndo())
  dispatch(pushToRedo(canvas.toDataURL()))
  const img = new Image()
  img.src = imageData
  img.onload = async () => {
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }
  }
}

export const redo = (canvas: HTMLCanvasElement, imageData: string) => (dispatch: AppDispatch) => {
  const ctx = canvas.getContext('2d')
  dispatch(popToRedo())
  dispatch(pushToUndo(canvas.toDataURL()))
  const img = new Image()
  img.src = imageData
  img.onload = async () => {
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }
  }
}
