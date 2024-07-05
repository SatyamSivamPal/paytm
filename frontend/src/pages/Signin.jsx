import React, { useState } from 'react'
import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import CustomButton from '../components/CustomButton'
import BottomWarning from '../components/BottomWarning'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  return (
    <div className='flex justify-center h-screen items-center bg-slate-100'>
      <div className='bg-blue-400 w-[32rem] h-[38rem] flex items-center justify-center rounded-lg shadow-lg shadow-slate-300'>
        <div className='bg-white w-[24rem] h-[30rem] rounded-lg text-center p-9 shadow-lg shadow-blue-500'>
            <Heading label={"Sign in"}/>
            <SubHeading label={"Enter your credentials to access your account"} />
            <InputBox placeholder={"satyam@gmail.com"} label={"Email"} onChange={(e) => {
              setEmail(e.target.value)
            }}/>
            <InputBox placeholder={"123456"} label={"Password"} onChange={(e) => {
              setPassword(e.target.value)
            }}/>
            <CustomButton label={"Sign in"} onClick={ async () => {
              const res = await axios.post("http://localhost:7000/api/v1/user/signin", {
                username: email,
                password: password
              })
              localStorage.setItem("token",res.data.token)
              localStorage.setItem("name", res.data.name)
              navigate("/dashboard")
              
            }}/>
            <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}/>
        </div>
      </div>
    </div>

  )
}

export default Signin