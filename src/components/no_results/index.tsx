import { USED_COLORS } from "../../App"
import { BsFillInboxesFill } from "react-icons/bs"


const NoResults = () => {
  return (
    <div className="justify-around flex">
      <div>
        <div className="justify-around flex">
          <BsFillInboxesFill color={"#7024f8"} size={54} />
        </div>
        <h2 
          style={{ color: "#475072" }} 
          className="mt-6 text-2xl font-semibold font-workSans">
          Nothing found here
        </h2>
      </div>
    </div>
  )
}

export default NoResults