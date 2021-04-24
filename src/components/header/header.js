import React from "react"
import cx from "classnames"
import MenuToggleBtn from "./menu-toggle-btn"
import useStatusContext from "../../hooks/use-status-context"
import {motion} from "framer-motion"
import {useDimensions} from "../../hooks/use-dimensions.hook"
import Navigation from "./navigation"

const backgroundVariants = {
    open: {
        opacity: 1,
        y: 0,
        left: 0,
        borderRadius: 0,
        height: "calc(var(--vh, 1vh) * 100)",
        width: "100vw",
        transition: {
            type: "spring",
            mass: .7,
            damping: 15,
        },
    },
    closed: {
        opacity: .15,
        y: 7,
        left: "calc(50% - 30px)",
        borderRadius: "50%",
        height: "60px",
        width: "60px",
        transition: {
            type: "spring",
            damping: 11,
        },
    },
};

const navVariants = {
    open: {
        pointerEvents: "auto",
        transition: {staggerChildren: 0.07, delayChildren: 0.2},
    },
    closed: {
        pointerEvents: "none",
        transition: {staggerChildren: 0.05, staggerDirection: -1},
    },
};


function Header() {
    const {menuVisibility} = useStatusContext();
    const containerRef = React.useRef(null);
    const {height} = useDimensions(containerRef);

    return (
        <header className="main-header">

            <MenuToggleBtn/>

            <motion.nav
                className="main-header__nav"
                initial={false}
                animate={menuVisibility ? "open" : "closed"}
                custom={height}
                variants={navVariants}
                ref={containerRef}
            >
                <motion.div className="main-header__nav__bg" variants={backgroundVariants}/>
                <Navigation/>
            </motion.nav>

        </header>
    )
}

export default Header
