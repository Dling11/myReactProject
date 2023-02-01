import React from "react"
const Footer = ( {length} ) => {
    return (
        <div className="footerPart">
            <p>{length} List {length === 1? "item" : "items"} </p>
        </div>
    )
}

export default Footer