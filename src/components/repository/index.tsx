import React, { useState } from "react"
import { AiFillCode } from "react-icons/ai"
import { BiGitRepoForked } from 'react-icons/bi'
import { USED_COLORS } from "../../App"

interface RepositoryProps {
  repository: RepositoryType | null,
  onClick: () => void,
  onAlert: () => void
}

export interface RepositoryType {
  name: string,
  github_repo_id: number,
  open_issues: number,
  full_name: string,
  description: string,
  forks: number,
  contributable: boolean,
  language: string
}

const Repository: React.FC<RepositoryProps> = ({
  repository,
  onClick,
  onAlert
}) => {

  const maxLength = 54

  const [showMore, setShowMore] = useState(false)

  const overLength: boolean = (
    repository?.description != undefined &&
    repository?.description.length > maxLength
  )

  return (
    <div className="pb-14 p-4">
      <div
        className="bg-[#fafafa] border repository p-6 rounded-lg">
        <div className="justify-between flex">
          <div>
            <a title={repository?.name} target="_blank" href={"https://github.com/" + repository?.full_name}>
              <p
                className="text-[#475072] hover:underline text-xl font-semibold font-workSans">{
                  repository?.name != undefined && repository?.name.length > 24 ? 
                  repository?.name.substring(0,18) + "..." : repository?.name}
              </p>
            </a>
          </div>
          <div
            className="border-[#475072] text-[#475072] items-center flex pr-3 pl-3 rounded-md border"
          >
            <p className="text-[#475072] [font-workSans">
              {repository?.open_issues} Issues
            </p>
          </div>
        </div>
        <div>
          <p className="text-[#475072] font-workSans">
            @{repository?.full_name.split("/")[0]}
          </p>
        </div>
        <div className="pt-2">
          {
            overLength ? (
              <div className="mt-2">
                <p style={{ maxWidth: 284, color: "#475072"}} className="font-workSans" >{
                  showMore ? repository?.description : repository?.description?.substring(0, maxLength) + "..."
                }</p>
                <p
                  style={{ color: "#475072" }}
                  className="cursor-pointer font-semibold underline"
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? "Show less" : "Show more"}
                </p>
              </div>
            ) : (
              <p style={{ minHeight: 78, maxWidth: 284, color: "#475072" }} className="pt-2 font-workSans" >{repository?.description}</p>
            )
          }
          <div className="pt-2 items-center flex">
            <div className="pr-2"><BiGitRepoForked color={"#7024f8"} /></div>
            <p className="text-[#475072] font-semibold font-workSans">{repository?.forks}</p>
          </div>
        </div>
        <div className="pt-8 justify-between flex">
          {
            repository?.language ? (
              <div className="items-center flex">
                <div><AiFillCode size={18} color="gray" /></div>
                <p
                  className="text-[gray] bg-opacity-40 rounded-md p-2 text-sm font-semibold font-lato" >
                  {repository?.language}
                </p>
              </div>
            ) : (
              <div></div>
            )
          }
          <div>
            {
              repository?.contributable ? (
                <button
                onClick={onClick}
                className="text-[white] bg-[#7024f8] rounded-md font-workSans text-sm p-2 text-[white]"
              >
                Contribute
              </button>
              ):(
                <button
                onClick={onAlert}
                className="text-[white] bg-[#7024f8] rounded-md font-workSans text-sm p-2 text-[white]"
              >
                Contribute
              </button>
              )
            }
          </div>
        </div>
      </div>
    </div >
  )
}

export default Repository