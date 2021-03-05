import React from 'react';
import Detail from './detail'
import Overview from './overview'
import background from '../images/background.png'

const base = {
    maxWidth: "400px",
    width: "100%",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: 'start',
    alignItems: 'center',
    backgroundPosition: "center",
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: `430px 100%`,
    padding: "15px"
}
const detailContainerStyle = {
    width: "100%",
    maxWidth: "400px",
    flexDirection: "raw",
    justifyContent: "flex-start",
    alignItems: "flex-start"
}

const Result = (props) => {
    const result = props.result

    return (
        <div style={base}>
            <Overview fortune={result.fortune} content={result.overview} />
            <div style={detailContainerStyle}>{Object.keys(result).map((key, value) => {
                    return (key !== 'overview' && key !== 'fortune') ? (<Detail title={key} content={result[key]}/>) : null
                })}
            </div>
        </div>
    )
}

export default Result