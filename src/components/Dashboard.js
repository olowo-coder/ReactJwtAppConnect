import React,{useEffect} from 'react';
import { Route, Routes, useParams, useNavigate, Navigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

function Dashboard() {
    const [cookies, setCookie, removeCookie] = useCookies(['token'])
const navigate = useNavigate();
const logOut = () => {
    removeCookie('token', { path: '/' });
    // cookies.remove('token', { path: '/' });
    navigate("/")
    // localStorage.removeItem("token");
}
// useEffect(() => {
//     if (!cookies.token){
//      navigate("/")   
//     }
// },[cookies.token, navigate])

  return (
    <div>
    
        <h2>Test Page</h2>
        <p>Welcome to dashboard</p>
        <button onClick={logOut}>Log Out</button>
        
    </div>
  )
}

export default Dashboard;