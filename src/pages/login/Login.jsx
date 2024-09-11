import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [email, setEmail] = useState('nwaforglory6@gmail.com')
  const [password, setPassword] = useState('Password#123')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function login (){
    setLoading(true)
    const res = await fetch('https://tracabe.onrender.com/login',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({ email, password })
    })
    const data = await res.json()
    if(res) setLoading(false)
    if(!res.ok){
      alert(data.message)
      return
    }
    if(res.ok){
      localStorage.setItem('admin', JSON.stringify(data))
      navigate('/dashboard')
      location.reload()
    }
    console.log(res, data);
  }

  return (
    <div>
        <div className='flex flex-col items-center justify-center h-[100vh] w-[30%] mx-auto'>
        <p className='font-[600] mb-5 text-[20px]'>Thaka Admin Login</p>
        <div className='w-full'>
            <div>
              <label className='block mb-2'>Email</label>
              <input type='text' placeholder='johndoe@gmail.com' onChange={e => setEmail(e.target.value)} className="border rounded-[6px] outline-none w-full placeholder:text-[#B6B6B6] px-4 py-2"/>
            </div>
            <div className='w-full mt-5'>
              <label className='block mb-2'>Password</label>
              <input type='password' placeholder='****' onChange={e => setPassword(e.target.value)} className="border rounded-[6px] outline-none w-full placeholder:text-[#B6B6B6] px-4 py-2"/>
            </div>
            {
              loading ?
              <button className='bg-green-300 cursor-not-allowed w-full mt-3 py-2 rounded-[4px] text-white'>Loading...</button>
              :
              <button className='bg-green-500 w-full mt-3 py-2 rounded-[4px] text-white' onClick={login} >Login</button>
            }
        </div>
        </div>
    </div>
  )
}

export default Login