import { createContext, useState } from "react";

const dialogOpenCloseContext = createContext();

const DialogOpenCloseProvider = ({ children }) => {

    const [modal, setModal] = useState(false);
    const [refetchList, setRefetchList] = useState(false);

    return (
        <dialogOpenCloseContext.Provider value={{ modal, setModal, refetchList, setRefetchList }}>
            {children}
        </dialogOpenCloseContext.Provider>
    )
}

export { dialogOpenCloseContext, DialogOpenCloseProvider }