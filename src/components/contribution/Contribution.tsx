import React, { useState } from "react"
import { BsFillSignMergeLeftFill } from 'react-icons/bs'
import { AiFillClockCircle } from 'react-icons/ai'
import { PiPushPinFill } from 'react-icons/pi'
import { BiGitRepoForked } from 'react-icons/bi'
import { useNavigate } from "react-router-dom"

interface RepositoryProps {
  repository: Repo
  issue: Issue
}

export interface Repo {
  name: string,
  github_repo_id: number,
  full_name: string,
  status: RepoStatus
  language: string
}

export interface RepoStatus{
  pushed: boolean,
  waiting: boolean,
  merged: boolean
}

export interface Issue {
  title: string,
  issue_id: number,
  number: number,
  body: string,
  owner: string
}

const Contribution: React.FC<RepositoryProps> = ({
  repository,
  issue
}) => {

  const navigate = useNavigate()

  const [showMore, setShowMore] = useState(false)


  return (
    <div className="pb-14 p-4">
      <div className="repository p-6 rounded-lg bg-[#fafafa]">
        <div className="justify-between flex">
          <div>
            <a target="_blank" href={"https://github.com/" + repository.full_name}>
              <h2 className="hover:underline text-xl font-semibold font-workSans">{repository.name}</h2>
            </a>
          </div>
        </div>
        <div>
          <h2 className="font-workSans">@{repository.full_name.split("/")[0]}</h2>
        </div>
        <div className="pt-2 border-t mt-4">
          <div className="items-center justify-between flex">
            <div>
              <a target="_blank" href={"https://github.com/" + repository.full_name + "/issues/" + issue.number}>
                <h2 className="hover:underline cursor-pointer text-lg font-semibold font-workSans" >{issue.title} • <span className="text-sm font-normal">@{repository.full_name.split("/")[0]}</span></h2>
              </a>
            </div>
            <div><h2 className="bg-opacity-40 text-[white] rounded-md text-xs p-1 font-workSans bg-[red]" >PROBLEM</h2></div>
          </div>
          {
            issue.body.length > 240 ? (
                <div className="mt-2">
                  <h2 className="pt-2 font-workSans" >{showMore ? issue.body : issue.body.substring(0,240)+"..."}</h2>
                  <h2 className="cursor-pointer font-semibold underline" onClick={() => setShowMore(!showMore)} >{showMore ? "Show less" : "Show more"}</h2>
                </div>
            ):(
              <h2 className="pt-2 font-workSans" >{issue.body}</h2>
            )
          }
        </div>
        <div className="mt-4">
          <div className="items-center flex">
            {
              repository.status.pushed ? (
                <>
                  <div className="pr-2"><PiPushPinFill color="green"/></div>
                  <h2 className="font-semibold text-[green] font-workSans">Pushed</h2>
                </>
              ):(
                <>
                  <div className="pr-2"><PiPushPinFill color="gray"/></div>
                  <h2 className="text-[gray] font-workSans">Pushed</h2>
                </>
              )
            }
          </div>
          <div className="items-center flex">
            {
              repository.status.waiting ? (
                <>
                  <div className="pr-2"><AiFillClockCircle color="orange"/></div>
                  <h2 className="font-semibold text-[orange] font-workSans">Waiting</h2>
                </>
              ):(
                repository.status.merged ? (
                  <></>
                ):(
                  <>
                    <div className="pr-2"><AiFillClockCircle color="gray"/></div>
                    <h2 className="text-[gray] font-workSans">Waiting</h2>
                  </>
                )
              )
            }
          </div>
          <div className="items-center flex">
            {
              repository.status.merged ? (
                <>
                  <div className="pr-2"><BsFillSignMergeLeftFill color="green"/></div>
                  <h2 className="font-semibold text-[green] font-workSans">Merged</h2>
                </>
              ):(
                <>
                  <div className="pr-2"><BsFillSignMergeLeftFill color="gray"/></div>
                  <h2 className="text-[gray] font-workSans">Merged</h2>
                </>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contribution