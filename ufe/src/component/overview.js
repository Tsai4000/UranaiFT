import React from 'react'


const style = {
    marginBottom: "15",
    padding: "20 12",
    border: "1px solid #cc0000"
}
const OverView = (props) => {
    const fate = require(`../images/${props.fate}`)
    
    return (
        <div style={style}>
            <img src={fate} alt={'fate'}></img>
            <div>{props.content}</div>
        </div>
    )
}

export default OverView