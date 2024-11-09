import { useContext, useState } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import Footer from './component/Footer'
import { tokenAuthContext } from './context/AuthContext'

function App() {
  const [count, setCount] = useState(0)
  const {isAuthorized,setIsAuthorized} = useContext(tokenAuthContext)

  return (
    <>
     <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/projects' element={isAuthorized?<Projects/>:<Navigate to={'/login'}/>}></Route>
        <Route path='/dashboard' element={isAuthorized?<Dashboard/>:<Navigate to={'/login'}/>}></Route>
        <Route path='/register' element={<Auth insideRegister={true}/>}></Route>
        <Route path='/login' element={<Auth/>}></Route>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
