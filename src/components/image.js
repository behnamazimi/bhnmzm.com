import React, {useEffect} from "react";
import cx from "classnames";
import {useState, useRef} from "react";
import {motion} from "framer-motion";

export default function Image({src, alt, caption, imgProps = {}, ...rest}) {
    const [isOpen, setOpen] = useState(false);
    const [imageLoadError, setImageLoadError] = useState(false);

    const imageRef = useRef();
    const figureRef = useRef();
    const figCaptionRef = useRef();

    useEffect(() => {
        window.addEventListener("resize", onImageLoad);

        return () => window.removeEventListener("resize", onImageLoad);
    }, []);

    useEffect(() => {
        const handler = () => isOpen && setOpen(false);
        if (isOpen) {
            document.addEventListener("scroll", handler);
        } else {
            document.addEventListener("scroll", handler)
        }

    }, [isOpen]);

    const onImageLoad = () => {
        let minHeight = imageRef.current.offsetHeight;
        if (figCaptionRef && figCaptionRef.current)
            minHeight += figCaptionRef.current.offsetHeight;

        figureRef.current.style.minHeight = minHeight + "px";
    };

    const onImageLoadError = () => setImageLoadError(true);

    return (
        <figure className={cx("article-img", isOpen && "--open")}
                ref={figureRef} {...rest}>
            <motion.div
                animate={{opacity: isOpen ? 1 : 0}}
                className="article-img__bg"
            />

            {!imageLoadError &&
            <div className="article-img__container"
                 onClick={() => setOpen(!isOpen)}>
                <motion.img
                    src={src}
                    alt={alt}
                    ref={imageRef}
                    onClick={() => setOpen(!isOpen)}
                    layoutTransition
                    onLoad={onImageLoad}
                    onError={onImageLoadError}
                    loading="lazy"
                    {...imgProps}
                />
            </div>}

            {imageLoadError &&
            <p className="article-img__error">Can not load image; <pre>{src}</pre></p>}

            {caption &&
            <figcaption ref={figCaptionRef}>{caption}</figcaption>}
        </figure>
    );
}