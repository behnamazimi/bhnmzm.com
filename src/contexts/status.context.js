import React, {useEffect} from "react"

export const StatusContext = React.createContext();

export default function StatusContextProvider({children}) {

    const [status, setStatus] = React.useState({
        menuVisibility: false,
        isAuthenticated: void 0,
        user: null,
    });

    useEffect(() => {
        if (status.menuVisibility) {
            document.documentElement.classList.add("--no-scroll")
        } else {
            document.documentElement.classList.remove("--no-scroll")
        }
    }, [status.menuVisibility])

    function toggleMenu() {
        setStatus((preStatus) => ({
            ...preStatus,
            menuVisibility: !status.menuVisibility
        }))
    }

    const providerValue = {...status, toggleMenu};

    return (
        <StatusContext.Provider value={providerValue}>
            {children}
        </StatusContext.Provider>
    )
}
