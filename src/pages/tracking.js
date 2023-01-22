import React, {useEffect} from "react"
import CustomHead from "../layout/head";

function Tracking({event}) {

  useEffect(() => {
    document.title = "Tracking";
    if (event) {
      // do not push to dataLayer if event it has an item contains the event already
      if (!window.dataLayer?.some(item => item.event === event)) {
        window.dataLayer.push({event});
      }
    } else {
      window.location.href = "/"
    }
  }, [])

  return (
    <div style={{display: "none"}}>
      <CustomHead/>
    </div>
  )
}

// server side props
export async function getServerSideProps(context) {
  const {event} = context.query;
  return {
    props: {
      event: event || null
    }
  }
}

export default Tracking
