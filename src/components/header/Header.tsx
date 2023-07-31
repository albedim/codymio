import axios from "axios"
import { LuLogOut } from 'react-icons/lu'
import { useEffect, useState } from "react"
import { BASE_FE_URL, BASE_URL } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const Header = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const token: any = window.localStorage.getItem("token")

  const navigate = useNavigate()



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
      return "top-0 bg-[white] bg-opacity-10 fixed border-b p-4 justify-between flex w-screen"
    }
    return "top-0 bg-[white] bg-opacity-80 fixed border-b p-4 justify-between flex w-screen"
  }

  return (
    <div className={headerStyle()}>
      <div>
        <img className="cursor-pointer" width={145} src={require('../../images/logo.png')} alt="" />
      </div>
      <div>
        {
          isLoggedIn ? (
            <div className="items-center flex">
              <div className="pr-6">
                <LuLogOut size={18} onClick={() => {
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
            <h2>sdgsd</h2>
          )
        }
      </div>
    </div>
  )

}

export default Header