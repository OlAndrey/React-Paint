import { useState } from 'react'
import '../styles/toolbar.css'
import { toolbarDataLeft, toolbarDataRight } from '../utils/toolBar'
import Pencil from '../tools/Pencil'

const ToolBar = () => {
  const [selectedButton, setSelectedButton] = useState('')

  const selectedTool = (tool: string) => {
    const canv = document.querySelector('#canvas') as HTMLCanvasElement
    const pencil = new Pencil(canv)
    if (selectedButton === tool) {
      setSelectedButton('')
      pencil.destroyEvent()
    } else setSelectedButton(tool)
  }

  return (
    <div className="toolbar">
      {toolbarDataLeft.map((item, index) => (
        <button
          key={index}
          className={'toolbar__btn ' + (selectedButton === item.name ? 'toolbar__btn-active' : '')}
          onClick={() => selectedTool(item.name)}
        >
          <img alt={item.name} src={item.src} />
        </button>
      ))}

      <input style={{ marginLeft: 10 }} type="color" />

      {toolbarDataRight.map((item, index) => (
        <button
          key={(index + 1) * 5}
          style={index === 0 ? { marginLeft: 'auto' } : {}}
          className={'toolbar__btn'}
        >
          <img alt={item.name} src={item.src} />
        </button>
      ))}
    </div>
  )
}

export default ToolBar
