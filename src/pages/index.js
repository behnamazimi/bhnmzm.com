import React from "react"
import Page from "../layout/page-layout"
import Socials from "../components/socials"
import SITE_META from "../constants/site-meta.const"
import AbstractAnim from "../components/header/abstract-anim";

function HomePage() {
  return (
    <Page hideFooter className={"front-page"}>

      <div className="me">
        <h1 className="name">{SITE_META.mainTitle}</h1>
        <p className="subject">{SITE_META.mainSubtitle}</p>

        <Socials/>
      </div>
      <AbstractAnim/>
    </Page>
  )
}

export default HomePage
