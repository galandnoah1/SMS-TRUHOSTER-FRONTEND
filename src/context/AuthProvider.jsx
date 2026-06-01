import { createContext, useContext, useState } from "react";
import { users } from "../data/data";

const AuthContext = createContext(null)



function AuthProvider({children})
{
    const[user, setUser] = useState(null)

    const login = (email, password)=>{

        const found = users.find(u => u.email === email && u.password === password);
        
        if(found)
        {
            setUser(found);
            return true;
        }

        return false;
    }

    const logout = ()=>{
        setUser(null)
    }

    return <AuthContext.Provider value={{user, login, logout}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = ()=> useContext(AuthContext)