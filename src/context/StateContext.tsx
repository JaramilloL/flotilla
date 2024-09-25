import { createClient, User } from "@supabase/supabase-js";
import { StateChildren } from "../interfaces/globalTypes";
import { UserContext } from "./UserContext";
import { useEffect, useState } from "react";

//se movio fuera del componente para evitar multiples resderizados
const supabase = createClient(
  import.meta.env.VITE_APP_URL || "",
  import.meta.env.VITE_APP_KEY || ""
);

const StateContext = ({ children }: StateChildren) => {

  //creamos un estao para almacenar el login
  const [user, setUser] = useState<User | null>(null);

  //creamos la duncion para registrar usuarios mediante email y password
  const signUpUser = async (email: string, password: string): Promise<void> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "http://localhost:5173/users",
        },
      });
      if (error) {
        console.log(error.message);
      } else if (data.user) {
        // setUser(data.user);
        console.log("Usuario registrado:", data.user);
      }
      console.log(user);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const sigIn = async(email: string, password: string): Promise<void> => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if(error){
            console.log(error.message);
        }else if (data.user){
            console.log(data.session)
            console.log(data.session.access_token)
        }
    } catch (error) {
        if(error instanceof Error) {
            console.log(error.message);
        }
    }
  }

  const signOutUser =async()=>{
    try {
        const { error } = await supabase.auth.signOut()
        if(error) {
            console.log(error.message);
        }
    } catch (error) {
        if(error instanceof Error) {
            console.log(error.message);
        }
    }
  }

  //creamos un escucha para ver si el usuario es autenticado o no ya que define el acceso o no a la pagina
  useEffect(()=>{
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session)=>{ 
        setUser(session?.user ?? null)
        console.log("Auth event:", event);
        console.log("User:", session?.user ?? null);
    })

    return ()=> {
        authListener?.subscription.unsubscribe();   
    }
  },[])

  return (
    <UserContext.Provider
      value={{
        signUpUser,
        user,
        sigIn,
        signOutUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default StateContext;
