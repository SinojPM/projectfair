import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthContext } from '../context/AuthContext'

const Header = ({insideDashboard}) => {
  const {isAuthorized,setIsAuthorized} = useContext(tokenAuthContext)
  const navigate = useNavigate()
  const handleLogout = ()=>{
    sessionStorage.clear()
    setIsAuthorized(false)
    navigate('/')
  }
  return (
    <Navbar style={{zIndex:'1'}} className="position-fixed w-100 top-0 rounded border shadow">
        <Container>
          <Navbar.Brand>
            <Link to={'/'} className='fw-bolder' style={{textDecoration:'none' ,color:'white'}}> <i className='fa-brands fa-docker'></i>Projects </Link>
          </Navbar.Brand>
          {
            insideDashboard &&
                <div>
                    <button onClick={handleLogout} className='btn text-danger'>logout <i className="fa-solid fa-right-from-bracket"></i></button>
                </div>
          }
        </Container>
      </Navbar>
  )
}

export default Header