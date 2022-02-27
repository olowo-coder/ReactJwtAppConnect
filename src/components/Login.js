import React, { useState } from "react";
import { Route, Routes, useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function Login(props) {
    const [cookies, setCookie] = useCookies(["token"]);

   

  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const API_BASE_URL = "http://localhost:6050";

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload = {
      username: state.email,
      password: state.password,
    };
    authUser(payload);
    console.log(payload);
  };

  const authUser = async (details) => {
    const res = await fetch(`${API_BASE_URL}/hello/authenticate`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(details),
    });
    const data = await res.json();
    console.log(data);
    if(data.success) {
        // localStorage.setItem("token", JSON.stringify(data));
        // document.cookie = "token=" + JSON.stringify(data);
        setCookie("token", data.jwt, { path: "/" });
        navigate("/test")
    }
    else if(data.status === 500){
        navigate("/")
    }
    // return data;
  };

  return (
    <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
      <form>
        <div className="form-group text-left">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={state.email}
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group text-left">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmitClick}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Login;
