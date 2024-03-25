import Header from "../../components/header"
import NavBar from "../../components/navbar"

interface LayoutProps {
  currPage: "home" | "contributions" | "logout",
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ( props ) => {
  return (
    <div className="w-screen flex h-screen">
      <NavBar page={props.currPage}/>
      <div className="marginLeftNavbar">
        <Header/>
        {props.children}
      </div>
    </div>
  )
}

export default Layout