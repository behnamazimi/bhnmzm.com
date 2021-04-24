import React, {useEffect} from "react"
import PropTypes from "prop-types"
import cx from "classnames"
import Router from "next/router"
import CustomHead from "./head"
import SEO from "./seo"
import NProgress from "nprogress"
import ManageHeader from "../components/manage/header";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import "../styles/manage.scss"
import pkg from "../../package.json";
import {Layout, Menu, Breadcrumb} from 'antd';

const {Header, Content, Footer} = Layout;

NProgress.configure({showSpinner: false});

Router.events.on("routeChangeStart", () => {
    NProgress.start()
    document.documentElement.classList.add("--loading")
})
Router.events.on("routeChangeComplete", () => {
    // scroll page to top on each route change
    window.scrollTo({top: 0, behavior: "smooth"})
    NProgress.done()
    document.documentElement.classList.remove("--loading")
})
Router.events.on("routeChangeError", () => {
    NProgress.done()
    document.documentElement.classList.remove("--loading")
})

const SecurePage = ({
                        title, desc, ogImage, className, children, isAuthed = false,
                        breadcrumb
                    }) => {

    useEffect(() => {
        console.log(`%cv${pkg.version}`, "color:#039be5;");

        const removeLoading = () => document.documentElement.classList.remove("--loading");
        window.addEventListener("load", removeLoading)
        return () => window.removeEventListener("load", removeLoading)
    }, [])

    function renderBreadCrumb() {
        if (!breadcrumb || typeof breadcrumb !== "string") return null;

        const items = breadcrumb.split(".")
            .map((item, key) => (
                <Breadcrumb.Item key={key}>{item}</Breadcrumb.Item>
            ))

        return (
            <Breadcrumb style={{margin: '0 0 16px 0'}}>{items}</Breadcrumb>
        )
    }

    // override title and description metadata
    function overrideSEOMetadata() {
        if (!title && !desc)
            return

        return (
            <SEO title={title} description={desc} ogImage={ogImage}/>
        )
    }

    return (
        <>
            <CustomHead/>
            {overrideSEOMetadata()}

            <Layout className="manage-layout">

                {isAuthed &&
                <ManageHeader/>}

                <Content style={{padding: '0 16px', marginTop: 58}}>

                    {isAuthed && renderBreadCrumb()}

                    <div className={cx("page-content", className)}>
                        {children}
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>©2020 - bhnmzm.com Manage </Footer>
            </Layout>
        </>
    )
}

SecurePage.propTypes = {
    hideFooter: PropTypes.bool,
    className: PropTypes.string,
}

export default SecurePage
