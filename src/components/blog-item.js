import React from "react"
import PropTypes from "prop-types"
import ArticleMeta from "./article-meta"
import Router from "next/router"
import Link from "next/link"
import {motion} from "framer-motion"
import parseDate from "../utils/parse-date";

function BlogItem({post, index}) {

    const handleClick = () => {
        Router.push("/blog/[post_key]", `/blog/${post.key}`)
    }

    return (
        <motion.div className="blog-item" onClick={handleClick}
                    transition={{delay: index * .2 + .1}}
                    animate={{y: [50, 0], scale: [.95, 1], opacity: [0, 1]}}>
            {post.image &&
            <figure className="blog-item__figure">
                <img src={post.image} alt={post.title} data-loading={"lazy"}/>
            </figure>}

            <Link href={"/blog/[post_key]"} as={`/blog/${post.key}`}>
                <a><h3 className="blog-item__title">{post.title}</h3></a>
            </Link>
            <p className="blog-item__content">{post.description}</p>
            {(post.created_at || post.updated_at) &&
            <div className="blog-item__meta">
                {post.created_at &&
                <ArticleMeta label="Published:" value={parseDate(post.created_at)}/>}
                {post.updated_at &&
                <ArticleMeta label="Updated:" value={parseDate(post.updated_at)}/>}
                {(post.author && post.author.name) &&
                <ArticleMeta label="Author" value={post.author.name}/>}
            </div>}
        </motion.div>
    )
}

BlogItem.propTypes = {
    post: PropTypes.object.isRequired,
}

export default BlogItem
