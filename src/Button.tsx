import { CSSProperties } from "react"

interface ButtonProps{
  name: string,
  disabled?: boolean,
  description?: string,
  token: string,
  onClick: () => void,
  children: any,
  className?: string,
  style?: CSSProperties
}


const Button: React.FC<ButtonProps> = (props) => {

  const newOnClick = () => {
    props.onClick()
    // api call
    const { name, token, description } = props
    console.log(name, token, description)
  }

  return(
    <button
      style={props.style}
      disabled={props.disabled}
      className={props.className}
      onClick={newOnClick}>
      {props.children}
    </button>
  )

}

export default Button