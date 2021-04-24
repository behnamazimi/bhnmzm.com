import React from "react"
import Page from "../layout/page-layout"
import Socials from "../components/socials"
import SITE_META from "../constants/site-meta.const"
import {motion} from "framer-motion"
import AbstractAnim from "../components/header/abstract-anim";

function HomePage() {

    const meAnimProps = {
        animate: {opacity: [0, 1], y: [50, 0]},
        transition: {delay: 0.5, type: "spring"},
    }

    return (
        <Page hideFooter className={"front-page"}>

            <motion.section className="me" {...meAnimProps}>
                <h1 className="name">{SITE_META.mainTitle}</h1>
                <p className="subject">{SITE_META.mainSubtitle}</p>

                <Socials/>
            </motion.section>
            <AbstractAnim/>
        </Page>
    )
}

export default HomePage
