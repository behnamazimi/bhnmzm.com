import React from "react"
import {StatusContext} from "../contexts/status.context"

export default function useStatusContext() {
    return React.useContext(StatusContext)
}
