import React, { useState } from "react"
import { AiFillDelete } from 'react-icons/ai'
import Stepper from "../stepper"
import MarkdownPreview from '@uiw/react-markdown-preview';
import { TbMarkdown } from "react-icons/tb";
import { LABELS } from "../../utils/labels";


interface ContributionProps {
  repository: RepositoryType
  issue_number: number,
  removable: boolean,
  onRemove: () => void
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
  issue_number,
  removable,
  onRemove
}) => {


  return (
    <div className="pb-14 p-4">
      <section
        className="bg-[#fafafa] border repository p-6 rounded-lg">
        <div className="items-center justify-between flex">
          <div>
            <a target="_blank" href={"https://github.com/" + repository.full_name}>
              <h2
                className="text-[#475072] hover:underline text-xl font-semibold font-workSans">{
                  repository.name}
              </h2>
            </a>
          </div>
          <div className="items-center justify-around flex">
            {
              removable ? (
                <AiFillDelete
                  className="cursor-pointer"
                  onClick={onRemove}
                  opacity={"40%"}
                  color="red"
                  size={24}
                />
              ) : null
            }
          </div>
        </div>
        <div>
          <h2
            className="text-[#475072] font-workSans">
            @{repository.full_name.split("/")[0]}
          </h2>
        </div>
        <div className="pt-2 border-t mt-4">
          <p className="text-[#475072] font-workSans" >
          {LABELS.stepper[repository.status]}</p>
          <div className="pb-4 pt-4 items-center flex">
            <a target="_blank" href={"https://github.com/"+repository.full_name+"/issues/"+issue_number}>
              <button className="transition hover:text-white hover:bg-[#7024f8] border-2 border-[#7024f8] text-sm font-workSans rounded-md p-2 text-[#7024f8] items-center flex">
                SEE ISSUE
              </button>
            </a>
          </div>
        </div>
        <div className="justify-between flex mt-4">
          <Stepper status={repository.status} />
          <div></div>
        </div>
      </section>
    </div>
  )
}

export default Contribution