import { useState } from 'react'
import Header from './Header'
import MainSection from './MainSection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
    <MainSection/>
    </>
  )
}

export default App
