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

        {/* integrate google tag manager */}
        <script dangerouslySetInnerHTML={{
          __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${SITE_META.GTM}');
        `
        }}/>


      </Head>

      <FavIcons/>
      <SEO/>
    </>
  )
}

export default CustomHead
