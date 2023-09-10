import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_FE_URL, BASE_URL, getCookie, setCookie } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { USED_COLORS } from "../../App";
import jwtDecode from "jwt-decode";
import { IoIosArrowForward } from 'react-icons/io'


const Overview = () => {

  const urlParams: any = new URLSearchParams(window.location.search);

  const navigate = useNavigate()

  const [username, setUsername] = useState("")

  const [isloggedIn, setIsLoggedIn] = useState(false)


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
        setCookie("token", res.data.param.token, 7)
        console.log(res.data.param)
        setCookie("github_token", res.data.param.github_token, 7)
        window.location.href = BASE_FE_URL + "/home"
      })
      .catch(err => {

      })
  }

  const loggedIn = async () => {
    await axios.get(BASE_URL + "/user/sync", {
      headers: { "Authorization": "Bearer " + getCookie("token") }
    })
      .then((res) => {
        if (!res.data.success) {
          setCookie("token", res.data.param.token, 7)
          setCookie("github_token", res.data.param.github_token, 7)
        }
        setIsLoggedIn(true)
        const token: any = getCookie("token")
        const username = jwtDecode<any>(token).sub.username
        setUsername(username)
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
    <div className="items-center justify-around flex h-screen w-screen">
      <main className="pt-4 p-14">
        <h1 style={{ lineHeight: 1.3 }} className="text-[#475072] text font-bold font-workSans">
          We didn't create open source <br />
          We just made it <span className="text-[#f9f8fd] pl-2 pr-2 p-1 rounded-lg bg-[#7024f8]">more accessible.</span>
        </h1>
        <h2 className="text-[#475072] mt-8 text-xl font-workSans">
          Find the perfect open source projects
          to contribute to. <br />
          500+ developers are getting closer
          to open source with Codymio. <br />
          Manage your pull requests & Track our contributions easily
        </h2>
        <div className="flex mt-14">
          <div className="pr-8">
            {
              isloggedIn ? (
                <button
                  style={{
                    //color: "#f9f8fd", 
                    width: 264,
                    //backgroundColor: "#7024f8"
                  }}
                  onClick={() => navigate("/home")}
                  className="transformLeft hover:ml-3 border-[#7024f8] hover:bg-[transparent] border-2 hover:text-[#7024f8] flex bg-[#7024f8] shadow-lg text-[#f9f8fd] font-semibold font-workSans rounded-md p-5">
                  Welcome back {username}
                  <div className="pl-2"><IoIosArrowForward size={24} /></div>
                </button>
              ) : (
                <button
                  style={{
                    //color: "#f9f8fd", 
                    width: 264,
                    //backgroundColor: "#7024f8"
                  }}
                  onClick={() => login()}
                  className="transformLeft hover:ml-3 border-[#7024f8] hover:bg-[transparent] border-2 hover:text-[#7024f8] flex bg-[#7024f8] shadow-lg text-[#f9f8fd] font-semibold font-workSans rounded-md p-5">
                  Get started with Github
                  <div className="pl-2"><IoIosArrowForward size={24} /></div>
                </button>
              )
            }
          </div>
        </div>
      </main>
    </div>
  )


}

export default Overview