import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import Heading from '../components/Heading'
import SubHeading from '../components/SubHeading'
import InputBox from '../components/InputBox'
import CustomButton from '../components/CustomButton'
import BottomWarning from '../components/BottomWarning'

const Signup = () => {
    const [first, setFirstName] = useState("");
    const [last, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    
    return (
        <div className='flex justify-center items-center bg-slate-100 h-screen'>
            <div className='bg-blue-400 h-[52rem] w-[36rem] flex justify-center rounded-lg items-center shadow-lg shadow-slate-300'>
                <div className='bg-white h-[42rem] w-[28rem] items-center rounded-xl text-center p-8 shadow-lg shadow-blue-500'>
                   <Heading label={"Sign up"}/>
                   <SubHeading label={"Enter your information to create an account"} />
                   <InputBox label={"First Name"} placeholder={"Satyam"} onChange = {(e) => {
                    setFirstName(e.target.value)
                   }}/>
                   <InputBox label={"Last Name"} placeholder={"Pal"} onChange={(e) => {
                    setLastName(e.target.value)
                   }} />
                   <InputBox label={"Email"} placeholder={"satyam@gmail.com"} onChange={(e) => {
                    setEmail(e.target.value)
                   }}/>
                   <InputBox label={"Password"} placeholder={"satyam123"} onChange={(e) => {
                    setPassword(e.target.value)
                   }}/>
                   <CustomButton label={"Sign up"} onClick = {async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                           username: email,
                           password: password,
                           firstName: first,
                           lastName: last
                        })
                        localStorage.setItem("name", response.data.user.username)
                        localStorage.setItem("token", response.data.token)
                        navigate('/dashboard')

                   }}/>
                   <BottomWarning label={"Alerady having an account?"} buttonText = {"Signin"} to = {"/signin"}/>
                </div>
            </div>
        </div>
    )
}

export default Signup