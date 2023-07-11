import "./styles/app.css"
import Canvas from './components/Canvas'
import ToolBar from './components/Toolbar'

function App() {
  return (
    <div className="app">
      <ToolBar />
      <Canvas />
    </div>
  )
}

export default App
