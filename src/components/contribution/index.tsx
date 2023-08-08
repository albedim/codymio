import React, { useState } from "react"
import { BsFillSignMergeLeftFill } from 'react-icons/bs'
import { AiFillClockCircle, AiFillDelete } from 'react-icons/ai'
import { PiPushPinFill } from 'react-icons/pi'
import { USED_COLORS } from "../../App"
import Stepper from "../stepper"

interface ContributionProps {
  repository: RepositoryType
  issue: Issue,
  removable: boolean,
  onRemove: () => void
}


export interface Issue {
  title: string,
  issue_id: number,
  number: number,
  body: string,
  owner: string
}


export interface RepositoryType {
  name: string,
  github_repo_id: number,
  full_name: string,
  status: "completed" | "none" | "pushed",
  language: string
}


const Contribution: React.FC<ContributionProps> = ({
  repository,
  issue,
  removable,
  onRemove
}) => {

  const [showMore, setShowMore] = useState(false)

  return (
    <div className="pb-14 p-4">
      <div style={{ borderColor: USED_COLORS[3], backgroundColor: USED_COLORS[2] }} className="border-2 repository p-6 rounded-lg">
        <div className="itens-center justify-between flex">
          <div>
            <a target="_blank" href={"https://github.com/" + repository.full_name}>
              <h2 style={{ color: USED_COLORS[1] }} className="hover:underline text-xl font-semibold font-workSans">{repository.name}</h2>
            </a>
          </div>
          <div className="items-center justify-around flex">
            {
              removable ? (
                <AiFillDelete className="cursor-pointer" onClick={onRemove} opacity={"40%"} color="red" size={24} />
              ) : null
            }
          </div>
        </div>
        <div>
          <h2 style={{ color: USED_COLORS[1] }} className="font-workSans">@{repository.full_name.split("/")[0]}</h2>
        </div>
        <div style={{ borderColor: USED_COLORS[0] }} className="pt-2 border-t mt-4">
          <div className="items-center justify-between flex">
            <div>
              <a
                target="_blank"
                href={"https://github.com/" + repository.full_name + "/issues/" + issue.number}>
                <h2
                  style={{ color: USED_COLORS[1] }}
                  className="hover:underline cursor-pointer text-lg font-semibold font-workSans" >
                  {issue.title} • <span className="text-sm font-normal">@{repository.full_name.split("/")[0]}</span>
                </h2>
              </a>
            </div>
            <div><h2 className="bg-opacity-40 text-[white] rounded-md text-xs p-1 font-workSans bg-[red]" >PROBLEM</h2></div>
          </div>
          {
            issue.body != null ? (
              issue.body.length > 240 ? (
                <div className="mt-2">
                  <h2 style={{ color: USED_COLORS[1] }} className="pt-2 font-workSans" >
                    {showMore ? issue.body : issue.body.substring(0, 240) + "..."}
                  </h2>
                  <h2 style={{ color: USED_COLORS[1] }} className="cursor-pointer font-semibold underline" onClick={() => setShowMore(!showMore)} >
                    {showMore ? "Show less" : "Show more"}
                  </h2>
                </div>
              ) : (
                <h2 style={{ color: USED_COLORS[1] }} className="pt-2 font-workSans" >{issue.body}</h2>
              )
            ) : (
              <h2 style={{ color: USED_COLORS[1] }} className="italic pt-2 font-workSans" >No description provided for this issue.</h2>
            )
          }
        </div>
        <div className="mt-4">
          <Stepper status={repository.status}/>
        </div>
      </div>
    </div>
  )
}

export default Contribution