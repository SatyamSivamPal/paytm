import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AuthContext } from "../components/AuthContext"

const SendMoney = () => {
  const { isAuthenticated, logout, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/signup');
      return;
    }
    axios.get("http://localhost:7000/api/v1/me", {
      headers: {
        Authorization: `bearer ${token}`
      }
    })
      .then((res) => {
        if (res.data.isAuthenticated) {
          console.log("Login");
          login();
        } else {
          logout()
          navigate('/signup');
        }
      })
      .catch((error) => {
        console.error('Error validating token:', error);
        logout()
        navigate('/signup');
      });
  }, [navigate, login, logout])

  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isTransferSuccess, setIsTrnasferSuccess] = useState(false);

  const id = searchParams.getAll("id")
  const name = searchParams.get("name")

  const handleTransfer = () => {
    setIsLoading(true);
    axios.post("http://localhost:7000/api/v1/account/transfer", {
      to: id,
      amount: amount
    }, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then((res) => {
        console.log(res.data.msg);
        setIsLoading(false);
        setIsTrnasferSuccess(true);
      })
      .catch((err) => {
        setIsLoading(false)
      })
  }

  return (
    <div className='flex h-screen justify-center items-center'>
      {isLoading ? (
        <div className='flex justify-center items-center'>
          <div className='loader'></div>
        </div>
      ) : isTransferSuccess ? (
        <div className='bg-white w-[30rem] h-[26rem] text-center border border-gray-200 shadow-lg shadow-gray-400/20 rounded-md'>
          <div className='font-bold text-4xl pt-12'>
            Transfer Successful!
          </div>
          <div className='flex justify-center pt-16'>
            <div className='bg-green-500 rounded-full flex items-center justify-center text-2xl w-16 h-16 text-white'>
              {name[0].toUpperCase()}
            </div>
          </div>
          <div className='font-bold text-2xl pt-2'>
            {name}
          </div>
          <div className='text-lg pt-6 font-semibold'>
            Amount of ₹{amount} has been successfully transferred.
          </div>
          <div><button className='bg-green-500 text-white p-2 rounded-lg mt-6 w-[25rem]' onClick={() => {
            navigate('/dashboard')
          }}>Back to Dashboard</button></div>
        </div>
      ) : (
        <div className='bg-white w-[30rem] h-[28rem] text-center border border-gray-200 shadow-lg shadow-gray-400/20 rounded-md'>
          <div className='font-bold text-4xl pt-12'>
            Send Money
          </div>
          <div className='flex justify-center pt-16'>
            <div className='bg-green-500 rounded-full flex items-center justify-center text-2xl w-16 h-16 text-white'>
              {name[0].toUpperCase()}
            </div>
          </div>

          <div className='font-bold text-2xl pt-2'>
            {name}
          </div>
          <div className='p-4'>
            <div className='text-lg pt-3'>
              <div className='font-bold text-left text-md'>Amount in ₹</div>
              <div className='pt-1'>
                <input className='border border-gray-400 w-full px-2 py-1 rounded-lg bg-gray-100 focus:border-gray-400 focus:outline-none' type="number" placeholder="Enter Amount" onChange={(e) => {
                  setAmount(e.target.value)
                }} />
              </div>
            </div>
          </div>
          <div>
            <button className='bg-green-500 rounded-lg w-[28rem] p-3 text-white' onClick={handleTransfer}>
              Initiate Transfer
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SendMoney