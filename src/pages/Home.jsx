import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import landing from '../assets/OIP.jpeg'
import ProjectCard from '../component/ProjectCard'
import { Card } from 'react-bootstrap'
import { homeProjectApi } from '../service/allAPI'
const Home = () => {
    const navigate = useNavigate()
    const [allHomeProjects, setAllHomeProjects] = useState([])
    const handleProject = () => {
        if (sessionStorage.getItem("token")) {
            navigate('/projects')
        } else {
            alert("please login to get full access to our project")
        }
    }
    useEffect(() => {
        getAllHomeProjects()
    }, [])
        console.log(allHomeProjects);
        
    const getAllHomeProjects = async () => {
        try {
            const result =await homeProjectApi()
            console.log(result);
            
            if (result.status == 200) {
                setAllHomeProjects(result.data)
            }
        } catch (err) {
            console.log(err);

        }
    }

    return (
        <>
            <div style={{ minHeight: "100vh" }} className="d-flex justify-content-center align-items-center rounded shadow w-100">
                <div className='container'>
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h1 style={{ fontSize: '80px' }}><i class="fa-brands fa-docker"></i> Project Fair</h1>
                            <p style={{ textAlign: 'justify' }}>One stop destination for all software Development projects were user can add and manage their Projects.as well as  access all projects available in our website....what are you waiting for

                            </p>
                            {
                                sessionStorage.getItem('token') ?
                                    <Link to={'/dashboard'} className='btn btn-warning'>MANAGE YOUR PROFILE</Link>
                                    :
                                    <Link to={'/login'} className='btn btn-warning'>START TO EXPLORE</Link>
                            }
                        </div>
                        <div className='col-lg-6 d-flex justify-content-center align-items-center'>
                            <img src={landing} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-5 text-center">
                <h1 className="mb-5">Explore Our Projects</h1>
                <marquee>
                    <div className="d-flex">
                        {
                            allHomeProjects.length > 0 &&
                            allHomeProjects?.map(project => (
                                <div key={project?._id} className="me-5">
                                    <ProjectCard displayData={project} />
                                </div>
                            ))
                        }
                    </div>
                </marquee>
                <button onClick={handleProject} className='btn btn-link mt-5'>CLICK HERE TO VIEW MORE PROJECTS...</button>
            </div>
            <div className="d-flex justify-content-center align-items-center flex-column">
                <h1>Our Testimonials</h1>
                <div className="d-flex justify-content-evenly align-items-center mt-3 w-100">
                    <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title className='d-flex justify-content-center align-items-center flex-column' ><img width={"60px"} height={"60px"} src="https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Free-File-Download.png" /><span>Card Title</span></Card.Title>
                            <Card.Text>
                                <div className="d-flex justify-content-center align-items-center">
                                    <i className='fa-solid fa-star text-warning'></i>
                                    <i className='fa-solid fa-star text-warning'></i>
                                    <i className='fa-solid fa-star text-warning'></i>
                                    <i className='fa-solid fa-star text-warning'></i>
                                    <i className='fa-solid fa-star text-warning'></i>
                                </div>
                                <p style={{ textAlign: 'justify' }}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis quibusdam dignissimos sed aliquid dicta beatae dolores perferendis voluptate voluptas magnam modi sint ab reprehenderit ad inventore laborum temporibus, ullam optio!</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>

    )
}

export default Home