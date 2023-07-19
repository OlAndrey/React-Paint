import "./styles/app.css"
import Canvas from './components/Canvas'
import ToolBar from './components/Toolbar'
import { useState } from "react"

function App() {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)

  return (
    <div className="app">
      <ToolBar canvas={canvas} />
      <Canvas setCanvas={setCanvas} />
    </div>
  )
}

export default App
