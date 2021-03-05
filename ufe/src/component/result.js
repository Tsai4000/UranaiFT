import React from 'react';
import Detail from './detail'
import Overview from './overview'
import background from '../images/background.png'

const base = {
    maxWidth: "600px",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: 'start',
    alignItems: 'center',
    backgroundPosition: "center",
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    padding: "15px"
}
const detailStyle = {
    flexDirection: "raw",
    justifyContent: "flex-start",
    alignItems: "flex-start"
}

const Result = (props) => {
    const result = props.result

    return (
        <div style={base}>
            <Overview fate={result.fate} content={result.overview} />
            <div style={detailStyle}>{Object.keys(result).map((key, value) => {
                    if (key !== 'overview' && key !== 'fate') return (<Detail title={key} content={result[key]}/>)
                })}
            </div>
        </div>
    )
}

export default Result