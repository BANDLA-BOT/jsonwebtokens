// import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import Signup from "./Signup"
import Login from "./Login"
import Home from './Home'
const App = () => {
  // const [] = useState()
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/dashboard" element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App