import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const Header = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const token: any = window.localStorage.getItem("token")

  const loggedIn = async () => {
    await axios.get(BASE_URL + "/user/sync", {
      headers: { "Authorization": "Bearer " + window.localStorage.getItem("token") }
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
  })

  return(
    <div className="top-0 bg-[white] bg-opacity-10 fixed border-b p-4 justify-between flex w-screen">
      <div>
        <img width={145} src={require('../../images/logo.png')} alt="" />
      </div>
      <div>
        {
          isLoggedIn ? (
            <img  style={{ borderRadius: "50%" }} width={40.4} src={jwtDecode<any>(token).sub.avatar} alt="" />
          ):(
            <></>
          )
        }
      </div>
    </div>
  )

}

export default Header