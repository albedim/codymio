import React, { useState } from "react"
import { BsFillSignMergeLeftFill } from 'react-icons/bs'
import { AiFillClockCircle } from 'react-icons/ai'
import { PiPushPinFill } from 'react-icons/pi'
import { BiGitRepoForked } from 'react-icons/bi'
import { useNavigate } from "react-router-dom"

interface RepositoryProps {
  repository: Repo
}

export interface Repo {
  name: string,
  github_repo_id: number,
  full_name: string,
  description: string,
  forks: number,
  language: Language
}

export interface Language {
  color: string,
  value: string
}

const Contribution: React.FC<RepositoryProps> = ({
  repository,
}) => {

  const navigate = useNavigate()

  const [modalOptions, setModalOptions] = useState({ visible: false })

  return (
    <div className="pb-14 p-4">
      <div style={{ width: 450 }} className="p-6 rounded-lg bg-[#fafafa]">
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
        <div className="pt-2">
          <h2 className="font-workSans" >{repository.description}</h2>
          <div className="pt-2 items-center flex">
            <div className="pr-2"><BiGitRepoForked /></div>
            <h2 className="font-semibold font-workSans">{repository.forks}</h2>
          </div>
        </div>
        <div className="mt-4">
          <div className="items-center flex">
            <div className="pr-2"><PiPushPinFill color="gray"/></div>
            <h2 className="text-[gray] font-workSans">Pushed</h2>
          </div>
          <div className="items-center flex">
            <div className="pr-2"><AiFillClockCircle color="gray"/></div>
            <h2 className="text-[gray] font-workSans">Waiting</h2>
          </div>
          <div className="items-center flex">
            <div className="pr-2"><BsFillSignMergeLeftFill color="gray"/></div>
            <h2 className="text-[gray] font-workSans">Pushed • Rejected</h2>
          </div>
        </div>
      </div>
      <div className="border justify-between flex">
        <div></div>
        <div className="p-4 pr-8">
          <div style={{ height: 40, width: 2 }} className="bg-[gray]">

          </div>
        </div>
      </div>
      <div className="justify-between flex">
        <div></div>
        <div style={{ width: 340 }} className="p-6 rounded-lg bg-[#fafafa]">
          <div className="justify-between flex">
            <div>
              <a target="_blank" href={"https://github.com/" + repository.full_name}>
                <h2 className="hover:underline text-lg font-semibold font-workSans">{repository.name}</h2>
              </a>
            </div>
            <div>
              <h2 className="bg-opacity-40 text-[white] font-semibold font-workSans text-md rounded-lg pt-1 pb-1 bg-[red] p-2">ISSUE</h2>
            </div>
          </div>
          <div>
            <h2 className="text-md font-workSans">@{repository.full_name.split("/")[0]}</h2>
          </div>
          <div className="pt-2">
            <h2 className="text-sm font-workSans" >{repository.description}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contribution