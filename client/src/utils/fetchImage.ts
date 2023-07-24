import axios from 'axios'

export const getImage = async (canv: HTMLCanvasElement, id: string) => {
  axios.get(`http://localhost:5000/image?id=${id}`).then((response) => {
    const ctx = canv.getContext('2d')
    const img = new Image()
    img.onload = async () => {
      if (ctx) {
        ctx.clearRect(0, 0, canv.width, canv.height)
        ctx.drawImage(img, 0, 0, canv.width, canv.height)
      }
    }
    img.src = response.data.data
  })
}

export const postImage = async (canv: HTMLCanvasElement, id: string) => {
  axios
    .post(`http://localhost:5000/image?id=${id}`, { img: canv.toDataURL() })
    .catch((err) => console.error(err))
}
