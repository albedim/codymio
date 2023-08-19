import { HiArrowCircleRight } from "react-icons/hi"
import { TbAlertTriangleFilled } from "react-icons/tb"

interface IssueProps{
  created_on: string,
  title: string,
  creator_username: string,
  hasPullRequests: boolean,
  onAlert: () => void,
  onCreate: () => Promise<void>,
  has_contributed: boolean
}

const Issue: React.FC<IssueProps> = ({
  created_on,
  title,
  creator_username,
  hasPullRequests,
  onAlert,
  onCreate,
  has_contributed
}) => {

  return (
    <div className="p-4">
      <div
        className="bg-[#fafafa] justify-between flex rounded-lg p-4">
        <div>
          <h2
            style={{ color: "#475072", maxWidth: 340 }}
            className="font-semibold text-lg font-workSans">{title}
          </h2>
          <h2
            style={{ color: "#475072" }}
            className="font-normal text-md font-workSans">@{creator_username}
          </h2>
          <h2
            className="mt-1 font-semibold font-workSans text-[gray]"
          >{
              created_on.substring(0, 10).split("-")[2] + "/" +
              created_on.substring(0, 10).split("-")[1] + "/" +
              created_on.substring(0, 10).split("-")[0]
            }
          </h2>
        </div>
        <div className="items-center justify-around flex">
          <div>
            {
              hasPullRequests ? (
                <div className="pb-4 justify-around flex">
                  <a title="This issue has pull requests already.">
                    <TbAlertTriangleFilled
                      className="cursor-pointer"
                      opacity={"40%"}
                      size={24}
                      color="orange"
                      onClick={onAlert}
                    />
                  </a>
                </div>
              ) : (
                <></>
              )
            }
            {
              has_contributed ? (
                <button disabled>
                  <HiArrowCircleRight
                    size={34}
                    opacity={"40%"}
                    color={"#7024f8"}
                  />
                </button>
              ) : (
                <button><HiArrowCircleRight onClick={onCreate} size={34} color={"#7024f8"} /></button>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )

}

export default Issue