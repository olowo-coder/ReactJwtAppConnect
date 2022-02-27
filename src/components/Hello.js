import React from 'react';
import axios from 'axios';
import { Route, Routes, useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


function Hello() {
    const [cookies, setCookie] = useCookies(["token"]);

    const navigate = useNavigate();
    // const headers = new Headers({
    //     "Content-Type": "application/json",
    //     'Access-Control-Allow-Origin':"*" ,
    //     "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmb28iLCJBdXRob3JpdGllcyI6W10sImV4cCI6MTY0NTg2NjQ5MSwiaWF0IjoxNjQ1ODIzMjkxfQ.NyzZlWiqXaJMFsV8K5-8pJMojcklyt5IDlyabyFB894bF98BfDUrI4RpKT8F-w6sg3bT9Osnz2IKK9h1ps4E1w"  
    //   })
    const API_BASE_URL = "http://localhost:6050";
    const accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmb28iLCJBdXRob3JpdGllcyI6W10sImV4cCI6MTY0NTkwNzM1NSwiaWF0IjoxNjQ1ODY0MTU1fQ.CqD7trogucV5zj_I0u16RPMvQ8-awOpui7oqBaWkp30LbjeKT_RgmkPXPDlJ_GkREnD1MqmCMGophx2fRsRXSw";
    const authRes = async () => {
        const res = await fetch(`${API_BASE_URL}/hello/start`
        
        ,{
            method: "GET",
            mode: 'cors',
            headers: {
                // "Authorization": `Bearer ${accessToken}`,
                // "Authorization": 'Bearer ' + JSON.parse(localStorage.getItem("token")).jwt,
                "Authorization": 'Bearer ' + cookies.token,
            },
          }
          );
        // console.log(JSON.parse(localStorage.getItem("token")).jwt)
        console.log(cookies.token)
        const data = await res.json();
        console.log(res);
        console.log(data);
        if(data.status === 200) {
            navigate("/test")
        }
        else if(data.status === 403){
            navigate("/")
        }
        // return data;
      };

    //   axios.interceptors.request.use(
    //       config => {
    //           config.headers.authorization = 'Bearer vbbbbbbb';
    //           return config;
    //       },
    //       error => {
    //           return Promise.reject(error);
    //       }
    //   )

    const authAxios = axios.create({
        baseURL: API_BASE_URL,
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    const authSecond = () => {
        authAxios.get(`/hello/start`).then( res => console.log(res));
    }
  return (
    <div>
        <button onClick={authRes}>Check</button>
    </div>
  )
}

export default Hello;