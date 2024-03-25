import Header from "../../components/header"
import NavBar from "../../components/navbar"

interface LayoutProps {
  currPage: "home" | "contributions" | "logout",
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ( props ) => {
  return (
    <div className="w-screen h-screen">
      <NavBar page={props.currPage}/>
      <div>
        <Header/>
        {props.children}
      </div>
    </div>
  )
}

export default Layout