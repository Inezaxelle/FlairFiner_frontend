import { TextField, InputAdornment } from '@mui/material'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { Link, resolvePath, useNavigate ,} from 'react-router-dom'
import { PUBLIC_URL } from '../../api/api.config'
import { toast } from 'react-toastify'


type CreateUserType = {
  fullName: string,
  email: string,
  password: string
}


const SignupRight = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passVisible, setPassVisible]= useState(false)
  const [fullNames, setFullNames]= useState<string>("");
  const [email, setEmail]= useState<string>("");
  const [password, setPassword]= useState<string>("");
  const [passworConfirm, setPasswordConfirm]= useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate()


  const handleSubmit =async (event: FormEvent<HTMLFormElement>)=>{
  
  try {
      event.preventDefault();

      if(password !== passworConfirm){
        setError("Passwords don't match");
        return;
      }

      const data: CreateUserType = {
        fullName: fullNames,
        email,
        password
      }
      

      const response = await PUBLIC_URL.post('/user/create-user', data);
      
      if(response.data.success = "true") {
        navigate('/login')
      } else {
        toast.error('failed to create account', {
          position: toast.POSITION.TOP_CENTER
        })
      }
  } catch (error) {
    console.log(error);
  }
  }
  return (
    <div className='bg-white w-[60%] lg:h-full p-8'>
      <div className='leading-6 mx-auto w-[85%] '>
        <h1 className='text-black text-lg lg:font-bold py-4 '>Sign up to <span className='text-[#8F0A0A]'>FlairFiner</span>
        </h1>
        <span className='text-[#D9D9D9]'>Create your account</span>
      </div>
      <form className='mx-auto w-[85%] pt-3 flex flex-col justify-around h-[65%] gap-0' onSubmit={handleSubmit}>
       
          <input className='outline-none p-3 bg-[#F6F6F6] mb-6 w-[85%] pl-4 text-sm  h-[60px] focus:bg-[white] focus:border-2' type="text" placeholder='Full Names' required onChange={(event: ChangeEvent<HTMLInputElement>)=>{
             setFullNames(event.target.value);
          }} />

      

        <input className='outline-none p-3 bg-[#F6F6F6] mb-6 w-[85%] pl-4 text-sm h-[60px] focus:bg-[white] focus:border-2' type="text" placeholder='Email Address' required onChange={(event: ChangeEvent<HTMLInputElement>)=>{
             setEmail(event.target.value);
          }} />
        <div className='w-[85%] h-fit relative flex items-center justify-end pb-5'>
          <input className='outline-none p-3 bg-[#F6F6F6] w-full pl-4 text-sm h-[60px] focus:bg-[white] focus:border-2' type={passwordVisible ? "text" : "password"} placeholder='Password' required onChange={(event: ChangeEvent<HTMLInputElement>)=>{
             setPassword(event.target.value);
          }} />
          {passwordVisible ? <FiEyeOff className="w-5 h-5 text-gray-500 absolute self-center top-5 right-7" onClick={() => setPasswordVisible(prev => !prev)} /> :
            <FiEye className="w-5 h-5 text-gray-500 absolute self-center top-5 right-7" onClick={() => setPasswordVisible(prev => !prev)} />}
        </div>
        <div className='w-[85%] h-fit relative flex items-center justify-end '>
          <input className='outline-none p-3 bg-[#F6F6F6] w-full pl-4 text-sm h-[60px] focus:bg-[white] focus:border-2' type={passVisible? "text" :"password"}  placeholder='Confirm password' required onChange={(event: ChangeEvent<HTMLInputElement>)=>{
             setPasswordConfirm(event.target.value);
             setError("");
          }} />
          {passVisible ? <FiEyeOff className="w-5 h-5 text-gray-500 absolute self-center top-5 right-7" onClick={()=>setPassVisible(prev=>!prev)}  /> :
            <FiEye className="w-5 h-5 text-gray-500 absolute self-center top-5 right-7" onClick={()=>setPassVisible(prev=>!prev)} />}
        </div>
        {error && 
        <div className="py-2 text-red-500"><span>{error}</span></div>
      }

            <section className='text-[#D9D9D9] self-center w-[85%] pb-6 text-sm' >I accept the <span className='text-[#8F0A0A]'> terms and conditions </span> and <span className='text-[#8F0A0A]' > User agreement </span></section>
        <div className=''>

          <button type="submit" className='w-[85%] h-[70px] outline-none p-3 bg-[#8F0A0A] text-[white] text-center border-0 rounded-none' >
            Sign up
          </button>
        </div>
      </form>
      <div className='w-[85%] mx-auto flex justify-center inset-x-0 h-[35%]'>
        <div className='w-full flex justify-end'>

          <section className='w-[85%] self-center bg-transparent'>Already have an account? <Link to='/login' className='text-[#8F0A0A] bg-transparent outline-none'>Login instead</Link></section>
        </div>
      </div>
    </div>
  )
}
export default SignupRight
