import { useState } from "react"
import { TbError404 } from "react-icons/tb"
import { CSSTransition } from "react-transition-group"
import Button from "../../Button"


const NotFound = () => {

  const [c, setC] = useState(false)

  return(
    <div className="justify-around mt-24 flex">
    <div>
      <div className="justify-around flex">
        <TbError404 size={54}/>
      </div>
      <Button className="bg-[red] p-14" name={'button example'} token={'3fdg-33-dj3ld.--d3'} onClick={() => console.log("s")} children={<h2> dgdgd</h2>}  />
      <h1 className="mt-2 text-2xl font-semibold font-workSans">This page was not found</h1>
    </div>
  </div>
  )
}

export default NotFound