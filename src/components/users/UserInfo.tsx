import Button from '@mui/material/Button'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

const UserInfo = () => {
    const context = useContext(UserContext)

    const { signOutUser } = context || {}

    if(!context) {
        throw new Error('a fallado')
    }

    const navigate = useNavigate()
    //creamos una funcion para cerrar ecion
    const closeseccion = ()=>{
        try {
            if(signOutUser){
                signOutUser()
            }
            navigate('/')
        } catch (error) {
            if(error instanceof Error) {
                console.log(error.message)
            }
        }
    }
  return (
    <div>UserInfo
        signOut

        <Button variant="contained" color="primary" onClick={closeseccion}>
          LogOut
        </Button>
    </div>
  )
}

export default UserInfo