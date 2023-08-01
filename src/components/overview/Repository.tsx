import React, { useState } from "react"
import { AiFillCode } from "react-icons/ai"
import { BiGitRepoForked } from 'react-icons/bi'
import { useNavigate } from "react-router-dom"

interface RepositoryProps {
  repository: Repo | null,
  onClick: () => void,
  loading: boolean
}

export interface Repo {
  name: string,
  github_repo_id: number,
  open_issues: number,
  full_name: string,
  description: string,
  forks: number,
  language: string
}

const Repository: React.FC<RepositoryProps> = ({
  repository,
  onClick
}) => {

  return (
    <div className="pb-14 p-4">
      <div className="repository p-6 rounded-lg bg-[#fafafa]">
        <div className="justify-between flex">
          <div>
            <a target="_blank" href={"https://github.com/" + repository?.full_name}>
              <h2 className="hover:underline text-xl font-semibold font-workSans">{repository?.name}</h2>
            </a>
          </div>
          <div className="items-center flex pr-3 pl-3 rounded-md text-[black] border-2 border-[black]">
            <h2 className="font-workSans">{repository?.open_issues} Issues</h2>
          </div>
        </div>
        <div>
          <h2 className="font-workSans">@{repository?.full_name.split("/")[0]}</h2>
        </div>
        <div className="pt-2">
          <h2 style={{ maxWidth: 254 }} className="font-workSans" >{repository?.description}</h2>
          <div className="pt-2 items-center flex">
            <div className="pr-2"><BiGitRepoForked /></div>
            <h2 className="font-semibold font-workSans">{repository?.forks}</h2>
          </div>
        </div>
        <div className="pt-8 justify-between flex">
          {
            repository?.language ? (
              <div className="items-center flex">
                <div><AiFillCode size={18} color="black" /></div>
                <h2 className="bg-opacity-40 text-[black] rounded-md p-2 text-sm font-semibold font-lato" >{repository?.language}</h2>
              </div>
            ) : (
              <div></div>
            )
          }
          <div>
            <button onClick={onClick} className="rounded-md font-workSans text-sm p-2 text-[white] bg-[black]">
              Contribute
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Repository