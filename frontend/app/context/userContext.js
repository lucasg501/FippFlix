'use client'
const { createContext, useState } = require("react");


const UserContext = createContext();


export const UserProvider = ({children}) => {

    let usuarioLogado = null;
    
    if(typeof localStorage != "undefined") {
        usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    }
    const [user, setUser] = useState(usuarioLogado);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;