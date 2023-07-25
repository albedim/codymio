import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { RiCloseFill } from "react-icons/ri";
import "./Modal.css";
import axios from "axios";
import { MdBookmarkRemove, MdOutlineBookmark, MdOutlineFlightTakeoff } from "react-icons/md";
import { FaRegSadCry } from "react-icons/fa";
import { HiArrowCircleRight } from "react-icons/hi";
import { BASE_URL } from "../../utils/utils";



interface ContributeProps {
  onClose: () => void,
  visible: boolean,
  open_issues: number
  repo_full_name: string
}

interface Issue{
  title: string,
  created_on: string,
  body: string,
  issue_id: number,
  creator_username: string
}


const Contribute: React.FC<ContributeProps> = ({
  visible,
  onClose,
  repo_full_name,
  open_issues
}) => {

  const [page, setPage] = useState(0)

  const [showMore, setShowMore] = useState(0)

  const [issues, setIssues] = useState([])

  const getIssues = async () => {
    await axios.get(BASE_URL + "/repo-github/issues/"+repo_full_name+"?page="+page)
    .then(res => setIssues(res.data.param))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    getIssues()
  },[visible])

  return (
    <>
      {
        visible ? (
          <div className="modal">
            <div className="modal-wrapper p-4">
              <div style={{ borderRadius: 8 }} className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="pb-0 p-4 items-center justify-between flex">
                  <div></div>
                  <div><RiCloseFill className="cursor-pointer" onClick={() => { onClose(); }} color="gray" size={24} /></div>
                </div>
                <div className="p-8 justify-around flex">
                  <div>
                    <div className="pb-4">
                      <h2 className="text-xl font-semibold font-workSans">Issues ({open_issues})</h2>
                    </div>
                    <div style={{ overflowY: 'scroll', maxHeight: 540 }}>
                      {
                        issues.map((issue: Issue) => (
                          <div className="p-4">
                          <div style={{ maxWidth: 340 }} className="rounded-lg p-4 bg-[#fafafa]">
                            <h2 className="font-semibold text-lg font-workSans">{issue.title}</h2>
                            <h2 className="font-normal text-md font-workSans">@{issue.creator_username}</h2>
                            {
                              showMore == issue.issue_id ? (
                                <div>
                                  <h2 className="text-md font-normal font-workSans mt-2">{issue.body}</h2>
                                  <h2>Show less</h2>
                                </div>
                              ):(
                                <div className="hidden">
                                  {
                                    issue.body?.length > 240 ? (
                                      showMore == issue.issue_id ? (
                                        <div>
                                          <h2 className="text-md font-normal font-workSans mt-2">{issue.body}</h2>
                                          <h2 onClick={() => setShowMore(0)}>Show less</h2>
                                        </div>
                                      ):(
                                        <div>
                                        <h2 className="text-md font-normal font-workSans mt-2">{issue.body.substring(240) + "..."}</h2>
                                        <h2 onClick={() => setShowMore(issue.issue_id)} >Show more</h2>
                                      </div>
                                      )
                                    ):(
                                      <div>
                                      <h2 className="text-md font-normal font-workSans mt-2">{issue.body}</h2>
                                    </div>
                                    )
                                  }
                                </div>
                              )
                            }
                            <h2 className="mt-1 font-semibold font-workSans text-[gray]">{
                              issue.created_on.substring(0,10).split("-")[2] + "/" +
                              issue.created_on.substring(0,10).split("-")[1] + "/" +
                              issue.created_on.substring(0,10).split("-")[0]
                            }</h2>
                          </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )
      }
    </>
  );
};

export default Contribute;
