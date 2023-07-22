import { useState } from "react"
import "./styles/app.css"
import Canvas from './components/Canvas'
import ToolBar from './components/Toolbar'
import Auth from "./components/Auth"

function App() {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const [socket, setSocket] = useState<WebSocket | null>(null)

  return (
    <div className="app">
      <ToolBar canvas={canvas} socket={socket} />
      <Auth canvas={canvas} setSocket={setSocket} />
      <Canvas setCanvas={setCanvas} />
    </div>
  )
}

export default App
