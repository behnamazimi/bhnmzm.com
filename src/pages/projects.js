import React from "react"
import Page from "../layout/page-layout"
import {motion} from "framer-motion";
import {FiGitCommit, FiGithub, FiEye, FiLogIn} from "react-icons/fi"
import Error404 from "./404";
import {getContent, getPageDetails} from "../utils/content-handler";

const item = {
    hidden: {y: 40, opacity: 0},
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            mass: .7,
            damping: 15,
        },
    }
}

function ProjectItem({project = {}}) {

    return (
        <motion.div variants={item} className="project-item">
            <div className="header">
                <FiGitCommit className="header__icon"/>
                <div className="header__details">
                    <h2 className="title">{project.title}</h2>
                    <strong className="date">{project.date}</strong>
                </div>
            </div>
            <p className="desc">{project.description}</p>
            <div className="links">
                {project.github_link &&
                <div className="links__item">
                    <FiGithub/>
                    <a href={project.github_link} target="_blank" className="link">Github</a>
                </div>}
                {project.link &&
                <div className="links__item">
                    <FiLogIn/>
                    <a href={project.link} target="_blank" className="link">Open Project</a>
                </div>}
                {project.demo_link &&
                <div className="links__item">
                    <FiEye/>
                    <a href={project.demo_link} target="_blank" className="link">Demo</a>
                </div>}
            </div>
        </motion.div>
    )
}

const container = {
    hidden: {opacity: 1, y: 200},
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.2
        }
    }
}

function ProjectsPage({page = {}, projects = [], error}) {

    const contentAnimProps = {
        animate: {opacity: [0, 1], y: [50, 0]},
        transition: {delay: 0, type: "spring"},
    }

    if (error && !page.title)
        return <Error404/>

    return (
        <Page className="projects-page" title="Projects">

            <div className="container">
                <section className="page__content">
                    <h1 className="page__title">{page.title}</h1>
                    <p className="page__subtitle">{page.description}</p>

                    <motion.div className="page__content" {...contentAnimProps}
                                dangerouslySetInnerHTML={{__html: page.content}}>
                    </motion.div>

                    {projects && projects.length > 0 &&
                    <motion.div variants={container} initial="hidden"
                                animate="visible" className="projects-wrapper">
                        {projects.map((p, k) => (
                            <ProjectItem project={p} key={k}/>
                        ))}
                    </motion.div>}

                </section>
            </div>
        </Page>
    )
}

export async function getStaticProps({params}) {
    const page = await getPageDetails("projects")
    const projects = await getContent("projects.json", "pages")

    return {
        props: {
            page,
            projects
        },
    }
}

export default ProjectsPage
