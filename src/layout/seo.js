import React from "react"
import PropTypes from "prop-types"
import Head from "next/head"
import SITE_META from "../constants/site-meta.const"

const SEO = ({title, description, ogImage, children}) => {

    const mainTitle = title ? `${title} - ${SITE_META.seo.title}` : `${SITE_META.seo.title} - ${SITE_META.seo.mainSubtitle}`

    return (
        <Head>
            <meta name="description" key="description" content={description || SITE_META.seo.description}/>
            <meta name="keywords" key="keywords" content={SITE_META.seo.keywords}/>
            <meta name="subject" key="subject" content={mainTitle}/>
            <meta name="copyright" key="copyright" content={SITE_META.copyright}/>
            <meta name="author" key="author" content={SITE_META.seo.author}/>
            <meta name="distribution" key="distribution" content="global"/>
            <meta name="rating" key="rating" content="safe for kids"/>
            <meta name="language" key="language" content="English"/>

            <meta name="twitter:site" key="twitter_site" content={SITE_META.seo.OGURL}/>
            <meta name="twitter:card" key="twitter_card" content="summary_large_image"/>
            <meta name="twitter:image" key="twitter_image" content={SITE_META.seo.OGImage}/>
            <meta property="og:url" key="og_url" content={SITE_META.seo.OGURL}/>
            <meta property="og:title" key="og_title" content={mainTitle}/>
            <meta property="og:site_name" key="og_site_name" content={"bhnmzm.com"}/>
            <meta property="og:description" key="og_description" content={description || SITE_META.seo.description}/>
            <meta property="og:image" key="og_image" content={ogImage || SITE_META.seo.OGImage}/>

            <title key="title">{mainTitle}</title>

            {children}
        </Head>
    )
}

SEO.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
}

export default SEO
