import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL } from "../utils/utils";
import { useNavigate } from "react-router-dom";

const Overview = () => {

  const urlParams: any = new URLSearchParams(window.location.search);

  const navigate = useNavigate()


  const login = async () => {
    window.location.assign("https://github.com/login/oauth/authorize/?client_id="+process.env.REACT_APP_CLIENT_ID)
  }

  const signin = async (code: string) => {
    await axios.post(BASE_URL + "/user/github-access", {
      code: code
    })
      .then((res) => {
        window.localStorage.setItem("token", res.data.param.token)
        console.log(res.data.param)
        window.localStorage.setItem("github_token", res.data.param.github_token)
        navigate("/home")
      })
      .catch(err => console.log(err))
  }

  const loggedIn = async () => {
    await axios.get(BASE_URL + "/user/sync", {
      headers: { "Authorization": "Bearer " + window.localStorage.getItem("token") }
    })
      .then((res) => {
        if (!res.data.success) {
          window.localStorage.setItem("token", res.data.param.token)
        }
        navigate("/home")
      })
      .catch(err => {
        
      })
  }

  useEffect(() => {
    const code = urlParams.get('code');
    if (code != "")
      signin(code)
  }, [urlParams])

  useEffect(() => {
    loggedIn()
  }, [])

  return (
    <div className="bg-img items-center justify-around flex h-screen w-screen">
      <div className="p-4">
        <h2 className="text-4xl font-semibold font-workSans">
          Find the perfect <br />open source for you.
        </h2>
        <h2 className="mt-5 text-xl font-workSans">
          We'll help you find the rights open source projects
          to contribute to. <br />We'll manage
          your commits and repository updates, for free.
        </h2>
        <div className="mt-8">
          <button onClick={() => login()} className="font-normal text-[white] font-workSans rounded-lg p-4 bg-[black]">
            GET STARTED
          </button>
        </div>
      </div>
    </div>
  )


}

export default Overview