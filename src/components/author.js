import React from "react"

function Author({name, avatar, about}) {

    if (!name)
        return null

    return (
        <section className="author">
            <div className="author__title">
                <h3 className="author__name">{name}</h3>
                <span className="author__avatar">
                    <img src={avatar} alt={name}/>
                </span>
            </div>
            <div className="author__content">
                <p>{about}</p>
            </div>
        </section>
    )
}

export default Author
