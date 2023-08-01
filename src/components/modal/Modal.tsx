import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { RiCloseFill } from "react-icons/ri";
import "./Modal.css";
import axios from "axios";
import { MdBookmarkRemove, MdOutlineBookmark, MdOutlineFlightTakeoff } from "react-icons/md";
import { FaRegSadCry } from "react-icons/fa";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import { BASE_URL } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { SpinnerCircular } from "spinners-react";


interface ContributeProps {
  onClose: () => void,
  visible: boolean,
  open_issues: number
  repo_full_name: string,
  repo_id: number,
}

interface Issue {
  title: string,
  created_on: string,
  body: string,
  number: number,
  issue_id: number,
  creator_username: string
}


const Contribute: React.FC<ContributeProps> = ({
  visible,
  onClose,
  repo_full_name,
  repo_id,
  open_issues
}) => {

  const [page, setPage] = useState(0)

  const [isLoading, setIsLoading] = useState(false)

  const token: any = window.localStorage.getItem("token")

  const user: any = jwtDecode<any>(token).sub

  const navigate = useNavigate()

  const [issues, setIssues] = useState([])


  const getIssues = async () => {
    setIsLoading(true)
    await axios.get(BASE_URL + "/repo-github/issues/" + repo_full_name + "?page=" + page, {
      headers: { "Authorization": "Bearer " + window.localStorage.getItem("github_token") }
    })
      .then(res => setIssues(res.data.param))
      .catch(err => console.log(err))
    setIsLoading(false)
  }

  const addContribution = async (obj: any) => {
    await axios.post(BASE_URL + "/contributed-repo/create", obj)
      .then(res => navigate("/contributions"))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    setPage(0)
    getIssues()
  }, [visible])

  return (
    <>
      {
        visible ? (
          <div className="modal">
            <div className="modal-wrapper p-4">
              <div
                style={{ borderRadius: 8 }}
                className="modal-content"
                onClick={e => e.stopPropagation()}
              >
                <div className="pb-0 p-4 items-center justify-between flex">
                  <div></div>
                  <div><RiCloseFill className="cursor-pointer" onClick={() => { onClose(); }} color="gray" size={24} /></div>
                </div>
                <div className="p-8 justify-around flex">
                  <div>
                    <div className="pb-4">
                      <h2 className="text-xl font-semibold font-workSans">Issues ({open_issues})</h2>
                    </div>
                    <div className="items-center justify-around flex">
                      <div className="items-center flex">
                        <div className="p-2">
                          <HiArrowCircleLeft style={{ opacity: isLoading || page == 0 ? "40%" : "100%" }} size={34} onClick={() => {
                            if (page > 0) {
                              setPage(page - 1)
                              getIssues()
                            }
                          }} />
                        </div>
                        <h2 className="text-xl font-workSans">{page}</h2>
                        <div className="p-2" >
                          <HiArrowCircleRight style={{ opacity: isLoading || page == 30 ? "40%" : "100%" }} size={34} onClick={() => {
                            if (page <= 30) {
                              setPage(page + 1)
                              getIssues()
                            }
                          }} />
                        </div>
                      </div>
                    </div>
                    <div>
                      {
                        isLoading ? (
                          <div className="justify-around mt-24 flex">
                            <div>
                              <div className="justify-around flex">
                                <SpinnerCircular
                                  secondaryColor="#fafafa"
                                  size={54.4}
                                  color="black"
                                  thickness={214}
                                />
                              </div>
                              <h2 className="mt-2 text-2xl font-semibold font-workSans">Loading...</h2>
                            </div>
                          </div>
                        ) : (
                          <div style={{ overflowY: 'scroll', maxHeight: 540 }}>
                            {
                              issues.map((issue: Issue) => (
                                <div className="p-4">
                                  <div className="justify-between flex rounded-lg p-4 bg-[#fafafa]">
                                    <div>
                                      <h2
                                        style={{ maxWidth: 340 }}
                                        className="font-semibold text-lg font-workSans">{issue.title}
                                      </h2>
                                      <h2
                                        className="font-normal text-md font-workSans">@{issue.creator_username}
                                      </h2>
                                      <h2
                                        className="mt-1 font-semibold font-workSans text-[gray]"
                                      >{
                                          issue.created_on.substring(0, 10).split("-")[2] + "/" +
                                          issue.created_on.substring(0, 10).split("-")[1] + "/" +
                                          issue.created_on.substring(0, 10).split("-")[0]
                                        }
                                      </h2>
                                    </div>
                                    <div className="items-center justify-around flex">
                                      <button><HiArrowCircleRight onClick={() => {
                                        addContribution({
                                          issue_owner: issue.creator_username,
                                          user_id: user.user_id,
                                          repo_id: repo_id,
                                          repo_full_name: repo_full_name,
                                          issue_id: issue.issue_id,
                                          issue_number: issue.number,
                                          issue_title: issue.title,
                                          issue_body: issue.body
                                        })
                                      }} size={34} color="black" /></button>
                                    </div>
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                        )
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
