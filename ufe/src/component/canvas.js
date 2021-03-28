import React, { useRef, useState, useEffect } from "react"
import { useDispatch } from 'react-redux';


const Canvas = ({ width: w, height: h, api: api }) => {
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = w * 2
    canvas.height = h * 2
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`

    const context = canvas.getContext("2d")
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.scale(2, 2)
    context.lineCap = "round"
    context.strokeStyle = "white"
    context.lineWidth = 5
    contextRef.current = context
  }, [])


  const handleCanvasUpload = async () => {
    const arrayBuffer = await getCanvasURL();
    // console.log('arrayBuffer', arrayBuffer);

    const response = await uploadFile(arrayBuffer);
    // console.log('response', response);
  }

  const getCanvasURL = () => {
    // console.log(canvasRef.current.toDataURL("image/png"))
    return canvasRef.current.toDataURL("image/png")
  }

  const uploadFile = (arrayBuffer) => {
    fetch(`${window.origin}/api/${api}`, {
      method: 'POST',
      body: JSON.stringify({
        format: 'png',
        imgData: arrayBuffer,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.status === 200 ? res.json() : null)
      .then(response => {
        dispatch({
          type: "MIKUJI_STORE",
          payload: response
        })
      })
  }
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const finishDrawing = () => {
    contextRef.current.closePath()
    setIsDrawing(false)
  }

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return
    }
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    context.fillStyle = "black"
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  return (<div>
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
    />
    <button onClick={clearCanvas}>reset</button>
    <button onClick={handleCanvasUpload}>{`POST ${api}`}</button>
  </div>

  )
}
export { Canvas }