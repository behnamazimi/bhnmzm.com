import React from "react"
import NAV_ITEMS from "../../constants/nav-items.const"
import {motion} from "framer-motion"
import NavItem from "./nav-item"
import useStatusContext from "../../hooks/use-status-context";
import AbstractAnim from "./abstract-anim";

const variants = {
    open: {
        scale: 1,
        transition: {
            staggerChildren: 0.07, delayChildren: 0.4,
        },
    },
    closed: {
        scale: 0,
        transformOrigin: "top center",
        transition: {
            staggerChildren: 0.01, staggerDirection: -1,
        },
    },
};

function Navigation() {
    const status = useStatusContext();

    return (
        <motion.ul variants={variants}>
            {NAV_ITEMS.map(item => (
                <NavItem key={item.key} item={item} onClick={() => status.toggleMenu(false)}/>
            ))}
        </motion.ul>
    )
}

export default Navigation
