import React, { useState } from 'react';
import hiki from './images/hiki.png'
import  './css/main.css'

const style = {
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
}

const Main = () => {
  const [result, setResult] = useState(null)
  const path = window.location.href
  const hiku = () => {
    fetch(path+'hiku')
    .then((err, res) => {
      if(err) throw(err)
      setResult(res)
    })
    .catch(err => console.log(err))
  } 
  return (
    <div style={style}>
      {!result ? <img src={hiki} onClick={hiku} alt='hiki'/> : result}
    </div>
  )
}

export default Main;