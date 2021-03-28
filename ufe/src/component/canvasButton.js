import React from 'react'
import { Canvas } from './canvas'

export const CanvasButton = () => {
  // const clearCanvas = Canvas({ width: '360', height: '360' }).clearCanvas()
  return <button onClick={Canvas({ width: '360', height: '360' }).clearCanvas()}>reset</button>
}
