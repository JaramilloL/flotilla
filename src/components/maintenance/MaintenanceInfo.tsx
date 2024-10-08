import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Navigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { Maintenance } from "../../interfaces/globalTypes";
import MaintenanceTable from "./MaintenanceTable";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

//creamos el acceso a la base de datos de usuer para mostrar informacion
const supabase = createClient(
  import.meta.env.VITE_APP_URL || "",
  import.meta.env.VITE_APP_KEY || ""
);

const MaintenanceInfo = () => {
  //guardmos los datos resividos en un estado de react
  const [dataMaintenance, setDataMaintenance] = useState<Maintenance[]>([]);
  const [loadindDelete, setLoadindDelete] = useState<boolean>(false)
  const [loadingData, setLoadingData] = useState<boolean>(false);

  //vamos a mostrar los datos de los manteniimientos
  useEffect(() => {
    try {
      setLoadingData(true);
      (async () => {
        const { data, error } = await supabase
          .from("maintenance_records")
          .select("*");

        if (error) {
          console.log(error.message);
        } else {
          console.log("exito", data);
          setDataMaintenance(data);
        }
      })();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      setLoadingData(false);
    }
  }, []);

  //funsiond de eliminar datos
  const deleteMaintenance = async(id_maintenance: number) => {
    try {
      setLoadindDelete(true)
      const { data, error } = await supabase.from('maintenance_records').delete().eq('id_maintenance', id_maintenance)

      if(error){
        console.log(error.message)
      }else{
        console.log('succeffull', data)
        setDataMaintenance((prev)=> prev?.filter(deleteM=> deleteM.id_maintenance !== id_maintenance))
      }
    } catch (error) {
      if(error instanceof Error) {
        console.log(error.message);
      }
    }finally{
      setLoadindDelete(false)
    }
  }

  const context = useContext(UserContext);

  if (!context) {
    throw new Error("no context");
  }
  const { loadingAuth, user } = context || {};

  if (loadingAuth)
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress color="secondary" size="50px" />
      </Box>
    );
  if (!user) return <Navigate to="/" />;

  return (
    <div>
      <MaintenanceTable
        dataMaintenance={dataMaintenance}
        loadingData={loadingData}
        deleteMaintenance={ deleteMaintenance }
        loadindDelete={loadindDelete}
      />
    </div>
  );
};

export default MaintenanceInfo;
