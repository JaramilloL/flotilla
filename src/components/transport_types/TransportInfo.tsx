import { createClient } from "@supabase/supabase-js";
import { useContext, useEffect, useState } from "react"
import { Transport } from "../../interfaces/globalTypes";
import TrasportList from "./TrasportList";
import { Box, Typography } from "@mui/material";
import { UserContext } from "../../context/UserContext";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify'


//creamos el acceso a la base de datos de usuer para mostrar informacion
const supabase = createClient(
    import.meta.env.VITE_APP_URL || "",
    import.meta.env.VITE_APP_KEY || ""
  );

const TransportInfo = () => {
    const [dataTrasnports, setDataTrasnports] = useState<Transport[]>([])
    //creamos un estado para la eliminacion de datos
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false)
    //vamos a traer la informacion existente de la labla

    useEffect(()=>{
        try {
            (async()=>{
                const { data, error } = await supabase.from('transport_types').select('*')
    
                if(error) {
                    toast.error(error.message)
                }else{
                    console.log(data)
                    setDataTrasnports(data)
                }
            })()
        } catch (error) {
            if(error instanceof Error) {
                console.log(error.message)
            }
        }
    },[])

    //creacion de la funcion para eliminar
    const deleteTransport = async (id_transport:number) => {
        try {
            setLoadingDelete(true)
            const { error } = await supabase.from('transport_types').delete().eq('id_tranport', id_transport);

            if(error) {
                toast.error(error.message)
            }else{
                setDataTrasnports(trasnport => trasnport?.filter(t => t.id_tranport !== id_transport))
            }
        } catch (error) {
            if(error instanceof Error) {
                console.log(error.message)
            }
        }finally{
            setLoadingDelete(false)
        }
    }

    //graemos el contexto dela app para ver si el usuario esta autenticado
    const context = useContext(UserContext);

    if(!context){
        throw new Error('no context available')
    }

    const { user, loadingAuth } = context || {};

    if(loadingAuth) return <h1>Loading...</h1>
    if(!user) return <Navigate to='/'/>
  return (
    <Box width='90%' m='0 auto'>
        <Typography variant="h5" textAlign='center'>Types of Trasnports</Typography>
        <TrasportList dataTrasnports={ dataTrasnports } deleteTransport={deleteTransport} loadingDelete={loadingDelete} /> 
        <ToastContainer/>
    </Box>
  )
}

export default TransportInfo