import { MdHourglassEmpty } from "react-icons/md"
import { USED_COLORS } from "../../App"


const NoResults = () => {
  return(
    <div className="justify-around mt-24 flex">
    <div>
      <div className="justify-around flex">
        <MdHourglassEmpty color={USED_COLORS[1]} size={54}/>
      </div>
      <h2 style={{ color: USED_COLORS[1] }} className="mt-2 text-2xl font-semibold font-workSans">Nothing found here</h2>
    </div>
  </div>
  )
}

export default NoResults