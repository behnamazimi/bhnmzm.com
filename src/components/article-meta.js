import React from "react";
import PropTypes from "prop-types";
import {motion} from "framer-motion";

function ArticleMeta({as = "div", label, value, ...props}) {

    const Tag = motion[as];

    let animProps = {};

    if (as === "a")
        animProps = {
            transition: {type: "spring"},
            whileHover: {y: -2, boxShadow: "rgba(0, 0, 0, .4) 0px 4px 6px -5px"}
        };

    return (
        <Tag className="article_meta__item" {...props} {...animProps}>
            <span className="article_meta__item__label">{label}</span>
            <span className="article_meta__item__value">{value}</span>
        </Tag>
    )
}

ArticleMeta.propTypes = {
    as: PropTypes.string,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
};

export default ArticleMeta
