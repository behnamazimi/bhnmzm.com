import React from "react";
import StatusContextProvider from "../contexts/status.context";

function MyApp({Component, pageProps}) {
    return (
        <StatusContextProvider>
            <Component {...pageProps} />
        </StatusContextProvider>
    )
}

export default MyApp
