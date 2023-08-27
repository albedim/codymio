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
import NoResults from "../../components/no_results";
import { Checkbox, ThemeProvider, createTheme } from "@mui/material";
import jwtDecode from "jwt-decode";
import AlertsModal from "../../components/modal/alerts";
import { LABELS } from "../../utils/labels";


const theme = createTheme({
  palette: {
    primary: {
      main: "#7024f8"
    }
  },
});

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
    const token: any = window.localStorage.getItem("token")
    const user = jwtDecode<any>(token).sub
    await axios.get(BASE_URL + "/repositories/fetch?query=" +
      (anyTopic ? "all" : query) + "&language=" + language + "&userId=" + user.user_id + "&page=" + page, {
      headers: { "Authorization": "Bearer " + window.localStorage.getItem("github_token") }
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
      className="bg-[#f9f8fd] mt-40 items-center justify-around w-screen flex">
      {
        isSessionLoading ? (
          <div className="justify-around flex mt-24">
            <Loader />
          </div>
        ) : (
          <>
            <AlertsModal
              text={LABELS.contribution.already_contributed}
              onClose={() => setAlertVisible(false)}
              visible={alertVisible}
            />
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
            />
            <div className="w-4/5">
              <div className="justify-around flex">
                <div className="flex-block">
                  <div className="pl-4 flex items-center">
                    <div className="block-flex">
                      <div className="padding-right items-center justify-around flex">
                        <ThemeProvider theme={theme}>
                          <Checkbox
                            onChange={() => setAnyTopic(!anyTopic)}
                            style={{ zIndex: 10 }}
                            checked={anyTopic}
                          />
                        </ThemeProvider>
                      </div>
                      <p
                        className="text-[#475072] font-semibold font-workSans" >
                        Any Topic
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <input
                      style={{
                        color: "#475072",
                        backgroundColor: "#fafafa",
                        display: anyTopic ? 'none' : 'block',
                        opacity: anyTopic ? "64%" : "100%"
                      }}
                      disabled={anyTopic}
                      onChange={(e) => setQuery(e.target.value)}
                      value={query}
                      placeholder="Search for a topic..."
                      className="outline-none border pr-14 rounded-lg p-4"
                      type="text"
                    />
                  </div>
                  <div className="p-4">
                    <select
                      className="cursor-pointer outline-none border pr-14 rounded-lg p-4"
                      onChange={(e) => setLanguage(e.target.value)}
                      value={language} name="" id=""
                      style={{ color: "#475072", backgroundColor: "#fafafa" }}
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
                          className="bg-[#7024f8] font-workSans text-[#f9f8fd] rounded-lg pl-7 pr-7 p-4"
                          onClick={() => {
                            getData()
                            setPage(0)
                          }}
                        >
                          <HiSearch size={24} color={"#f9f8fd"} />
                        </button>
                      ) : (
                        <button
                          disabled
                          className="bg-[#7024f8] opacity-40 font-workSans text-[#f9f8fd] rounded-lg pl-7 pr-7 p-4"
                          onClick={() => {
                            getData()
                            setPage(0)
                          }} >
                          <HiSearch size={24} color={"#f9f8fd"} />
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
                      color={"#7024f8"}
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
                  <p
                    className="text-[#475072] text-xl font-workSans">{page + 1}
                  </p>
                  <div className="p-2" >
                    <HiArrowCircleRight
                      style={{
                        cursor: isLoading || page == 30 ? "default" : "pointer",
                        opacity: isLoading || page == 30 ? "40%" : "100%"
                      }}
                      color={"#7024f8"}
                      size={34} onClick={() => {
                        console.log(data.length)
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
                  <div className="justify-around flex mt-24">
                    <Loader />
                  </div>
                ) : (
                  data.length > 0 ? (
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
                  ) : (
                    <div className="justify-around flex" >
                      <div className="p-24" >
                        <NoResults />
                      </div>
                    </div>
                  )
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