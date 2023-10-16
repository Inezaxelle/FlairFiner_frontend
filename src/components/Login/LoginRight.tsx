import React, { FormEvent, useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import { PUBLIC_URL } from "../../api/api.config";

const LoginRight = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const  handleChange = (e: FormEvent<HTMLInputElement>) => {
    const data = e.target as HTMLInputElement
    setFormData(prevData => {
      return { ...prevData, [data.name]: data.value }
    })
  }

  const navigate = useNavigate()

  const loginUser = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await PUBLIC_URL.post('/auth/login', {
          email_or_username_or_phone_number: formData.email,
          password: formData.password
      })
      localStorage.setItem('ff_access_token', response.data.data.access_token)
      navigate('/dashboard')
    } catch (error) {
      toast.error('Invalid credentials. try again !!')
    }
  }

  return (
    <div className="bg-white w-[60%] lg:h-full p-8">
      <div className="leading-6 mx-auto w-[85%] ">
        <h1 className="text-black text-lg lg:font-bold py-4 ">
          Login to <span className="text-[#8F0A0A]">FlairFiner</span>
        </h1>
        <span className="text-[#D9D9D9]">Welcome back!</span>
      </div>
      <div className="mx-auto w-[85%] pt-3 flex flex-col justify-evenly h-[40%] gap-4">
        <form className="h-[60%] flex flex-col justify-evenly" onSubmit={loginUser}>
          <div>
            <input
              className="outline-none p-3 bg-[#F6F6F6] mb-6 w-[85%] pl-4 text-sm h-[60px] focus:bg-[white] focus:border-2"
              type="text"
              placeholder="Email Address"
              required
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="w-[85%] h-fit relative flex items-center justify-end">
            <input
              className="outline-none p-3 bg-[#F6F6F6] w-full pl-4 text-sm h-[60px] focus:bg-[white] focus:border-2"
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              required
              name="password"
              onChange={handleChange}
            />
            {passwordVisible ? (
              <FiEyeOff
                className="w-5 h-5 text-gray-500 absolute self-center top-5 right-7"
                onClick={() => setPasswordVisible((prev) => !prev)}
              />
            ) : (
              <FiEye
                className="w-5 h-5 text-gray-500 absolute self-center top-5 right-7"
                onClick={() => setPasswordVisible((prev) => !prev)}
              />
            )}
          </div>
          <div className="w-[85%] pl-4 text-[#8F0A0A]">Forgot password?</div>
          <button className="w-[85%] h-[70px] outline-none p-3 bg-[#8F0A0A] text-[white] text-center border-0 rounded-none font-bold ">
            Log in
          </button>
        </form>
      </div>
      <div className="w-[85%] mx-auto flex justify-center inset-x-0 h-[80%]">
        <div className="w-full flex justify-end">
          <section className="w-[85%] self-center bg-transparent">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#8F0A0A]">
              {" "}
              Sign up
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};
export default LoginRight;
