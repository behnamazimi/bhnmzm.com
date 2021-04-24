import React from "react"
import {motion} from "framer-motion"
import Link from "next/link"
import {FiMinus} from "react-icons/fi"

const itemVariants = {
    open: {
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            y: {stiffness: 1000, velocity: -100},
        },
    },
    closed: {
        y: -50,
        x: 100,
        opacity: 0,
        transition: {
            type: "spring",
            y: {stiffness: 1000},
        },
    },
};

export const NavItem = ({item, onClick}) => {

    const handleOnClick = () => onClick && typeof onClick === "function" && onClick();

    return (
        <motion.li
            variants={itemVariants}
        >
            <Link href={item.path}>
                <motion.a href={item.path} onClick={handleOnClick}
                          whileHover={{x: 10}}
                          whileTap={{x: 10, scale: 0.95}}>
                    <span>{item.title}</span>
                    <span className="sub-title"><FiMinus/>{item.subTitle}</span>
                </motion.a>
            </Link>
        </motion.li>
    )
}

export default NavItem
