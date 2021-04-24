import React from "react"
import {FiGithub, FiTwitter, FiLinkedin} from "react-icons/fi"
import SITE_META from "../constants/site-meta.const"
import {motion} from "framer-motion"

function Socials() {

    const animeProps = {
        whileHover: {scale: 1.1, color: "#039be5"},
        transition: {type: "spring"},
    }

    return (
        <div className="socials">
            <motion.a {...animeProps} target="_blank" href={SITE_META.socials.twitter}>
                <FiTwitter/>
            </motion.a>
            <motion.a {...animeProps} target="_blank" href={SITE_META.socials.linkedin}>
                <FiLinkedin/>
            </motion.a>
            <motion.a {...animeProps} target="_blank" href={SITE_META.socials.github}>
                <FiGithub/>
            </motion.a>
        </div>
    )
}

export default Socials
