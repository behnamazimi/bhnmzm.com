import React from "react"
import Page from "../../layout/page-layout"
import Image from "../../components/image"
import {useImageToFigure} from "../../hooks/use-image-to-figure.hook"
import ArticleMeta from "../../components/article-meta"
import parseDate from "../../utils/parse-date";
import Author from "../../components/author";
import Error404 from "../404";
import {getAllPosts, getPostDetails} from "../../utils/content-handler";

function BlogPostPage({post = {}, error}) {
    useImageToFigure(true)

    if (error && !post.title)
        return <Error404/>

    return (
        <Page className={"blog-post-page"}
              title={post.title}
              desc={post.description}
              ogImage={post.image}>

            <div className="container">
                <section className="page__content">
                    <article className="full-article">
                        <header>
                            <h1 className="full-article__title">{post.title}</h1>
                            <div className="full-article__meta">
                                {post.created_at &&
                                <ArticleMeta label="Published:" value={parseDate(post.created_at)}/>}
                                {post.updated_at &&
                                <ArticleMeta label="Updated:" value={parseDate(post.updated_at)}/>}
                                {(post.author && post.author.name) &&
                                <ArticleMeta label="Author" value={post.author.name}/>}
                            </div>
                            {post.description &&
                            <p className="full-article__subtitle">{post.description}</p>}

                            {post.image &&
                            <Image src={post.image} alt={post.title} caption={post.title}/>}

                        </header>
                        <div className="content" dangerouslySetInnerHTML={{__html: post.html}}/>
                    </article>

                    {/*<div className="up-vote">*/}
                    {/*    <p>Was this helpful?</p>*/}
                    {/*    <div className="up-vote__actions">*/}
                    {/*        <button className="up-vote__no">No</button>*/}
                    {/*        <button className="up-vote__yes">Yes</button>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </section>

                {(post.author && post.author.name) &&
                <Author name={post.author.name}
                        avatar={post.author.avatar}
                        about={post.author.about}/>}
            </div>

        </Page>
    )
}

export async function getStaticProps({params}) {
    const post = await getPostDetails(params.post_key)

    return {
        props: {
            post
        },
    }
}

export async function getStaticPaths() {
    const allPosts = await getAllPosts(["key"])

    return {
        paths: allPosts.map((post) => ({
                params: {
                    post_key: post.key
                },
            }
        )),
        fallback: false,
    }
}

export default BlogPostPage
