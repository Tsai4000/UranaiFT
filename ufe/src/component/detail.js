import React from 'react'

const Detail = (props) => {
    
    return (
        <div>
            <div>{`【${props.title}】`}</div>
            <div>{`${props.content}`}</div>
        </div>
    )
}

export default Detail