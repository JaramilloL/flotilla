import { createClient, User } from "@supabase/supabase-js";
import { StateChildren } from "../interfaces/globalTypes";
import { UserContext } from "./UserContext";
import { useState } from "react";

const StateContext = ({ children }: StateChildren) => {
  const supabase = createClient(
    import.meta.env.VITE_APP_URL || "",
    import.meta.env.VITE_APP_KEY || ""
  );

  //creamos un estao para almacenar el login
  const [user, setUser] = useState<User | null>(null);

  //creamos la duncion para registrar usuarios mediante email y password
  const signUpUser = async (email: string, password: string): Promise<void> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        // options: {
        //   emailRedirectTo: "http://localhost:5173/users",
        // },
      });
      if (error) {
        console.log(error.message);
      } else if (data.user) {
        setUser(data.user);
        console.log("Usuario registrado:", data.user);
      }
      console.log(user);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        signUpUser,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default StateContext;
