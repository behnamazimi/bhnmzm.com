import React, {useEffect} from "react"
import PropTypes from "prop-types"
import cx from "classnames"
import Router from "next/router"
import CustomHead from "./head"
import SEO from "./seo"
import Header from "../components/header/header"
import Footer from "../components/footer"
import {motion} from "framer-motion"
import StatusContextProvider from "../contexts/status.context"
import BoxLoading from "../components/box-loading";
import pkg from "../../package.json";

import NProgress from "nprogress"

NProgress.configure({showSpinner: false});

Router.events.on("routeChangeStart", () => {
    NProgress.start()
    document.documentElement.classList.add("--loading")
})
Router.events.on("routeChangeComplete", () => {
    // scroll page to top on each route change
    window.scrollTo({top: 0, behavior: "smooth"})
    NProgress.done()
    document.documentElement.classList.remove("--loading")
})
Router.events.on("routeChangeError", () => {
    NProgress.done()
    document.documentElement.classList.remove("--loading")
})

const Page = ({title, desc, ogImage, className, children, hideFooter = false}) => {

    useEffect(() => {
        const handleVHUpdate = () => {
            document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`);
        }

        // init update
        handleVHUpdate()

        window.addEventListener("resize", handleVHUpdate)
        return () => window.removeEventListener("resize", handleVHUpdate)
    }, [])

    useEffect(() => {
        console.log(`%cv${pkg.version}`, "color:#039be5;");

        const removeLoading = () => document.documentElement.classList.remove("--loading");
        window.addEventListener("load", removeLoading)
        return () => window.removeEventListener("load", removeLoading)
    }, [])

    // override title and description metadata
    function overrideSEOMetadata() {
        if (!title && !desc)
            return

        return (
            <SEO title={title} description={desc} ogImage={ogImage}/>
        )
    }

    return (
        <StatusContextProvider>
            <CustomHead/>

            {overrideSEOMetadata()}

            <motion.div id="page" className={cx("page", className)}>

                <Header/>

                <main>{children}</main>

                {!hideFooter && <Footer/>}

                <div className="page-loading">
                    <BoxLoading active={true}/>
                </div>
            </motion.div>
        </StatusContextProvider>
    )
}

Page.propTypes = {
    hideFooter: PropTypes.bool,
    className: PropTypes.string,
}

export default Page
