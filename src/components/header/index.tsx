import axios from "axios"
import { LuLogOut } from 'react-icons/lu'
import { useEffect, useState } from "react"
import { BASE_FE_URL, BASE_URL } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { USED_COLORS } from "../../App";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";


const Header = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const token: any = window.localStorage.getItem("token")

  const navigate = useNavigate()

  const [darkMode, setDarkMode] = useState(window.localStorage.getItem("theme") == "dark")


  const loggedIn = async () => {
    await axios.get(BASE_URL + "/user/sync", {
      headers: { "Authorization": "Bearer " + token }
    })
      .then((res) => {
        if (!res.data.success) {
          window.localStorage.setItem("token", res.data.param.token)
        }
        setIsLoggedIn(true)
      })
      .catch(err => setIsLoggedIn(false))
  }

  useEffect(() => {
    loggedIn()
  }, [])

  const headerStyle = () => {
    if (window.location.pathname == "/") {
      return "top-0 bg-[" + USED_COLORS[0] + "] fixed border-b p-4 justify-between flex w-screen"
    }
    return "top-0 bg-[" + USED_COLORS[0] + "] fixed border-b p-4 justify-between flex w-screen"
  }

  return (
    <div style={{ borderColor: USED_COLORS[0] }} className={headerStyle()}>
      <div>
        <img className="cursor-pointer" width={145} src={require('../../images/logo.png')} alt="" />
      </div>
      <div className="flex items-center">
        <div>
          {
            darkMode ? (
              <div className="pr-6">
                <BsFillSunFill className="cursor-pointer" size={18} onClick={() => {
                  window.localStorage.setItem("theme", "light")
                  navigate(0)
                }}
                  color={USED_COLORS[1]}
                />
              </div>
            ) : (
              <div className="pr-6">
                <BsFillMoonFill className="cursor-pointer" size={18} onClick={() => {
                  window.localStorage.setItem("theme", "dark")
                  navigate(0)
                }}
                  color={USED_COLORS[1]}
                />
              </div>
            )
          }
        </div>
        {
          isLoggedIn ? (
            <div className="items-center flex">
              <div className="pr-6">
                <LuLogOut className="cursor-pointer" size={18} onClick={() => {
                  window.localStorage.removeItem("token")
                  window.localStorage.removeItem("github-token")
                  window.location.href = BASE_FE_URL
                }}
                  color={"red"}
                />
              </div>
              <a title="Go to your dashboard">
                <img
                  onClick={() => navigate("/contributions")}
                  style={{ borderRadius: "50%" }}
                  width={40.4}
                  src={jwtDecode<any>(token).sub.avatar}
                  alt=""
                  className="cursor-pointer"
                />
              </a>
            </div>
          ) : (
            <></>
          )
        }
      </div>
    </div>
  )

}

export default Header