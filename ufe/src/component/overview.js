import React from 'react'
import f from '../images/f.png'

const style = {
    marginBottom: "15",
    padding: "20 12",
    border: "1px solid #cc0000"
}

const OverView = (props) => {    
    return (
        <div style={style}>
            <img src={f} alt={'fate'}></img>
            <div>{props.content}</div>
        </div>
    )
}

export default OverView