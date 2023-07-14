import pencilImg from '../assets/img/pencil.svg'
import rectImg from '../assets/img/rectangle.svg'
import circleImg from '../assets/img/circle.svg'
import eraserImg from '../assets/img/eraser.svg'
import lineImg from '../assets/img/line.svg'
import fillImg from '../assets/img/fill.svg'
import undoImg from '../assets/img/undo-left.svg'
import redoImg from '../assets/img/undo-right.svg'
import saveImg from '../assets/img/save.svg'

interface IToolbarData {
  name: string,
  src: string
}

export const toolbarDataLeft: IToolbarData[] = [
  {
    name: 'pencil',
    src: pencilImg
  },
  {
    name: 'line',
    src: lineImg
  },
  {
    name: 'rect',
    src: rectImg
  },
  {
    name: 'circle',
    src: circleImg
  },
  {
    name: 'eraser',
    src: eraserImg
  },
  {
    name: 'fill',
    src: fillImg
  }
]

export const toolbarDataRight: IToolbarData[] = [
    {
      name: 'undo',
      src: undoImg
    },
    {
      name: 'redo',
      src: redoImg
    },
    {
      name: 'save',
      src: saveImg
    }
  ]
  