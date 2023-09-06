import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_FE_URL, BASE_URL } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { USED_COLORS } from "../../App";
import jwtDecode from "jwt-decode";


const Overview = () => {

  const urlParams: any = new URLSearchParams(window.location.search);

  const navigate = useNavigate()

  const [isloggedIn, setIsLoggedIn] = useState(true)


  const login = async () => {
    window.location.assign(
      "https://github.com/login/oauth/authorize/?client_id=" + 
      process.env.REACT_APP_CLIENT_ID
    )
  }

  const signin = async (code: string) => {
    await axios.post(BASE_URL + "/user/github-access", {
      code: code
    })
      .then((res) => {
        window.localStorage.setItem("token", res.data.param.token)
        console.log(res.data.param)
        window.localStorage.setItem("github_token", res.data.param.github_token)
        window.location.href = BASE_FE_URL + "/home"
      })
      .catch(err => {
        if(code)
          alert("sfsfssfs")
      })
  }

  const loggedIn = async () => {
    await axios.get(BASE_URL + "/user/sync", {
      headers: { "Authorization": "Bearer " + window.localStorage.getItem("token") }
    })
      .then((res) => {
        if (!res.data.success) {
          window.localStorage.setItem("token", res.data.param.token)
        }
        window.location.href = BASE_FE_URL + "/home"
      })
      .catch(err => {
        setIsLoggedIn(false)
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
    isloggedIn ? (
      <></>
    ) : (
      <div className="bg-[#f9f8fd] items-center justify-around flex h-screen w-screen">
        <main className="p-14">
          <h1 className="text-[#475072] text font-semibold font-workSans">
            We didn't create open source <br />We just made it more accessible.
          </h1>
          <h2 className="text-[#475072] mt-8 text-xl font-workSans">
            <b>Find the perfect open source projects
            to contribute to.</b> Manage
            your pull <br />requests and track your contributions easily. 500+ developers are getting <br />closer
            to open source with Codymio.
          </h2>
          <div className="flex mt-14">
            <div className="pr-8">
              <button 
                style={{ 
                  color: "#f9f8fd", 
                  width: 240,
                  backgroundColor: "#7024f8"
                }} 
                onClick={() => login()} 
                className="font-normal font-workSans rounded-md p-4">
                GET STARTED
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  )


}

export default Overview