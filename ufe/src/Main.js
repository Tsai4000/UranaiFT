import React, { useState } from 'react';
import hiki from './images/hiki.png'
import Result from './component/result'
import  './css/main.css'

const style = {
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
}

const Main = () => {
  const [result, setResult] = useState(null)/*{
    fate: 'f',
    overview: 'o',
    wish: 'w',
    pp: 'sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss'
  })*/
  // const path = window.location.href
  const hiku = () => {
    fetch('/api/test')
    .then((err, res) => {
      if(err) throw(err)
      setResult(res)
    })
    .catch(err => console.log(err))
  } 
  return (
    <div style={style}>
      {!result ? <img src={hiki} onClick={hiku} alt='hiki'/> : <Result result={result}/>}
    </div>
  )
}

export default Main;