import axios from "axios"
import { useState } from "react"
import { Link,useNavigate } from 'react-router-dom'

const Login = () => {
  const Navigate = useNavigate()
  const [ email, setEmail] = useState('')
  const [ password, setPassword] = useState('')

    async function submitHandler(e){
      e.preventDefault()
      const loginCredentials = {
        email:email,
        password:password
      }
      await axios.post("http://localhost:8000/",loginCredentials)
      .then((res)=>{
          console.log(res.data)
      })
      Navigate('/dashboard')

    }
  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
                <input type="text" placeholder="email"  value={email} onChange={(e)=>{setEmail(e.target.value)}}/> <br />
                <input type="text" placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/> <br />
                <input type="submit" value='Login'/>
        </form>
        <Link to={'/signup'}>Sign up</Link>
    </div>
  )
}

export default Login