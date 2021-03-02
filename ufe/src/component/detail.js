import React from 'react'

const detailStyle = {
    maxWidth: "467px",
    wordBreak: "break-all",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: "wrap",
    whiteSpace: "normal"
}

const Detail = (props) => {
    return (
        <div style={detailStyle}>
            <div>{`【${props.title}】`}</div>
            <div>{`${props.content}`}</div>
        </div>
    )
}

export default Detail