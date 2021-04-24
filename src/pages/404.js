import React from "react"
import Link from "next/link"
import Page from "../layout/page-layout"

function Error404() {

    return (
        <Page title={"Error 404"} className="error-page">
            <div className="container">

                <svg x="0px" y="0px" className="sad-face" viewBox="0 0 106.1 106.1">
                    <path id="sad-face-eyes" d="M28,7.7c5.8,0,10.5,4.7,10.5,10.5S33.8,28.7,28,28.7S17.5,24,17.5,18.2S22.2,7.7,28,7.7z M75.5,7.7
	c5.8,0,10.5,4.7,10.5,10.5s-4.7,10.5-10.5,10.5S65,24,65,18.2S69.7,7.7,75.5,7.7z"/>
                    <path d="M88.4,87.1c0.5,2.8-1.4,5.4-4.2,5.8c-2.8,0.5-5.4-1.4-5.8-4.2c-2-12.1-11.4-22-24-25.2c-12.9-3.2-25.9,1-33.2,10.8
	c-1.3,1.7-3.4,2.4-5.3,1.9c-0.6-0.2-1.2-0.4-1.8-0.9c-2.2-1.7-2.7-4.8-1-7.1c9.8-13.1,27-18.8,43.8-14.6
	C73.4,57.8,85.8,70.9,88.4,87.1z"/>

                </svg>
                <div className="message">
                    <h4>ERROR 404;</h4>
                    <p>Sorry, the page that you are looking for is not exists or deleted.</p>
                </div>
                <Link href={"/"}>
                    <a>Go to Home</a>
                </Link>
            </div>
        </Page>
    )
}

export default Error404
