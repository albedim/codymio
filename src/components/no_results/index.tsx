import { MdHourglassEmpty } from "react-icons/md"
import { USED_COLORS } from "../../App"
import { BsFillInboxesFill } from "react-icons/bs"


const NoResults = () => {
  return (
    <div className="justify-around flex">
      <div>
        <div className="justify-around flex">
          <BsFillInboxesFill color={USED_COLORS[1]} size={54} />
        </div>
        <h2 style={{ color: USED_COLORS[1] }} className="mt-2 text-2xl font-semibold font-workSans">Nothing found here</h2>
      </div>
    </div>
  )
}

export default NoResults