import React, {useRef} from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import useStatusContext from "../../hooks/use-status-context";

function AbstractAnim({className}) {

    const status = useStatusContext();
    const absAnimRef = useRef(null);

    const onBox3dClick = () => {
        if (!absAnimRef.current)
            return;

        if (absAnimRef.current.classList.contains("--upside")) {
            absAnimRef.current.classList.remove("--upside")
        } else {
            absAnimRef.current.classList.add("--upside");

            clearInterval(absAnimRef.current.TOFLAG)
            absAnimRef.current.TOFLAG = setTimeout(() => {
                absAnimRef.current.classList.remove("--upside")
            }, 5000)
        }
    }

    return (
        <div className={cx("abstract-anim", className, status.menuVisibility && "--upside --menu")}
             ref={absAnimRef}>
            <div className="box-3d" onClick={onBox3dClick}>
                <svg viewBox="0 0 328.7 328.7">
                    <path id="square-path" d="M277.6,149.6l-98.5-98.5c-8.1-8.1-21.5-8.1-29.6,0l-98.5,98.5c-8.1,8.1-8.1,21.5,0,29.6l98.5,98.5
	c8.1,8.1,21.5,8.1,29.6,0l98.5-98.5C285.8,171,285.8,157.7,277.6,149.6z"/>
                    <path id="line-path" d="M311,146.7l-129-129c-9.7-9.7-25.6-9.7-35.4,0l-129,129c-9.7,9.7-9.7,25.6,0,35.4l129,129
	c9.7,9.7,25.6,9.7,35.4,0l129-129C320.8,172.3,320.8,156.4,311,146.7z"/>
                </svg>
                <span className="shadow"/>
            </div>
            <div className="lines">
                <svg viewBox="0 0 427.5 180.2">
                    <path d="M0,178.5c0,0,243.6-4.6,427.5-166.8"/>
                    <path d="M0,176.2c0,0,226.2-8.2,401.6-176.2"/>
                    <path d="M0,180.2c0,0,222.6,6.2,427.5-128.4"/>
                    <path d="M0,173.9c0,0,189.2-8.4,354.1-173.9"/>
                </svg>
            </div>
        </div>
    )
}

AbstractAnim.propTypes = {};

export default AbstractAnim
