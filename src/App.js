import './App.css';
import Login from './components/Login';
import Hello from './components/Hello';
import Dashboard from './components/Dashboard';
import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom';
import { useCookies } from "react-cookie";




function App() {
  const [cookies, setCookie] = useCookies(["token"]);
  return (
    <div>
      <BrowserRouter>
        <nav>
          <h1>The JSON LOGIN UI</h1>
          <Link to="/">Login</Link>
          <Link to="/test">Test</Link>
          <Link to="/start">Start</Link>
        </nav>
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route path="/start" element={<Hello />}/>
          <Route path="/test" element={cookies.token ? <Dashboard /> : <Navigate to="/" />}/>
          <Route path="/roam" element={(
            <div>
              <h2>Test Page 2</h2>
               <p>Roaming</p>
            </div>
          )}/>
          <Route path="/checkout" 
          element={cookies.token ? <Navigate to="/products" /> : <p> Checkout Page </p>} />
          <Route path="/redirect" element={<Navigate to="/about" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
