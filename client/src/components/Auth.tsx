import { MutableRefObject, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Slide, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/modal.css'
import { useAppDispatch } from '../hooks/redux'
import { setCanvasUsers, setUserName } from '../store/reducers/canvasSlice'

const Auth = () => {
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>
  const [showModal, setShowModal] = useState(true)
  const dispatch = useAppDispatch()
  let { id } = useParams()

  const infoRoom = (params: any, isNewUser: boolean) => {
    const toastOpnions = {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      transition: Slide
    }
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
      const ws = new WebSocket('ws://localhost:5000')
      ws.onopen = function () {
        const obj = {
          type: 'connect',
          params: { room: id, id: Date.now(), name: inputRef.current.value }
        }
        ws.send(JSON.stringify(obj))
      }

      ws.onmessage = function (event) {
        const obj = JSON.parse(event.data)
        const type = obj.type
        const params = obj.params
        console.log(obj)
        switch (type) {
          case 'info-room':
            dispatch(setCanvasUsers(params.clients))
            dispatch(setUserName(inputRef.current.value))
            setShowModal(false)
            break

          case 'info-connect':
            infoRoom(params, true)
            break

          case 'info-leave':
            infoRoom(params, false)
            break

          default:
            console.warn(`Type: ${type} unknown`)
            break
        }
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
