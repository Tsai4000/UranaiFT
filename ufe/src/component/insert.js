import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

const insertStyle = {
  display: 'flex',
  flex: 1,
  flexFlow: 'column'
}
// const sample = {
//   fortune: "Big",
//   overview: "ss",
//   wish: "String",
//   wait: "String",
//   lost: "String",
//   travel: "String",
//   bussiness: "String",
//   knowedge: "String",
//   arguement: "String",
//   love: "String",
//   fate: "String",
//   house: "String",
//   sick: "String",
// }

const Insert = (props) => {
  const [fortune, setFortune] = useState()
  const [overview, setOverview] = useState()
  const [wish, setWish] = useState()
  const [wait, setWait] = useState()
  const [lost, setLost] = useState()
  const [travel, setTravel] = useState()
  const [bussiness, setBussiness] = useState()
  const [knowedge, setKnowedge] = useState()
  const [arguement, setArgument] = useState()
  const [love, setLove] = useState()
  const [fate, setFate] = useState()
  const [house, setHouse] = useState()
  const [sick, setSick] = useState()
  const dispatch = useDispatch()

  const handleInsert = () => {
    fetch('/api/insert', {
      method: 'POST',
      body: JSON.stringify({
        mikuji: {
          fortune: fortune,
          overview: overview,
          wish: wish,
          wait: wait,
          lost: lost,
          travel: travel,
          bussiness: bussiness,
          knowedge: knowedge,
          arguement: arguement,
          love: love,
          fate: fate,
          house: house,
          sick: sick,
        }
      }),
      headers: {
        'Authorization': localStorage.authToken || null,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.status === 200 ? res.json() : null)
      .then(data => dispatch({
        type: "MIKUJI_STORE",
        payload: data
      }))
      .catch(err => console.log(err))
  }


  return (
    <div style={insertStyle}>
      <div>Insert one mikuji</div>
      <input type='text' placeholder="fortune" onChange={(e) => { setFortune(e.target.value) }}></input>
      <input type='text' placeholder="overview" onChange={(e) => { setOverview(e.target.value) }}></input>
      <input type='text' placeholder="wish" onChange={(e) => { setWish(e.target.value) }}></input>
      <input type='text' placeholder="wait" onChange={(e) => { setWait(e.target.value) }}></input>
      <input type='text' placeholder="lost" onChange={(e) => { setLost(e.target.value) }}></input>
      <input type='text' placeholder="travel" onChange={(e) => { setTravel(e.target.value) }}></input>
      <input type='text' placeholder="bussiness" onChange={(e) => { setBussiness(e.target.value) }}></input>
      <input type='text' placeholder="knowedge" onChange={(e) => { setKnowedge(e.target.value) }}></input>
      <input type='text' placeholder="arguement" onChange={(e) => { setArgument(e.target.value) }}></input>
      <input type='text' placeholder="love" onChange={(e) => { setLove(e.target.value) }}></input>
      <input type='text' placeholder="fate" onChange={(e) => { setFate(e.target.value) }}></input>
      <input type='text' placeholder="house" onChange={(e) => { setHouse(e.target.value) }}></input>
      <input type='text' placeholder="sick" onChange={(e) => { setSick(e.target.value) }}></input>
      <button onClick={handleInsert}>Insert</button>
    </div>
  )
}

export default Insert