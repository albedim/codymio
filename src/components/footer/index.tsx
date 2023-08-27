import { BiLogoTwitter } from "react-icons/bi"

const Footer = () => {
  return(
    <div className="mt-24">
    <footer className="p-14 items-center justify-around flex w-screen">
      <div className="justify-between flex">
        <div className="flex">
          <div className="pr-2">
            <img width={24} src={require("../../images/logo.png")} alt="" />
          </div>
          <p>Codymio 2023© - All rights reserved</p>
        </div>
        <div className="w-40"></div>
        <div className="flex">
          <a target="_blank" href="https://twitter.com/TheAlbeDim">
            <div className="cursor-pointer">
              <BiLogoTwitter color="#7024f8" size={24}/>
            </div>
          </a>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer