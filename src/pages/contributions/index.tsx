import axios from "axios"

import { 
  useEffect, 
  useState 
} from "react"

import { BASE_URL } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import Contribution from "../../components/contribution";
import jwtDecode from "jwt-decode";
import Loader from "../../components/loading";
import NoResults from "../../components/no_results";
import { USED_COLORS } from "../../App";
import NotificationBadge from "../../components/NotificationBadge";


interface ContributionType {
  contribution_id: number,
  user_id: number,
  repository: Repository
  issue: Issue,
  removable: boolean
  status: "completed" | "none" | "pushed"
}

interface Repository {
  repo_id: number,
  repo_full_name: string
}

interface Issue {
  issue_id: number,
  issue_number: number,
  issue_owner: string,
  issue_title: string,
  issue_body: string
}

interface Response {
  unseen: number,
  completed: ContributionType[],
  uncompleted: ContributionType[]
}

const Contributions = () => {

  const [data, setData] = useState<Response>({
    unseen: 0,
    completed: [],
    uncompleted: []
  })

  const [page, setPage] = useState<"completed" | "uncompleted">("uncompleted")

  const [isSessionLoading, setIsSessionLoading] = useState(true)

  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  const token: any = window.localStorage.getItem("token")

  const user: any = token ? jwtDecode<any>(token).sub : {}


  const getData = async () => {
    setIsLoading(true)
    await axios.get(BASE_URL + "/contributions/user/" + user.user_id, {
      headers: { "Authorization": "Bearer " + window.localStorage.getItem("github_token") }
    })
      .then(res => {
        console.log("aaa")
        setData(res.data.param)
        setIsLoading(false)
        console.log("a", res.data.param)
      })
      .catch(err => console.log(err))
  }

  const setSeen = async () => {
    await axios.post(BASE_URL + "/contributions/seen", { user_id: user.user_id }, {
      headers: { "Authorization": "Bearer " + window.localStorage.getItem("github_token") }
    })
      .then(res => {
        setData({
          unseen: 0,
          completed: data.completed,
          uncompleted: data.uncompleted
        })
      })
      .catch(err => console.log(err))
  }

  const loggedIn = async () => {
    await axios.get(BASE_URL + "/user/sync", {
      headers: { "Authorization": "Bearer " + token }
    })
      .then((res) => {
        getData()
      })
      .catch(err => navigate("/"))
    setIsSessionLoading(false)
  }

  const removeContribution = async (ContributionId: number) => {
    await axios.delete(BASE_URL + "/contributions/" + ContributionId)
      .then((res) => getData())
      .catch(err => console.log(err))
  }

  useEffect(() => {
    loggedIn()
    document.title = "Codymio - Dashboard"
  }, [])

  return (
    <div
      className="mt-40 justify-around flex w-screen">
      {
        isSessionLoading ? (
          <></>
        ) : (
          <div className="p-8">
            <div>
              <h1
                className="text-[#475072] text-2xl font-semibold font-workSans">
                  My Contributions
              </h1>
            </div>
            <div className="flex">
              <div
                onClick={() => {
                  setPage("uncompleted")
                }}
                className="text-[#475072] cursor-pointer pb-2 p-4"
                style={{ 
                  borderBottom: page == 'uncompleted' ? 
                  "2px solid #7024f8" : ""
                }}
              >
                <h2 
                  className="text-[#475072] font-workSans">In progress
                </h2>
              </div>
              <div
                onClick={() => {
                  setPage("completed")
                  setSeen()
                }}
                className="cursor-pointer items-center flex pb-2 p-4"
                style={{ 
                  borderBottom: page == 'completed' ? 
                  "2px solid #7024f8" : ""
                }}
              >
                <h2 
                  className="text-[#475072] font-workSans">
                    Completed
                </h2>
                <div>
                  <NotificationBadge 
                    maxNumber={10} 
                    number={data.unseen} 
                    backgroundColor="red" 
                    color="white" 
                  />
                </div>
              </div>
            </div>
            {
              isLoading ? (
                <div className="mt-24">
                  <Loader/>
                </div>
              ) : (
                <div className="mt-8 flex-wrap flex">
                  {
                    data[page].length > 0 ? (
                      data[page].map((contribution: ContributionType) => (
                        <Contribution
                          repository={{
                            name: contribution.repository.repo_full_name.split("/")[1],
                            github_repo_id: contribution.repository.repo_id,
                            full_name: contribution.repository.repo_full_name,
                            language: "",
                            status: contribution.status
                          }}

                          issue={{
                            title: contribution.issue.issue_title,
                            number: contribution.issue.issue_number,
                            issue_id: contribution.issue.issue_id,
                            body: contribution.issue.issue_body,
                            owner: contribution.issue.issue_owner
                          }}
                          
                          removable={contribution.removable}
                          onRemove={() => removeContribution(contribution.contribution_id)}
                        />
                      ))
                    ) : (
                      <div className="p-14">
                        <NoResults />
                      </div>
                    )
                  }
                </div>
              )
            }
          </div>
        )
      }
    </div>
  )


}

export default Contributions