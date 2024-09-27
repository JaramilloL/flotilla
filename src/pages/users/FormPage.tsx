import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { Navigate } from "react-router-dom"
import CreateUser from "../../components/users/CreateUser"

const FormPage = () => {
    //traemos el contexto para verificar si existe el login de usuario
    const context =  useContext(UserContext)

    if(!context) {
        throw new Error("no context")
    }

    const { user } = context;

    if(!user) return <Navigate to='/'/>

  return (
    <div>
        <CreateUser/>
    </div>
  )
}

export default FormPage