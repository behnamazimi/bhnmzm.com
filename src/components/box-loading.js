import React from "react"

function BoxLoading({active, ...rest}) {

    if (!active) return null;

    return (
        <div className="loading-container" {...rest}>
            <div className="box-loading">
                <div className="box"/>
                <div className="box"/>
                <div className="box"/>
                <div className="box"/>
                <div className="box"/>
            </div>
        </div>
    )
}

export default BoxLoading
