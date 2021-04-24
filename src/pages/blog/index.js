import React, {useState} from "react"
import Page from "../../layout/page-layout"
import BlogItem from "../../components/blog-item"
import Masonry from "react-masonry-css"
import BlogSearch from "../../components/blog-search"
import Error404 from "../404";
import {getAllPosts, getPageDetails} from "../../utils/content-handler";

function BlogPage({posts = [], page = {}, error}) {

    const [blogPosts, setBlogPosts] = useState(posts)

    if (error && !page.title)
        return <Error404/>

    function onSearch(trend) {
        setBlogPosts(posts.filter(post => ~(post.title || '').toLowerCase().indexOf(trend.toLowerCase())))
    }

    return (
        <Page className={"blog-page"} title={page.title}>
            <div className="container">
                <section className="page__content">
                    <h1 className="page__title">{page.title}</h1>
                    <p className="page__subtitle">{page.description}</p>

                    <BlogSearch onChange={onSearch}/>

                    {blogPosts && blogPosts.length > 0 &&
                    <Masonry
                        breakpointCols={{
                            default: 2,
                            600: 1,
                        }}
                        className="blog-items"
                        columnClassName="blog-items__column">

                        {blogPosts.map((post, key) => <BlogItem key={key} index={key} post={post}/>)}
                    </Masonry>}

                    {(!blogPosts || !blogPosts.length) &&
                    <p className="blog-item__no-content">No items was found.</p>}

                </section>
            </div>
        </Page>
    )
}

export async function getStaticProps() {
    const posts = await getAllPosts(["title", "description", "key", "image", "created_at", "updated_at", "order"])
    const orderedPosts = posts.sort((a, b) => a.order > b.order ? -1 : 1)
    const page = await getPageDetails("blog")
    return {
        props: {
            page,
            posts: orderedPosts,
        },
    }
}


export default BlogPage
