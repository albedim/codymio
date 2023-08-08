import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { HiArrowCircleLeft, HiArrowCircleRight, HiSearch } from "react-icons/hi";
import HomeLoader from "../../components/loading";
import Loader from "../../components/loading";
import IssuesModal from "../../components/modal/issues";
import Repository, { RepositoryType } from "../../components/repository";
import { USED_COLORS } from "../../App";
import { Alert, AlertTitle } from "@mui/material";
import ErrorAlert from "../../components/alert/error";


const Home = () => {

  const [data, setData] = useState<RepositoryType[]>([])

  const [page, setPage] = useState(0)

  const [modalOptions, setModalOptions] = useState({ repo_id: 0, repo_open_issues: 0, repo_full_name: "", visible: false })

  const [isLoading, setIsLoading] = useState(false)

  const [isSessionLoading, setIsSessionLoading] = useState(true)

  const [anyTopic, setAnyTopic] = useState(true)

  const [query, setQuery] = useState("")

  const [language, setLanguage] = useState("all")

  const [availableLanguages, setAvailableLanguages] = useState<string[]>([])

  const navigate = useNavigate()

  const [alertVisible, setAlertVisible] = useState(false)


  const getData = async () => {
    setIsLoading(true)
    await axios.get(BASE_URL + "/repositories/fetch?query=" + 
    (anyTopic ? "all" : query) + "&language=" + language + "&page=" + page, {
      headers: { "Authorization": "Bearer " + window.localStorage.getItem("token") }
    })
      .then(res => setData(res.data.param))
      .catch(err => console.log(err))
    setIsLoading(false)
  }

  const getlanguages = async () => {
    await axios.get(BASE_URL + "/server/languages")
      .then(res => setAvailableLanguages(res.data.param))
      .catch(err => console.log(err))
  }

  const loggedIn = async () => {
    await axios.get(BASE_URL + "/user/sync", {
      headers: { "Authorization": "Bearer " + window.localStorage?.getItem("token") }
    })
      .then((res) => {
        getData()
        getlanguages()
      })
      .catch(err => navigate("/"))
    setIsSessionLoading(false)
  }

  useEffect(() => {
    loggedIn()
  }, [])

  return (
    <div 
      style={{ backgroundColor: USED_COLORS[0] }} 
      className="mt-40 items-center justify-around w-screen flex">
      {
        isSessionLoading ? (
          <></>
        ) : (
          <>
            <ErrorAlert visible={alertVisible} />
            <IssuesModal
              repo_id={modalOptions.repo_id}
              open_issues={modalOptions.repo_open_issues}
              onClose={() => setModalOptions({
                repo_id: 0,
                repo_open_issues: 0,
                repo_full_name: "",
                visible: false
              })}
              repo_full_name={modalOptions.repo_full_name}
              visible={modalOptions.visible}
              onAlert={() => {
                alert("This issue has open pull requests already")
              }}
            />
            <div className="w-4/5">
              <div className="justify-around flex">
                <div className="flex-block">
                  <div className="pl-4 flex items-center">
                    <div className="block-flex">
                      <div className="padding-right items-center justify-around flex">
                        <input
                          className="w-4 h-4 text-black-600 
                          bg-gray-100 border-gray-300 rounded focus:ring-black-500 
                          dark:focus:ring-black-600 dark:ring-offset-gray-800 
                          focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          onChange={() => setAnyTopic(!anyTopic)}
                          checked={anyTopic}
                          type="checkbox"
                        />
                      </div>
                      <h2 
                        style={{ 
                        color: USED_COLORS[1] }} 
                        className="font-semibold font-workSans" >
                          Any Topic
                      </h2>
                    </div>
                  </div>
                  <div className="p-4">
                    <input
                      style={{ 
                        color: USED_COLORS[1], 
                        backgroundColor: USED_COLORS[2], 
                        display: anyTopic ? 'none' : 'block', 
                        opacity: anyTopic ? "64%" : "100%" 
                      }}
                      disabled={anyTopic}
                      onChange={(e) => setQuery(e.target.value)}
                      value={query}
                      placeholder="Search for a topic..."
                      className="pr-14 rounded-lg p-4"
                      type="text"
                    />
                  </div>
                  <div className="p-4">
                    <select
                      className="pr-14 rounded-lg p-4"
                      onChange={(e) => setLanguage(e.target.value)}
                      value={language} name="" id=""
                      style={{ color: USED_COLORS[1], backgroundColor: USED_COLORS[2] }}
                    >
                      <option value="all">Any Language</option>
                      {
                        availableLanguages.map((language: string) => (
                          <option value={language}>{language}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="p-4">
                    {
                      anyTopic || !anyTopic && query != "" ? (
                        <button
                          className="font-workSans text-[white] rounded-lg pl-7 pr-7 p-4"
                          style={{ backgroundColor: USED_COLORS[1] }}
                          onClick={() => {
                            getData()
                            setPage(0)
                          }}
                        >
                          <HiSearch size={24} color={USED_COLORS[0]} />
                        </button>
                      ) : (
                        <button
                          disabled
                          className="font-workSans text-[white] rounded-lg pl-7 pr-7 p-4"
                          style={{ backgroundColor: USED_COLORS[1] }}
                          onClick={() => {
                            getData()
                            setPage(0)
                          }} >
                          <HiSearch size={24} color={USED_COLORS[0]} />
                        </button>
                      )
                    }
                  </div>
                </div>
              </div>
              <div className="items-center justify-around flex">
                <div className="items-center flex">
                  <div className="p-2">
                    <HiArrowCircleLeft
                      style={{
                        cursor: isLoading || page == 0 ? "default" : "pointer",
                        opacity: isLoading || page == 0 ? "40%" : "100%"
                      }}
                      size={34}
                      color={USED_COLORS[1]}
                      onClick={() => {
                        if (isLoading || page == 0)
                          return;
                        if (page > 0) {
                          setPage(page - 1)
                          getData()
                        }
                      }}
                    />
                  </div>
                  <h2 
                    style={{ color: USED_COLORS[1] }} 
                    className="text-xl font-workSans">{page + 1}
                  </h2>
                  <div className="p-2" >
                    <HiArrowCircleRight
                      style={{
                        cursor: isLoading || page == 30 ? "default" : "pointer",
                        opacity: isLoading || page == 30 ? "40%" : "100%"
                      }}
                      color={USED_COLORS[1]}
                      size={34} onClick={() => {
                        if (isLoading || page == 30)
                          return;
                        if (page < 30) {
                          setPage(page + 1)
                          getData()
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              {
                isLoading ? (
                  <div className="mt-24">
                    <Loader
                      padding={14}
                      backgroundColor={USED_COLORS[2]}
                      foregroundColor={USED_COLORS[4]}
                      direction="horizontal"
                      height={284}
                      width={450}
                      n={10}
                    />
                  </div>
                ) : (
                  <div className="mt-24 flex flex-wrap">
                    {
                      data.map((repo: RepositoryType) => (
                        <Repository
                          onClick={() => setModalOptions({
                            repo_id: repo.github_repo_id,
                            repo_open_issues: repo.open_issues,
                            repo_full_name:
                              repo.full_name,
                            visible: true
                          })}
                          onAlert={() => {
                            setAlertVisible(true)
                            setTimeout(() => {
                              setAlertVisible(false)
                            }, 5400)
                          }}
                          repository={repo}
                        />
                      ))
                    }
                  </div>
                )
              }
            </div>
          </>
        )
      }
    </div>
  )


}

export default Home