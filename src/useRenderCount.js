import React from 'react'

const style = {
  color: '#000',
  backgroundColor: '#ccc',
  borderRadius: 4,
  padding: '0.1rem 0.3rem',
  fontSize: '0.8rem',
  margin: '0.2rem',
  display: 'inline-block',
  fontFamily: 'monospace',
  fontWeight: 'bold'
}

export default function useRenderCounter() {
  const ref = React.useRef(1)

  return ( <span style={style}> {ref.current++} </span> )
}