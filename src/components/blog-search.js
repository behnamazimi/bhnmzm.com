import React from "react"
import PropTypes from "prop-types"
import { FiX, FiLoader } from "react-icons/fi"
import { motion } from "framer-motion"
import useDebounce from "../hooks/use-debounce.hook"

function BlogSearch({ onChange, value = null, loading = false }) {

   const [trend, setTrend] = React.useState(value)
   const inputRef = React.useRef(null)

   const handleSearch = () =>
      trend !== null && trend !== value
      && onChange && typeof onChange === "function"
      && onChange(trend)

   useDebounce(trend, handleSearch, 300)

   const onReset = () => {
      inputRef.current.focus()
      setTrend("")
   }

   return (
      <div className="blog-search">
         <input className="blog-search__input" type="search"
                ref={inputRef} value={trend || ""}
                onChange={(e) => setTrend(e.target.value)}
                placeholder="Search in articles..."/>
         {!loading &&
         <motion.span className="blog-search__reset"
                      onClick={onReset}
                      animate={{ opacity: trend ? 1 : 0, x: trend ? 0 : 5 }}
                      whileHover={{ scale: [1, 1.05], x: -2 }}>
            <FiX size={24} color="#999"/>
         </motion.span>}

         {loading &&
         <motion.span className="blog-search__loading"
                      animate={{ rotate: "360deg" }}
                      transition={{
                         duration: 1,
                         loop: Infinity,
                         ease: "linear",
                      }}>
            <FiLoader size={24} color="#999"/>
         </motion.span>}
      </div>
   )
}

BlogSearch.propTypes = {
   onChange: PropTypes.func,
   value: PropTypes.string,
}

export default BlogSearch
