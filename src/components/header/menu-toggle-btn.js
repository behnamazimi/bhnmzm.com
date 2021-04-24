import React from "react"
import cx from "classnames"
import useStatusContext from "../../hooks/use-status-context"

function MenuToggleBtn() {
    const status = useStatusContext();

    return (
        <button className={cx("main-header__nav-toggle-btn", status.menuVisibility && "--active")}
                onClick={() => status.toggleMenu()}>
            <svg width="44" height="33" viewBox="0 0 44 33">
                <g id="open-mode">
                    <g>
                        <circle id="circle-1" cx="39.5" cy="4.5" r="3.5"/>
                        <line id="line-1" x1="31.5" y1="4.5" x2="1.5" y2="4.5"/>
                    </g>
                    <g>
                        <circle id="circle-2" cx="4.5" cy="16.5" r="3.5"/>
                        <line id="line-2" x1="42.5" y1="16.5" x2="12.5" y2="16.5"/>
                    </g>
                    <g>
                        <circle id="circle-3" cx="39.5" cy="28.5" r="3.5"/>
                        <line id="line-3" x1="31.5" y1="28.5" x2="1.5" y2="28.5"/>
                    </g>
                </g>
                <g id="close-mode">
                    <line x1="29" y1="9.5" x2="15" y2="23.5"/>
                    <line x1="29" y1="23.5" x2="15" y2="9.5"/>
                    <circle cx="22" cy="16.5" r="15.2"/>
                </g>
            </svg>
        </button>
    )
}

export default MenuToggleBtn
