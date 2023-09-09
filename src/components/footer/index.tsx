import { BiLogoTwitter } from "react-icons/bi"
import { GrGithub } from "react-icons/gr"

const Footer = () => {
  return (
    <div className="mt-24">
      <footer className="p-14 items-center justify-around flex w-screen">
        <div className="items-center justify-between flex">
          <div className="flex">
            <div className="pr-2">
              <img width={24} src={require("../../images/logo.png")} alt="" />
            </div>
            <p>Codymio 2023© - All rights reserved</p>
          </div>
          <div className="w-40"></div>
          <div className="flex">
            <a target="_blank" href="https://github.com/codymio">
              <div  className="p-2 rsor-pointer">
                <GrGithub color="#7024f8" size={24} />
              </div>
            </a>
            <a target="_blank" href="https://twitter.com/codymioOS">
              <div className="p-2 cursor-pointer">
                <BiLogoTwitter color="#7024f8" size={24} />
              </div>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer