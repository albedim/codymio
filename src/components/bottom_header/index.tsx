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
import { IoSearchCircleSharp } from "react-icons/io5";
import { HiSearch } from "react-icons/hi";


const BottomHeader = () => {

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (e: any) => {
    setVisible(window.scrollY > 140)
  }

  return (
    visible ? (
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="flex bottom-24 fixed justify-between w-4/5">
        <div></div>
        <div className="transition hover:bg-opacity-70 cursor-pointer bg-[#7024f8] rounded-full p-2"><HiSearch color="white" size={38} /></div>
      </div>
    ) : null
  )

}

export default BottomHeader