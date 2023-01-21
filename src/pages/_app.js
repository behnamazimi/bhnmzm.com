import React, {useEffect} from "react";
import StatusContextProvider from "../contexts/status.context";
import "../styles/styles.scss"
import Router from "next/router";
import SITE_META from "../constants/site-meta.const";

function MyApp({Component, pageProps}) {

  // integrate Google Analytics
  useEffect(() => {
      const onRouteChange = (url) => {
        window.gtag('config', SITE_META.googleAnalytics.trackingID, {
          page_path: url,
        });
      }

      // current page tracking
      onRouteChange(window.location.pathname);
      Router.events.on('routeChangeComplete', onRouteChange);
      return () => {
        Router.events.off('routeChangeComplete', onRouteChange);
      }
    }
    , []);

  return (
    <StatusContextProvider>
      <Component {...pageProps} />
    </StatusContextProvider>
  )
}

export default MyApp
