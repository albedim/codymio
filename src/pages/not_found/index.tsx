import { useState } from "react"
import { TbError404 } from "react-icons/tb"
import { CSSTransition } from "react-transition-group"
import Button from "../../Button"


const NotFound = () => {

  const [c, setC] = useState(false)

  return(
    <div className="w-screen h-96 justify-around mt-24 flex">
    <div className="items-center gap-4 flex">
      <div className="justify-around flex">
        <TbError404 size={54}/>
      </div>
      <div className="rounded-full h-14 w-1 bg-[black]"></div>
      <h1 className="mt-2 text-lg font-semibold font-workSans">This page was not found</h1>
    </div>
  </div>
  )
}

export default NotFound