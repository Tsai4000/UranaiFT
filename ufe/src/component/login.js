import React, { useState } from "react"

const loginStyle = {
  display: 'flex',
  flex: 1,
  flexFlow: 'column'
}

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    fetch(`${window.origin}/api/login`, {
      method: 'POST',
      body: JSON.stringify({
        name: username,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.status === 200 ? res.json() : null
    }).then(body => {
      console.log(body)
      localStorage.setItem('authToken', 'Bearer ' + body.token);
    }).catch(err => {
      console.log(err)
    })
  }


  return (
    <div style={loginStyle}>
      <div>Login</div>
      <input type='name' placeholder="name" onChange={(e) => { setUsername(e.target.value) }}></input>
      <input type='password' placeholder="password" onChange={(e) => { setPassword(e.target.value) }}></input>
      <button onClick={handleLogin}>login</button>
    </div>
  )
}

export default Login