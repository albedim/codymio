import React, {
  useEffect,
  useState
} from "react";

import { RiCloseFill } from "react-icons/ri";
import axios from "axios";
import '../index.css'

import {
  HiArrowCircleLeft,
  HiArrowCircleRight
} from "react-icons/hi";

import { BASE_URL } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Loader from "../../loading";
import NoResults from "../../no_results";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { USED_COLORS } from "../../../App";
import Issue from "../../issue";


interface ContributeProps {
  onClose: () => void,
  visible: boolean,
  open_issues: number
  repo_full_name: string,
  repo_id: number
}

interface Issue {
  title: string,
  created_on: string,
  body: string,
  number: number,
  has_contributed: boolean,
  has_pull_requests: boolean,
  issue_id: number,
  creator_username: string
}


const IssuesModal: React.FC<ContributeProps> = ({
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
    await axios.get(BASE_URL + "/repositories/" + repo_id +
      "/issues?repo_full_name=" + repo_full_name +
      "&user_id=" + user.user_id +
      "&page=" + page, {
      headers: { "Authorization": "Bearer " + window.localStorage.getItem("github_token") }
    })
      .then(res => setIssues(res.data.param))
      .catch(err => console.log(err))
    setIsLoading(false)
  }

  const addContribution = async (obj: any) => {
    await axios.post(BASE_URL + "/contributions/create", obj)
      .then(res => navigate("/contributions"))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    setPage(0)
    getIssues()
  }, [repo_id])

  return (
    <>
      {
        visible ? (
          <div className="z-30 modal">
            <div className="modal-wrapper p-4">
              <div
                style={{ backgroundColor: USED_COLORS[0], borderRadius: 8 }}
                className="border modal-content"
                onClick={e => e.stopPropagation()}
              >
                <div className="pb-0 p-4 items-center justify-between flex">
                  <div></div>
                  <div>
                    <RiCloseFill
                      className="cursor-pointer"
                      onClick={() => { onClose(); }}
                      color="gray"
                      size={24}
                    />
                  </div>
                </div>
                <div className="p-8 justify-around flex">
                  <div>
                    <div className="pb-4">
                      <p
                        className="text-[#475072] text-xl font-semibold font-workSans">Issues ({open_issues})
                      </p>
                    </div>
                    <div className="items-center justify-around flex">
                      <div className="items-center flex">
                        <div className="p-2">
                          <HiArrowCircleLeft
                            color={"#7024f8"}
                            style={{
                              cursor: isLoading || page == 0 ? "default" : "pointer",
                              opacity: isLoading || page == 0 ? "40%" : "100%"
                            }}
                            size={34}
                            onClick={() => {
                              if (isLoading || page == 0)
                                return;
                              if (page > 0) {
                                setPage(page - 1)
                                getIssues()
                              }
                            }}
                          />
                        </div>
                        <p className="text-[#475072] text-xl font-workSans">
                          {page + 1}
                        </p>
                        <div className="p-2" >
                          <HiArrowCircleRight
                            color={"#7024f8"}
                            style={{
                              cursor: isLoading || page == 30 ? "default" : "pointer",
                              opacity: isLoading || page == 30 ? "40%" : "100%"
                            }}
                            size={34}
                            onClick={() => {
                              if (isLoading || page == 30)
                                return;
                              if (page <= 30) {
                                setPage(page + 1)
                                getIssues()
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div style={{ overflowX: 'hidden', overflowY: 'scroll', maxHeight: 540 }}>
                        {
                          isLoading ? (
                            <Loader />
                          ) : (
                            issues.length > 0 ? (
                              issues.map((issue: Issue) => (
                                <Issue
                                  onCreate={() => addContribution({
                                      issue_owner: issue.creator_username,
                                      user_id: user.user_id,
                                      repo_id: repo_id,
                                      repo_full_name: repo_full_name,
                                      issue_id: issue.issue_id,
                                      issue_number: issue.number,
                                      issue_title: issue.title,
                                      issue_body: issue.body
                                    })
                                  }
                                  hasPullRequests={issue.has_pull_requests} 
                                  creator_username={issue.creator_username} 
                                  title={issue.title} 
                                  created_on={issue.created_on}
                                  onAlert={() => alert("This issue has open pull requests already")}
                                  has_contributed={issue.has_contributed}
                                />
                              ))
                            ) : (
                              <NoResults />
                            )
                          )
                        }
                      </div>
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

export default IssuesModal;
