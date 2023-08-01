import { TbError404 } from "react-icons/tb"


const NotFound = () => {
  return(
    <div className="justify-around mt-24 flex">
    <div>
      <div className="justify-around flex">
        <TbError404 size={54}/>
      </div>
      <h2 className="mt-2 text-2xl font-semibold font-workSans">This page was not found</h2>
    </div>
  </div>
  )
}

export default NotFound