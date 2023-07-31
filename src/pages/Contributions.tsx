import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { BiGitRepoForked } from 'react-icons/bi'
import { SpinnerCircular } from "spinners-react";
import Repository, { Repo } from "../components/overview/Repository";
import Contribution, { RepoStatus } from "../components/contribution/Contribution";
import jwtDecode from "jwt-decode";

interface ContributedRepo {
  contributed_id: number,
  user_id: number,
  repository: Repository
  issue: Issue,
  status: RepoStatus
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
  merged: ContributedRepo[],
  unmerged: ContributedRepo[]
}

const Contributions = () => {

  const [data, setData] = useState<Response>({
    unseen: 0,
    merged: [],
    unmerged: []
  })

  const [page, setPage] = useState<"merged" | "unmerged">("unmerged")

  const [itemsPage, setItemsPage] = useState(0)

  const [isSessionLoading, setIsSessionLoading] = useState(true)

  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  const token: any = window.localStorage.getItem("token")

  const user: any = token ? jwtDecode<any>(token).sub : {}

  const getData = async () => {
    setIsLoading(true)
    await axios.get(BASE_URL + "/contributed-repo/user/" + user.user_id, {
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
    setIsLoading(true)
    await axios.post(BASE_URL + "/contributed-repo/seen", { user_id: user.user_id }, {
      headers: { "Authorization": "Bearer " + window.localStorage.getItem("github_token") }
    })
      .then(res => {
        setData({
          unseen: 0,
          merged: data.merged,
          unmerged: data.unmerged
        })
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }

  const loggedIn = async () => {
    await axios.get(BASE_URL + "/user/sync", {
      headers: { "Authorization": "Bearer " + token}
    })
      .then((res) => {
        getData()
      })
      .catch(err => navigate("/"))
    setIsSessionLoading(false)
  }

  useEffect(() => {
    loggedIn()
  }, [])

  return (
    <div className="mt-40 justify-around flex w-screen">
      {
        isSessionLoading ? (
          <></>
        ):(
          <div className="p-14">
            <div>
              <h2 className="text-2xl font-semibold font-workSans">My Contributions</h2>
            </div>
            <div className="flex">
              <div onClick={() => {
                setPage("unmerged")
              }} className="cursor-pointer pb-2 p-4" style={{ borderBottom: page == 'unmerged' ? "2px solid black" : "" }}>
                <h2 className="font-workSans">Unmerged</h2>
              </div>
              <div onClick={() => {
                setPage("merged")
                setSeen()
              }} className="cursor-pointer items-center flex pb-2 p-4" style={{ borderBottom: page == 'merged' ? "2px solid black" : "" }}>
                <h2 className="font-workSans">Merged</h2>
                {
                  data.unseen > 0 ? (
                    <div className="pl-4">
                      <div className="rounded-full pb-0 pt-0 p-1 bg-[red]">
                        <h2 className="text-sm rounded-full pb-0 pt-0 p-1 bg-[red] text-[white] font-workSans">{data.unseen}</h2>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )
                }
              </div>
            </div>
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
                <div className="flex-wrap flex">
                  {
                    data[page].map((contributedRepo: ContributedRepo) => (
                      <Contribution
                        repository={{
                          name: contributedRepo.repository.repo_full_name.split("/")[1],
                          github_repo_id: contributedRepo.repository.repo_id,
                          full_name: contributedRepo.repository.repo_full_name,
                          language: "",
                          status: contributedRepo.status
                        }}

                        issue={{
                          title: contributedRepo.issue.issue_title,
                          number: contributedRepo.issue.issue_number,
                          issue_id: contributedRepo.issue.issue_id,
                          body: contributedRepo.issue.issue_body,
                          owner: contributedRepo.issue.issue_owner
                        }}
                      />
                    ))
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