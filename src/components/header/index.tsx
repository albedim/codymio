import axios from "axios"
import { LuLogOut } from 'react-icons/lu'

import {
  useEffect,
  useState
} from "react"

import {
  BASE_FE_URL,
  BASE_URL,
  eraseCookie,
  getCookie,
  setCookie
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

  const token: any = getCookie("token")

  const navigate = useNavigate()


  const loggedIn = async () => {
    await axios.get(BASE_URL + "/user/sync", {
      headers: { "Authorization": "Bearer " + token }
    })
      .then((res) => {
        setIsSessionLoading(true)
        if (!res.data.success) {
          setCookie("token", res.data.param.token, 30)
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
      headers: { "Authorization": "Bearer " + getCookie("github_token") }
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

  return (
    <header
      className="p-8 top-0 left-0 right-0 bg-[white] border-b top-0 fixed backdrop-blur-sm items-center justify-between flex h-20 w-screen">
      <div></div>
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
                    backgroundColor={"#fafafa"}
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