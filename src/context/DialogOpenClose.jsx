import { createContext, useState } from "react";

const dialogOpenCloseContext = createContext();

const DialogOpenCloseProvider = ({ children }) => {

    const [modal, setModal] = useState(false);
    const [modal_ac, setModalAC] = useState(false);
    const [refetchList, setRefetchList] = useState(false);

    return (
        <dialogOpenCloseContext.Provider value={{ modal, setModal, refetchList, setRefetchList , modal_ac, setModalAC }}>
            {children}
        </dialogOpenCloseContext.Provider>
    )
}

export { dialogOpenCloseContext, DialogOpenCloseProvider }