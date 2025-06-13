import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <h1>Project Earth Health</h1>
    </>
  )
}

export default App

