import { Outlet } from "react-router-dom"
import NavBar from "../components/nav/NavBar"

const Index = () => {
  return (
    <div>
        <NavBar/>
        <Outlet/>
    </div>
  )
}

export default Index