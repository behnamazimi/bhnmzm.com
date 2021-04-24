import React from "react"
import Page from "../layout/page-layout"
import SITE_META from "../constants/site-meta.const";
import Socials from "../components/socials";
import {FiPhone, FiAtSign} from "react-icons/fi"
import {SiStackoverflow} from "react-icons/si"
import Error404 from "./404";
import {getPageDetails} from "../utils/content-handler";

function ContactMePage({page = {}, error}) {

    if (error && !page.title)
        return <Error404/>

    return (
        <Page className={"contact-page"} title="Contact Me">

            <div className="container">
                <section className="page__content">
                    <h1 className="page__title">{page.title}</h1>
                    <p className="page__subtitle">{page.description}</p>

                    <div className="contact-infos">
                        {page.phone &&
                        <div className="contact-infos__item">
                            <FiPhone className="--icon"/>
                            <a onClick={() => window.open(`tel:+${page.phone}`)}>{page.phone}</a>
                        </div>}
                        <div className="contact-infos__item">
                            <FiAtSign className="--icon"/>
                            <a onClick={() => window.open(`mailto:${SITE_META.socials.mail}`)}>
                                {SITE_META.socials.mail.replace("@", "[at]")}
                            </a>
                        </div>
                        <div className="contact-infos__item">
                            <SiStackoverflow className="--icon"/>
                            <a href={SITE_META.socials.stackoverflow}>Stack Overflow</a>
                        </div>
                    </div>

                    <div className="socials-wrapper">
                        {page.socialSectionTitle &&
                        <p>{page.socialSectionTitle}</p>}
                        <Socials/>
                    </div>

                </section>
            </div>

        </Page>
    )
}

export async function getStaticProps() {
    const page = await getPageDetails("contact-me")
    return {
        props: {
            page,
        },
    }
}

export default ContactMePage
