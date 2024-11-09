import React, { useContext, useState } from 'react'
import login from "../assets/login-illustration.png"
import { FloatingLabel, Form, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../service/allAPI'
import { tokenAuthContext } from '../context/AuthContext'

const Auth = ({ insideRegister }) => {
    const {isAuthorized,setIsAuthorized} = useContext(tokenAuthContext)
    const navigate = useNavigate()
    const [isLoading, setIsloading] = useState(false)
    const [userData, setUserData] = useState({ username: "", email: "", password: "" })
    console.log(userData);
    const handleRegister = async (e) => {
        e.preventDefault()
        if (userData.username && userData.email && userData.password) {
            //api call
            try {
                const result = await registerAPI(userData)
                console.log(result);
                if (result.status == 200) {
                    alert(`welcome ${result?.data?.username}...please login to explore our website`)
                    setUserData({ username: "", email: "", password: "" })
                    navigate('/login')
                } else {
                    if (result.response.status == 406) {
                        alert(result.response.data)
                        setUserData({ username: "", email: "", password: "" })
                    }
                }
            } catch (err) {
                console.log(err);

            }
        } else {
            alert("please fill the form completely")
        }
    }
    const handleLogin = async (e) => {
        e.preventDefault()
        if (userData.email && userData.password) {
            //api call
            try {
                const result = await loginAPI(userData)
                if (result.status == 200) {
                    sessionStorage.setItem("user", JSON.stringify(result.data.user))
                    sessionStorage.setItem("token", result.data.token)
                    setIsAuthorized(true)
                    setIsloading(true)
                    setTimeout(() => {
                        setUserData({ username: "", email: "", password: "" })
                        navigate('/')
                        setIsloading(false)
                    }, 2000);
                } else {
                    if (result.response.status == 404) {
                        alert(result.response.data)
                    }
                }
            } catch (err) {
                console.log(err);

            }
        }
    }

    return (
        <div style={{ width: "100%", height: "100vh" }} className='d-flex justify-content-center align-items-center'>
            <div className="container w-75">
                <div className="card shadow p-2">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <img src={login} alt="" className="w-100" />
                        </div>
                        <div className="col-lg-6">
                            <h1 className='fw-bolder mt-2'><i className='fa-brands fa-docker'></i> Project fair</h1>
                            <h5 className='fw-bolder mt-2'>
                                Sign {insideRegister ? "up" : "in"}
                            </h5>
                            <Form>
                                {
                                    insideRegister &&
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="UserName"
                                        className="mb-3">
                                        <Form.Control value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} type="email" placeholder="name@example.com" />
                                    </FloatingLabel>
                                }
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Email address"
                                    className="mb-3">
                                    <Form.Control value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} type="email" placeholder="name@example.com" />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Password">
                                    <Form.Control value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} type="password" placeholder="Password" />
                                </FloatingLabel>
                                {
                                    insideRegister ?
                                        <div className="mt-3">
                                            <button onClick={handleRegister} className="btn btn-primary mb-3">Register</button>
                                            <p>Already have an Account? Click here to <Link to={'/login'}>Login</Link></p>
                                        </div>
                                        :
                                        <div className="mt-3">
                                            <button onClick={handleLogin} className="btn btn-primary mb-3">login
                                                {isLoading && <Spinner animation="grow" variant="light" className='ms-1' />}
                                            </button>
                                            <p>New User? Click here to <Link to={'/Register'}>Register</Link></p>
                                        </div>

                                }

                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth