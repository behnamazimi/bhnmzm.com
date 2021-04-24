import React from "react"
import Socials from "./socials";
import SITE_META from "../constants/site-meta.const";

function Footer() {

    return (
        <footer className="main-footer">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <p className="copyright">
                            {SITE_META.copyright}
                        </p>
                    </div>
                    <div className="col-xs-12 col-sm-6 code-friends">
                        <div className="love">with <span>❤</span> and respects</div>
                        <a href="https://nextjs.org">NextJs</a>,
                        <a href="https://vercel.com/">Vercel</a>
                    </div>
                    <div className="col-xs-12">
                        <Socials/>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
