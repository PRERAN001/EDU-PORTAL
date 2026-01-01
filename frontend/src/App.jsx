import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Giveadminaccess from './pages/Giveadminaccess'

import {Routes,Route} from 'react-router-dom'
import Adminhomepage from './pages/Adminhomepage'
import Userhomepage from './pages/Userhomepage'
import Adminplayground from './pages/Adminplayground'
import Userplayground from './pages/Userplaground'
// import AdminRegister from './pages/AdminRegister'
import AdminLogin from './pages/AdminLogin'
import UserRegister from './pages/UserRegister'
import UserLogin from './pages/UserLogin'
import Home from './pages/Home'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/adminlogin" element={<AdminLogin />} />
        {/* <Route path="/adminreg"  element={<AdminRegister />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/userreg"  element={<UserRegister />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/adminpage" element={<Adminhomepage />} />
        <Route path="/userpage" element={<Userhomepage />} />
        <Route path="/adminplayground" element={<Adminplayground />} />
        <Route path="/userplayground" element={<Userplayground />} />
        <Route path="/giveadminaccess" element={<Giveadminaccess />} />
      </Routes>
    </>
  )
}

export default App
