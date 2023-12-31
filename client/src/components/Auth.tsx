import { FC, MutableRefObject, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Slide, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/modal.css'
import { useAppDispatch } from '../hooks/redux'
import { setCanvasUsers, setRoom, setUserName } from '../store/reducers/canvasSlice'
import { messageHandler } from '../utils/messageHandler'

type AuthPropsType = {
  canvas: HTMLCanvasElement | null
  setSocket: (socket: WebSocket) => void
}

const Auth: FC<AuthPropsType> = ({ canvas, setSocket }) => {
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>
  const [showModal, setShowModal] = useState(true)
  const dispatch = useAppDispatch()
  let { id } = useParams()
  const toastOpnions = {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 3000,
    hideProgressBar: false,
    transition: Slide
  }

  const infoConnect = (clients: number) => {
    dispatch(setCanvasUsers(clients))
    dispatch(setUserName(inputRef.current.value))
    dispatch(setRoom(id as string))
    setShowModal(false)
  }

  const infoRoom = (params: any, isNewUser: boolean) => {
    dispatch(setCanvasUsers(params.clients))

    if (isNewUser) {
      const message = 'User ' + params.userName + ' joined the canvas'
      toast.success(message, toastOpnions)
    } else {
      const message = 'User ' + params.userName + ' left the canvas!'
      toast.warn(message, toastOpnions)
    }
  }

  const connect = () => {
    if (inputRef.current.value.trim()) {
      const ws = new WebSocket(process.env.REACT_APP_WS_URL)

      ws.onerror = function () {
        toast.error('Failed to connect!!!', toastOpnions)
      }

      ws.onopen = function () {
        const obj = {
          type: 'connect',
          params: { room: id, id: Date.now(), name: inputRef.current.value }
        }
        ws.send(JSON.stringify(obj))
        setSocket(ws)
      }

      ws.onmessage = function (event) {
        const obj = JSON.parse(event.data)
        messageHandler(obj, canvas, infoConnect, infoRoom)
      }

      window.addEventListener('beforeunload', () => {
        ws.send('{ "type": "leave" }')
      })
    }
  }

  return (
    <>
      <section className={'modal ' + (showModal ? '' : 'hidden')}>
        <input type="text" ref={inputRef} placeholder="Enter your name" />
        <button className="btn" onClick={() => connect()}>
          Connect
        </button>
      </section>

      <div className={'overlay' + (showModal ? '' : 'hidden')}></div>
      <ToastContainer limit={2} />
    </>
  )
}

export default Auth
