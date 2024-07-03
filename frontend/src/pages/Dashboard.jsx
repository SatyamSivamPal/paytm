import React, { useContext, useEffect, useState } from 'react'
import Appbar from '../components/Appbar'
import Balance from '../components/Balance'
import Users from '../components/Users'
import axios from 'axios'
import {AuthContext} from "../components/AuthContext"
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const { isAuthenticated, logout, login } = useContext(AuthContext);
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/signup'); 
      return;
    }

    axios.get("http://localhost:3000/api/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (res.data.isAuthenticated) {
          login()
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

      axios.get('http://localhost:3000/api/v1/account/balance', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          setBalance(res.data.balance);
        })
    

  }, [navigate, logout, login]);

  if (!isAuthenticated) {
    return <div>Loaders ... </div>; 
  }

  return (
    <div>
      <Appbar />
      <div className='m-8'>
        <Balance value={balance.toFixed(2)} />
        <Users />
      </div>

    </div>
  )
}

export default Dashboard