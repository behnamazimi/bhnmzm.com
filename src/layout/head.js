import React from "react"
import Head from "next/head"
import SITE_META from "../constants/site-meta.const"
import FavIcons from "./fav-icons"
import SEO from "./seo"
import Script from "next/script";

const CustomHead = () => {

    return (
        <>
            <Head>
                <meta charSet="UTF-8"/>
                <meta name="theme-color" content={SITE_META.themeColor}/>
                <meta name='viewport' key='viewport' content='width=device-width,minimum-scale=1'/>

                {/* add --loading class to html by default*/}
                <Script dangerouslySetInnerHTML={{
                    __html: `document.documentElement.classList.add("--loading")`
                }}/>

                <Script dangerouslySetInnerHTML={{
                    __html: `
                     (function (i, s, o, g, r, a, m) {
                    i['GoogleAnalyticsObject'] = r;
                    i[r] = i[r] || function () {
                    (i[r].q = i[r].q || []).push(arguments)
                        }, i[r].l = 1 * new Date();
                            a = s.createElement(o),
                            m = s.getElementsByTagName(o)[0];
                            a.async = 1;
                            a.src = g;
                            m.parentNode.insertBefore(a, m)
                        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

                    ga('create', 'UA-100855945-1', 'auto');
                    ga('send', 'pageview');`
                }}>

                </Script>
            </Head>

            <FavIcons/>
            <SEO/>
        </>
    )
}

export default CustomHead
