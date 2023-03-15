import { setIn } from 'formik'
import {useState} from 'react'

const signin = () => {
  const initialInput = {email: '',password: ''}
  const [input, setInput] = useState(initialInput)
  const changeHandler = (e) => {
    setInput(prev => ({
      ...prev, 
      [e.target.name] : e.target.value
  }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // send request
    const res = await fetch('/api/auth/dashboard/signin',{
      method: 'POST',
      headers:{
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(input)
    })
    
    const data = await res.json()
    if(data.success){
    //empty form
    setInput(initialInput)
      console.log(data)
    }
    if(!data.success){
      console.log(data)
    }
  }

  return (
    <div>
        <form>
            <input onChange={changeHandler} type="email" placeholder='email' name='email' value={input.email}/>
            <input onChange={changeHandler} type="password" placeholder='password' name='password' value={input.password}/>
            <button onClick={handleSubmit} type='submit'>sign in</button>
        </form>
    </div>
  )
}

export default signin