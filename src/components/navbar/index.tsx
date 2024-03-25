import { FaBookBookmark } from 'react-icons/fa6'
import { MdAccountCircle, MdFavorite, MdPeopleAlt } from 'react-icons/md'
import { IoIosCreate, IoMdPerson } from 'react-icons/io'
import { IoLogOut } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './index.css'
import { eraseCookie } from '../../utils/utils'


interface NavBarProps {
  page: "home" | "contributions" | "logout",
}

const NavBar: React.FC<NavBarProps> = ( props ) => {

  const navigate = useNavigate()

  return (
    <div className="top-0 z-40 bg-[white] fixed h-screen wi p-4 border">
      <div className="items-center flex pt-8 pb-4 border-b">
        <div>
          <img width={42} src={require("../../images/logo.png")} alt="" />
        </div>
        <h2 className='block-none text-[#7024f8] ml-2 text-xl font-semibold font-cabin pl-2'>Cody<span className='text-[#7024f8] font-bold'>mio</span></h2>
      </div>
      <div className='pb-8 border-b mt-8'>
        <ul>
          <Link to={"/home"}>
            <li className="cursor-pointer pb-2 align-center flex">
              {props.page == 'home' ? (
                <div
                  className='text-[#7024f8] transition-all w-full p-2 flex bg-opacity-10 bg-[#7024f8] rounded-md'>
                  <div className='items-center justify-around flex'><FaBookBookmark size={14} /></div>
                  <p className='block-none font-cabin pl-2' >Home</p>
                </div>
              ):(
                <div
                  className='hover:text-[#7024f8] transition-all w-full p-2 flex 
                             hover:bg-opacity-10 hover:bg-[#7024f8] rounded-md'
                >
                  <div className='items-center justify-around flex'><FaBookBookmark size={14} /></div>
                  <p className='block-none font-cabin pl-2' >Home</p>
                </div>
              )}
            </li>
          </Link>
          <Link to={"/contributions"}>
            <li className="cursor-pointer pb-2 align-center flex">
              {props.page == 'contributions' ? (
                <div className='text-[#7024f8] transition-all w-full p-2 flex bg-opacity-10 bg-[#7024f8] rounded-md'>
                  <div className='items-center justify-around flex'><MdPeopleAlt size={14} /></div>
                  <p className='block-none font-cabin pl-2' >Dashboard</p>
                </div>
              ):(
                <div className='hover:text-[#7024f8] transition-all 
                                w-full p-2 flex hover:bg-opacity-10 hover:bg-[#7024f8] rounded-md'
                >
                  <div className='items-center justify-around flex'><MdPeopleAlt size={14} /></div>
                  <p className='block-none font-cabin pl-2' >Dashboard</p>
                </div>
              )}
            </li>
          </Link>
        </ul>
      </div>
      <div className='mt-4'>
        <ul>
          <li 
            onClick={() => { 
              eraseCookie("jwt-token"); 
              navigate("/"); 
              navigate(0) 
            }} 
            className="cursor-pointer pb-2 align-center flex"
          >
            <div className='hover:text-[white] transition-all w-full p-2 flex hover:bg-[#D33939] rounded-md'>
              <div className='items-center justify-around flex'><IoLogOut size={14} /></div>
              <p className='block-none font-cabin pl-2' >Esci</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar