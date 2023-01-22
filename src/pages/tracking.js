import React, {useEffect} from "react"
import {useRouter} from "next/router";
import CustomHead from "../layout/head";

function Tracking() {
  const {query: {event}} = useRouter();

  useEffect(() => {
    document.title = "Tracking";
    if (event) {
      window.dataLayer?.push({event});
    }
  }, [event])

  return (
    <div style={{display: "none"}}>
      <CustomHead/>
    </div>
  )
}

export default Tracking
