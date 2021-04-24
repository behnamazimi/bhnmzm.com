import React from "react";
import PropTypes from "prop-types";

function Pagination(props) {

    return (
        <div className="pagination">
            <ul>
                <li><span className="pagination__current">1</span></li>
                <li><a className="pagination__link" href="/">2</a></li>
                <li><a className="pagination__link" href="/">3</a></li>
                <li><a className="pagination__link" href="/">4</a></li>
                <li><span className="pagination__dots">...</span></li>
                <li><a className="pagination__link" href="/">10</a></li>
                <li><a className="pagination__link" href="/">11</a></li>
                <li><a className="pagination__link" href="/">12</a></li>
            </ul>
        </div>
    )
}

Pagination.propTypes = {
    data: PropTypes.object.isRequired,
};

export default Pagination
