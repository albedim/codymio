import { useState } from "react"
import { TbError404 } from "react-icons/tb"
import { CSSTransition } from "react-transition-group"


const NotFound = () => {

  const [c, setC] = useState(false)

  return(
    <div className="justify-around mt-24 flex">
    <div>
      <div className="justify-around flex">
        <TbError404 size={54}/>
      </div>
      <div>
        <button onClick={() => setC(true)} >sgsa</button>
      <CSSTransition
        in={c}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <h2>sgdgs</h2>
        </CSSTransition>
      </div>
      <h2 className="mt-2 text-2xl font-semibold font-workSans">This page was not found</h2>
    </div>
  </div>
  )
}

export default NotFound