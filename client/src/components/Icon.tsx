import { FC } from 'react'
import icons from '.././icons'

type IconPropsType = {
  name: string
  fill?: string
}

const Icon: FC<IconPropsType> = ({ name, fill = "#000000" }) => {
  const [icon, viewBox] = icons[name]

  return (
    <svg
      fill={fill}
      width={30}
      height={30}
      dangerouslySetInnerHTML={{ __html: icon }}
      viewBox={viewBox}
    />
  )
}

export default Icon
