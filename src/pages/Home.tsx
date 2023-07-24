import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { BiGitRepoForked } from 'react-icons/bi'
import { SpinnerCircular } from "spinners-react";
import Repository, { Repo } from "../components/overview/Repository";
import Contribute from "../components/modal/Modal";


const Home = () => {

  const [data, setData] = useState<Repo[]>([])

  const [modalOptions, setModalOptions] = useState({ repo_id: 0, visible: false }) 

  const [isLoading, setIsLoading] = useState(false)

  const [anyTopic, setAnyTopic] = useState(true)

  const [query, setQuery] = useState("")

  const [language, setLanguage] = useState("all")

  const [availableLanguages, setAvailableLanguages] = useState<string[]>([])


  const getData = async () => {
    setIsLoading(true)
    await axios.get(BASE_URL + "/repo-github/fetch?query=" + (anyTopic ? "all" : query) + "&language=" + language)
      .then(res => setData(res.data.param))
      .catch(err => console.log(err))
    setIsLoading(false)
  }


  const getlanguages = async () => {
    await axios.get(BASE_URL + "/server/languages")
      .then(res => setAvailableLanguages(res.data.param))
      .catch(err => console.log(err))
  }


  useEffect(() => {
    getData()
    getlanguages()
  }, [])

  return (
    <div className="mt-40 items-center justify-around w-screen flex">
      <Contribute onClose={() => setModalOptions({ repo_id: 0, visible: false })} repo_id={modalOptions.repo_id} visible={modalOptions.visible} />
      <div className="w-4/5">
        <div className="justify-around flex">
          <div className="flex">
            <div className="flex items-center">
              <div>
                <div className="items-center justify-around flex">
                  <input className="w-4 h-4 text-black-600 bg-gray-100 border-gray-300 rounded focus:ring-black-500 dark:focus:ring-black-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={() => setAnyTopic(!anyTopic)} checked={anyTopic} type="checkbox" />
                </div>
                <h2 className="font-semibold font-workSans" >Any Topic</h2>
              </div>
            </div>
            <div className="p-4">
              <input style={{ display: anyTopic ? 'none' : 'block', opacity: anyTopic ? "64%" : "100%" }} disabled={anyTopic} onChange={(e) => setQuery(e.target.value)} value={query} placeholder="Search for a topic..." className="pr-14 rounded-lg p-4 bg-[#fafafa]" type="text" />
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
                  <button className="font-workSans text-[white] rounded-lg pl-14 pr-14 p-4 bg-[black]" onClick={() => {
                    getData()
                  }} >ok</button>
                ) : (
                  <button disabled className="font-workSans text-[white] rounded-lg pl-14 pr-14 p-4 bg-[black]" onClick={() => {
                    getData()
                  }} >ok</button>
                )
              }
            </div>
          </div>
        </div>
        <div>
          <h2>{query != "" && language != "choose"}</h2>
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
            <div className="mt-24 flex flex-wrap">
              {
                data.map((repo: Repo) => (
                  <Repository onClick={() => setModalOptions({ repo_id: repo.github_repo_id, visible: true })} repository={repo} />
                ))
              }
            </div>
          )
        }
      </div>
    </div>
  )


}

export default Home