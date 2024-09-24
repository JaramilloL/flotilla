import { createContext } from "react";
import { StateUser } from "../interfaces/globalTypes";

export const UserContext = createContext<StateUser | undefined>({} as StateUser);