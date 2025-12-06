import { useState } from 'react'
import Approuter from "../src/routees/approuter"
import '../src/index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Approuter/>
    </>
  )
}

export default App
