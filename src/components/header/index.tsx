import axios from "axios"
import { LuLogOut } from 'react-icons/lu'

import {
  useEffect,
  useState
} from "react"

import {
  BASE_FE_URL,
  BASE_URL
} from "../../utils/utils";

import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Menu from "../menu";

import { MdOutlineDone } from "react-icons/md";
import { GrNotification } from 'react-icons/gr'

import NotificationBadge from "../NotificationBadge";
import NoResults from "../no_results";
import Loader from "../loading/usermenu";
import { CSSTransition } from "react-transition-group";
import { BsCalendar2Date } from "react-icons/bs";
import Notification, { NotificationType } from "../notification";


const Header = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [isSessionLoading, setIsSessionLoading] = useState(false)

  const [notifications, setNotifications] = useState<NotificationType[]>([])

  const [visibleMenu, setVisibleMenu] = useState<"" | "notifications" | "user">("")

  const token: any = window.localStorage.getItem("token")

  const navigate = useNavigate()


  const loggedIn = async () => {
    await axios.get(BASE_URL + "/user/sync", {
      headers: { "Authorization": "Bearer " + token }
    })
      .then((res) => {
        setIsSessionLoading(true)
        if (!res.data.success) {
          window.localStorage.setItem("token", res.data.param.token)
        }
        updateData()
      })
      .catch(err => setIsLoggedIn(false))
  }

  const getNotifications = async (userId: number) => {
    await axios.get(BASE_URL + "/notifications/user/" + userId.toString())
      .then((res) => {
        setNotifications(res.data.param)
        setIsLoggedIn(true)
        setIsSessionLoading(false)
      })
      .catch(err => { })
  }

  const updateData = async () => {
    const userId = jwtDecode<any>(token).sub.user_id
    await axios.post(BASE_URL + "/contributions/update", { user_id: userId }, {
      headers: { "Authorization": "Bearer " + window.localStorage.getItem("github_token") }
    })
      .then((res) => {
        getNotifications(userId)
      })
      .catch(err => {
        updateData()
      })
  }


  useEffect(() => {
    loggedIn()
  }, [])

  const headerStyle = () => {
    if (window.location.pathname == "/") {
      return `z-20 border bg-[white] bg-opacity-10 top-0 fixed p-4 justify-between flex w-screen`
    }
    return `shadow backdrop-blur-sm z-20 top-0 fixed p-4 justify-between flex w-screen`
  }

  return (
    <header
      className={headerStyle()}>
      <div>
        <img
          className="cursor-pointer"
          width={45}
          src={require('../../images/logo.png')}
          alt=""
        />
      </div>
      <div className="flex items-center">
        {
          isLoggedIn ? (
            <div className="flex" >

              <div className="items-center flex mr-8">
                <div>
                  <NotificationBadge
                    color={"#f9f8fd"}
                    backgroundColor={"#7024f8"}
                    maxNumber={10}
                    number={notifications.length}
                  />
                  <GrNotification
                    color={"#475072"}
                    className="cursor-pointer"
                    onClick={() => {
                      setVisibleMenu(
                        visibleMenu == "notifications" ?
                          "" : "notifications"
                      )
                    }}
                    size={24}
                  />
                </div>
                <CSSTransition
                  in={visibleMenu == "notifications"}
                  timeout={300}
                  classNames="fade"
                  unmountOnExit
                >
                  <Menu
                    width={324}
                    maxHeight={540}
                    visible={visibleMenu == "notifications"}
                    backgroundColor={"white"}
                    color={"#475072"}>
                    {
                      notifications.length > 0 ? (
                        notifications.map((notification: NotificationType) => (
                          <Notification onRemove={(res: NotificationType[]) => setNotifications(res)} notification={notification} />
                        ))
                      ) : (
                        <div className="p-4">
                          <NoResults />
                        </div>
                      )
                    }
                  </Menu>
                </CSSTransition>
              </div>

              <div className="items-center flex">
                < div
                  onClick={() => setVisibleMenu(visibleMenu == "user" ? "" : "user")}
                  className="pr-6"
                >
                  <img
                    style={{ borderRadius: "50%" }}
                    width={40.4}
                    src={jwtDecode<any>(token).sub.avatar}
                    alt=""
                    className="cursor-pointer"
                  />
                </div >
                <CSSTransition
                  in={visibleMenu == "user"}
                  timeout={300}
                  classNames="fade"
                  unmountOnExit
                >
                  <Menu
                    visible={visibleMenu == "user"}
                    backgroundColor={"white"}
                    color={"#475072"}
                  >

                    <div
                      onClick={() => navigate("/contributions")}
                      className="hover:opacity-80 cursor-pointer  mb-1 mt-1 p-1 pr-4 pl-4">
                      <h2>Dashboard</h2>
                    </div>

                    <div onClick={() => {
                      window.localStorage.removeItem("token")
                      window.localStorage.removeItem("github-token")
                      window.location.href = BASE_FE_URL
                    }} className="hover:opacity-80 cursor-pointer items-center flex mb-1 mt-1 p-1 pr-4 pl-4">
                      <div className="pr-2"><LuLogOut /></div>
                      <h2>Log out</h2>
                    </div>

                  </Menu>
                </CSSTransition>
              </div>
            </div>
          ) : (
            isSessionLoading ? (
              <div>
                <Loader />
              </div>
            ) : (
              <></>
            )
          )
        }
      </div>
    </header>
  )

}

export default Header