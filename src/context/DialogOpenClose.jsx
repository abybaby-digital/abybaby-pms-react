import { createContext, useState } from "react";

const dialogOpenCloseContext = createContext();

const DialogOpenCloseProvider = ({ children }) => {

    const [modal, setModal] = useState(false);

    return (
        <dialogOpenCloseContext.Provider value={{ modal, setModal }}>
            {children}
        </dialogOpenCloseContext.Provider>
    )
}

export { dialogOpenCloseContext, DialogOpenCloseProvider }