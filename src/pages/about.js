import React from "react"
import Page from "../layout/page-layout"
import {getPageDetails} from "../utils/content-handler";

function AboutPage({page = {}, error}) {
    return (
        <Page className={"about-page"} title="About Me">

            <div className="container">
                <section className="page__content">
                    <h1 className="page__title">{page.title}</h1>
                    <p className="page__subtitle">{page.description}</p>

                    <div className="page__content">
                        <img src={"/images/my-avatar.jpg"} className="about-page__avatar" alt="Behnam Azimi"/>
                        <div dangerouslySetInnerHTML={{__html: page.html}}/>
                    </div>
                </section>

            </div>

        </Page>
    )
}

export async function getStaticProps() {
    const page = await getPageDetails("about")
    return {
        props: {
            page,
        },
    }
}

export default AboutPage
