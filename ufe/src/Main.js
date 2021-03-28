import React, { useEffect, useState } from 'react';
import hiki from './images/hiki.png'
import Result from './component/result'
import './css/main.css'
import { Canvas } from './component/canvas'
import { useSelector, useDispatch } from 'react-redux';

const style = {
  display: 'flex',
  flex: 1,
  flexFlow: 'column',
  justifyContent: 'start',
  alignItems: 'center'
}

const Main = () => {
  const [result, setResult] = useState(null)
  const mikujiResult = useSelector(state => state.mikuji);
  const dispatch = useDispatch();

  useEffect(() => {
    setResult(mikujiResult)
  }, [mikujiResult])

  const hiku = () => {
    fetch('/api/mikuji')
      .then(res => res.json())
      .then(data => dispatch({
        type: "MIKUJI_STORE",
        payload: data
      }))
      .catch(err => console.log(err))
  }
  return (
    <div style={style}>
      {!result
        ? <>
          <img src={hiki} onClick={hiku} alt='hiki' />
          <Canvas width='300' height='300' api='mikuji' />
        </>
        : <Result result={result} />}
      {/* <Canvas width='300' height='300' api='mikuji' /> */}
    </div>
  )
}

export default Main;