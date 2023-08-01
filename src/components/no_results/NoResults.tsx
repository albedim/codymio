import { MdHourglassEmpty } from "react-icons/md"


const NoResults = () => {
  return(
    <div className="justify-around mt-24 flex">
    <div>
      <div className="justify-around flex">
        <MdHourglassEmpty size={54}/>
      </div>
      <h2 className="mt-2 text-2xl font-semibold font-workSans">Nothing found here</h2>
    </div>
  </div>
  )
}

export default NoResults