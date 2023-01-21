import React from "react"
import Head from "next/head"
import SITE_META from "../constants/site-meta.const"
import FavIcons from "./fav-icons"
import SEO from "./seo"

const CustomHead = () => {

  return (
    <>
      <Head>
        <meta charSet="UTF-8"/>
        <meta name="theme-color" content={SITE_META.themeColor}/>
        <meta name='viewport' key='viewport' content='width=device-width,minimum-scale=1'/>

        {/* add --loading class to html by default*/}
        <script dangerouslySetInnerHTML={{__html: `document.documentElement.classList.add("--loading")`}}/>

        <script
          src={`https://www.googletagmanager.com/gtag/js?id=${SITE_META.googleAnalytics.trackingID}`}
          async
        />

        <script dangerouslySetInnerHTML={
          {
            __html: `
            console.log("hello from head.js");
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            function tracking(event,data){dataLayer.push({event, ...data});}
            gtag("js", new Date());
            gtag("config", "${SITE_META.googleAnalytics.trackingID}");`
          }
        }/>

      </Head>

      <FavIcons/>
      <SEO/>
    </>
  )
}

export default CustomHead
