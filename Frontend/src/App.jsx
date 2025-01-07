import { useContext } from 'react'
import {ToastContainer} from 'react-toastify'
import Home from './Pages/Home'
import BuyCredit from './Pages/BuyCredit'
import Result from './Pages/Result'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Description from './Components/Description'
import Login from './Components/Login'
import { AppContext } from './Context/AppContext'

const App = () => {
  const {showLogin} = useContext(AppContext)
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-blue-50 to-blue-300'>
      <ToastContainer position='bottom-right'/>
      <Navbar />
      {showLogin && <Login/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/buy" element={<BuyCredit />} />
      </Routes>
      <Description/>
    
    </div>
  )
}

export default App
