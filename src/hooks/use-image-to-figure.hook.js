import {useEffect, useRef} from "react";

export const useImageToFigure = (withZoom = false) => {
    useEffect(() => {

        const figures = document.querySelectorAll(".page .content figure");
        figures.forEach(figure => {
            const image = figure.querySelector("img");
            const imgContainer = document.createElement("div");
            const figCaption = figure.querySelector("figcaption");
            const figureBg = document.createElement("div");

            figure.classList.add("article-img");
            if (!withZoom)
                figure.classList.add("nz");

            function figureClickHandler(e) {
                const targetFigure = e.target.closest("figure");
                targetFigure.classList.toggle("--open");

                targetFigure.style.height = image.height + "px"
                if (image.height > window.innerHeight * 0.9) {
                    image.style.maxHeight = "100%";
                    image.style.width = "auto";
                }

                function closeImageHandler() {
                    targetFigure.classList.remove("--open");
                    targetFigure.style.height = "auto"
                    window.removeEventListener("scroll", closeImageHandler)
                }

                window.addEventListener("scroll", closeImageHandler)
            }

            if (withZoom)
                figure.addEventListener("click", figureClickHandler);

            imgContainer.classList.add("article-img__container");

            image.onload = function () {
                let minHeight = image.offsetHeight;
                if (figCaption)
                    minHeight += figCaption.offsetHeight + 4; // + 4 for figcaption padding-top

                figure.style.minHeight = minHeight + "px";
            };
            image.onerror = function () {
                const errorMsg = document.createElement("p");
                errorMsg.classList.add("article-img__error");
                errorMsg.innerHTML = `<span>Can not load image;</span><pre>${image.src}</pre>`;
                image.style.display = "none";
                figure.insertBefore(errorMsg, figure.lastChild)
            };

            imgContainer.appendChild(image);

            figure.insertBefore(imgContainer, figure.firstChild);

            figureBg.classList.add("article-img__bg");
            figure.prepend(figureBg);
        })

    }, []);
};
