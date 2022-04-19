import jwtDecode from "jwt-decode"
import { IUser } from "../../../types/IUser";

export const decodeToken = ( token : string) : IUser=>{
    return jwtDecode(token) as IUser;
}