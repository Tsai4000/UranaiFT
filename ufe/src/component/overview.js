import React from 'react'
import Images from '../images/imageHandle'

const style = {
    maxWidth: "400px",
    marginBottom: "15",
    padding: "20 12",
    border: "1px solid #cc0000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexFlow: "column"
}

const contentStyle = {
    maxWidth: "400px",
    wordBreak: "break-all",
    whiteSpace: "normal",
    margin: "10px"
}

const OverView = (props) => {   
    return (
        <div style={style}>
            <img src={Images[props.fortune]} alt=""></img>
            <div style={contentStyle}>{props.content}</div>
        </div>
    )
}

export default OverView