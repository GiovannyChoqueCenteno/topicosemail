import { IUser } from "./IUser";

export interface IAuthState{
    user : IUser | null,
    ruta : string 
    token? : string
}