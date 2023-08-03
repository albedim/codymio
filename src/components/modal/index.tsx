import React, { 
  useEffect, 
  useState 
} from "react";
import { RiCloseFill } from "react-icons/ri";
import "./Modal.css";
import axios from "axios";
import { 
  HiArrowCircleLeft, 
  HiArrowCircleRight 
} from "react-icons/hi";
import { BASE_URL } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Loader from "../loading";
import NoResults from "../no_results";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { USED_COLORS } from "../../App";


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
    await axios.get(BASE_URL + "/repositories/" + repo_full_name + "/issues?page=" + page, {
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
  }, [visible])

  return (
    <>
      {
        visible ? (
          <div className="modal">
            <div className="modal-wrapper p-4">
              <div
                style={{ borderColor: USED_COLORS[3], backgroundColor: USED_COLORS[0], borderRadius: 8 }}
                className="border modal-content"
                onClick={e => e.stopPropagation()}
              >
                <div className="pb-0 p-4 items-center justify-between flex">
                  <div></div>
                  <div><RiCloseFill className="cursor-pointer" onClick={() => { onClose(); }} color="gray" size={24} /></div>
                </div>
                <div className="p-8 justify-around flex">
                  <div>
                    <div className="pb-4">
                      <h2 style={{ color: USED_COLORS[1] }} className="text-xl font-semibold font-workSans">Issues ({open_issues})</h2>
                    </div>
                    <div className="items-center justify-around flex">
                      <div className="items-center flex">
                        <div className="p-2">
                          <HiArrowCircleLeft color={USED_COLORS[1]} style={{ cursor: isLoading || page == 0 ? "default" : "pointer", opacity: isLoading || page == 0 ? "40%" : "100%" }} size={34} onClick={() => {
                            if (isLoading || page == 0)
                              return;
                            if (page > 0) {
                              setPage(page - 1)
                              getIssues()
                            }
                          }} />
                        </div>
                        <h2 style={{ color: USED_COLORS[1] }} className="text-xl font-workSans">{page + 1}</h2>
                        <div className="p-2" >
                          <HiArrowCircleRight color={USED_COLORS[1]} style={{ cursor: isLoading || page == 30 ? "default" : "pointer", opacity: isLoading || page == 30 ? "40%" : "100%" }} size={34} onClick={() => {
                            if (isLoading || page == 30)
                              return;
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
                          <Loader direction={"vertical"} n={3} padding={14} height={154} width={424} />
                        ) : (
                          issues.length > 0 ? (
                            <div style={{ overflowY: 'scroll', maxHeight: 540 }}>
                              {
                                issues.map((issue: Issue) => (
                                  <div className="p-4">
                                    <div style={{ backgroundColor: USED_COLORS[2] }} className="justify-between flex rounded-lg p-4">
                                      <div>
                                        <h2
                                          style={{ color: USED_COLORS[1], maxWidth: 340 }}
                                          className="font-semibold text-lg font-workSans">{issue.title}
                                        </h2>
                                        <h2
                                          style={{ color: USED_COLORS[1] }}
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
                                        <div>
                                          {
                                            issue.has_pull_requests ? (
                                              <div className="pb-4 justify-around flex">
                                                <a title="This issue has pull requests already.">
                                                  <TbAlertTriangleFilled className="cursor-pointer" opacity={"40%"} size={24} color="orange" />
                                                </a>
                                              </div>
                                            ):(
                                              <></>
                                            )
                                          }
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
                                          }} size={34} color={USED_COLORS[1]} /></button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              }
                            </div>
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
        ) : (
          <></>
        )
      }
    </>
  );
};

export default IssuesModal;
