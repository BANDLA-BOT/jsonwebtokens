import { useState } from "react"
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios';


const Signup = () => {
    const navigate = useNavigate()
  const [ username, setUsername] = useState('')
  const [ email, setEmail] = useState('')
  const [ password, setPassword] = useState('')
//   const [ user, setUser] = useStateChange
    async function submitHandler(e){
        e.preventDefault()
        const userDetails = {
            username:username,
            email:email,
            password:password,

        }
        await axios.post('http://localhost:8000/register',userDetails)
        .then((res)=>{
            console.log(res.data)
            navigate('/')
            })
        setEmail('');
        setUsername('')
        setPassword('')
    }
  return (
    <div>
        <h1>Sign up</h1>
        <form onSubmit={submitHandler}>

                <input type="text" placeholder="username"  value={username} onChange={(e)=>{setUsername(e.target.value)}}/> <br />
                <input type="text" placeholder="email"  value={email} onChange={(e)=>{setEmail(e.target.value)}}/> <br />
                <input type="text" placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/> <br />
                <input type="submit" value='Sign up'/>
        </form>
        <Link to={'/'}>Sign up</Link>
    </div>
  )
}

export default Signup