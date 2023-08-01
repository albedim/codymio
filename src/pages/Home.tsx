import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { BiGitRepoForked } from 'react-icons/bi'
import { SpinnerCircular } from "spinners-react";
import Repository, { Repo } from "../components/overview/Repository";
import Contribute from "../components/modal/IssuesModal";
import { HiArrowCircleLeft, HiArrowCircleRight, HiSearch } from "react-icons/hi";
import HomeLoader from "../components/loading/Loader";
import Loader from "../components/loading/Loader";
import IssuesModal from "../components/modal/IssuesModal";


const Home = () => {

  const [data, setData] = useState<Repo[]>([])

  const [page, setPage] = useState(0)

  const [modalOptions, setModalOptions] = useState({ repo_id: 0, repo_open_issues: 0, repo_full_name: "", visible: false })

  const [isLoading, setIsLoading] = useState(false)

  const [isSessionLoading, setIsSessionLoading] = useState(true)

  const [anyTopic, setAnyTopic] = useState(true)

  const [query, setQuery] = useState("")

  const [language, setLanguage] = useState("all")

  const [availableLanguages, setAvailableLanguages] = useState<string[]>([])

  const navigate = useNavigate()


  const getData = async () => {
    setIsLoading(true)
    await axios.get(BASE_URL + "/repo-github/fetch?query=" + (anyTopic ? "all" : query) + "&language=" + language + "&page="+page)
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
    <div className="mt-40 items-center justify-around w-screen flex">
      {
        isSessionLoading ? (
          <></>
        ) : (
          <>
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
                      <h2 className="font-semibold font-workSans" >Any Topic</h2>
                    </div>
                  </div>
                  <div className="p-4">
                    <input
                      style={{ display: anyTopic ? 'none' : 'block', opacity: anyTopic ? "64%" : "100%" }}
                      disabled={anyTopic}
                      onChange={(e) => setQuery(e.target.value)}
                      value={query}
                      placeholder="Search for a topic..."
                      className="pr-14 rounded-lg p-4 bg-[#fafafa]"
                      type="text"
                    />
                  </div>
                  <div className="p-4">
                    <select className="pr-14 rounded-lg p-4 bg-[#fafafa]" onChange={(e) => setLanguage(e.target.value)}
                      value={language} name="" id="">
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
                        <button className="font-workSans text-[white] rounded-lg pl-7 pr-7 p-4 bg-[black]" onClick={() => {
                          getData()
                          setPage(0)
                        }} >
                          <HiSearch size={24} color="white" />
                        </button>
                      ) : (
                        <button disabled className="font-workSans text-[white] rounded-lg pl-7 pr-7 p-4 bg-[black]" onClick={() => {
                          getData()
                          setPage(0)
                        }} >
                          <HiSearch size={24} color="white" />
                        </button>
                      )
                    }
                  </div>
                </div>
              </div>
              <div className="items-center justify-around flex">
                <div className="items-center flex">
                  <div className="p-2">
                    <HiArrowCircleLeft style={{ cursor: isLoading || page == 0 ? "default" : "pointer", opacity: isLoading || page == 0 ? "40%" : "100%" }} size={34} onClick={() => {
                      if(isLoading || page == 0 )
                        return;
                      if(page > 0){
                        setPage(page - 1)
                        getData()
                      }
                    }}/>
                  </div>
                  <h2 className="text-xl font-workSans">{page}</h2>
                  <div className="p-2" >
                    <HiArrowCircleRight style={{ cursor: isLoading || page == 0 ? "default" : "pointer", opacity: isLoading || page == 30 ? "40%" : "100%" }} size={34} onClick={() => {
                      if(isLoading || page == 30 )
                        return;
                      if(page < 30){
                        setPage(page + 1)
                        getData()
                      }
                    }}/>
                  </div>
                </div>
              </div>
              {
                isLoading ? (
                  <div className="mt-24">
                    <Loader padding={14} direction="horizontal" height={240} width={454} n={10}/>
                  </div>
                ) : (
                  <div className="mt-24 flex flex-wrap">
                    {
                      data.map((repo: Repo) => (
                        <Repository
                          onClick={() => setModalOptions({
                            repo_id: repo.github_repo_id,
                            repo_open_issues: repo.open_issues,
                            repo_full_name:
                              repo.full_name,
                            visible: true
                          })}
                          repository={repo}
                          loading={false}
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