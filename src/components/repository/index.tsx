import React, { useState } from "react"
import { AiFillCode } from "react-icons/ai"
import { BiGitRepoForked } from 'react-icons/bi'
import { useNavigate } from "react-router-dom"
import { USED_COLORS } from "../../App"

interface RepositoryProps {
  repository: RepositoryType | null,
  onClick: () => void
}

export interface RepositoryType {
  name: string,
  github_repo_id: number,
  open_issues: number,
  full_name: string,
  has_contributed: boolean,
  description: string,
  forks: number,
  language: string
}

const Repository: React.FC<RepositoryProps> = ({
  repository,
  onClick
}) => {

  const maxLength = 62

  const [showMore, setShowMore] = useState(false)
  
  const overLength: boolean = repository?.description != undefined && repository?.description.length > maxLength

  return (
    <div className="pb-14 p-4">
      <div style={{ borderColor: USED_COLORS[3], backgroundColor: USED_COLORS[2] }} className="border repository p-6 rounded-lg">
        <div className="justify-between flex">
          <div>
            <a target="_blank" href={"https://github.com/" + repository?.full_name}>
              <h2 style={{color: USED_COLORS[1] }} className="hover:underline text-xl font-semibold font-workSans">{repository?.name}</h2>
            </a>
          </div>
          <div style={{ borderColor: USED_COLORS[1] }} className="items-center flex pr-3 pl-3 rounded-md border-2">
            <h2 style={{color: USED_COLORS[1] }} className="font-workSans">{repository?.open_issues} Issues</h2>
          </div>
        </div>
        <div>
          <h2 style={{color: USED_COLORS[1] }} className="font-workSans">@{repository?.full_name.split("/")[0]}</h2>
        </div>
        <div className="pt-2">
          {
            overLength ? (
                <div className="mt-2">
                  <h2 style={{ maxWidth: 254, color: USED_COLORS[1] }} className="font-workSans" >{
                    showMore ? repository?.description : repository?.description?.substring(0,maxLength)+"..." 
                  }</h2>
                  <h2 style={{color: USED_COLORS[1] }} className="cursor-pointer font-semibold underline" onClick={() => setShowMore(!showMore)} >
                    {showMore ? "Show less" : "Show more"}
                  </h2>
                </div>
            ):(
              <h2 style={{color: USED_COLORS[1] }} className="pt-2 font-workSans" >{repository?.description}</h2>
            )
          }
          <div className="pt-2 items-center flex">
            <div className="pr-2"><BiGitRepoForked color={USED_COLORS[1]} /></div>
            <h2 style={{color: USED_COLORS[1] }} className="font-semibold font-workSans">{repository?.forks}</h2>
          </div>
        </div>
        <div className="pt-8 justify-between flex">
          {
            repository?.language ? (
              <div className="items-center flex">
                <div><AiFillCode size={18} color="gray" /></div>
                <h2 className="text-[gray] bg-opacity-40 rounded-md p-2 text-sm font-semibold font-lato" >{repository?.language}</h2>
              </div>
            ) : (
              <div></div>
            )
          }
          <div>
            {
              repository?.has_contributed ? (
                <button style={{ color: USED_COLORS[0], backgroundColor: USED_COLORS[1] }} disabled onClick={onClick} className="opacity-40 rounded-md font-workSans text-sm p-2 text-[white]">
                  Contribute
                </button>
              ):(
                <button style={{ color: USED_COLORS[0], backgroundColor: USED_COLORS[1] }} onClick={onClick} className="rounded-md font-workSans text-sm p-2 text-[white]">
                  Contribute
                </button>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Repository