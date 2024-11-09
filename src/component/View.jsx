import React, { useContext, useEffect, useState } from 'react'
import Add from './Add'
import Edit from './Edit'
import { useSearchParams } from 'react-router-dom'
import { userProjectsApi } from '../service/allAPI'
import { addResponseContext, editResponseContext } from '../context/ContextsShare'

const View = () => {
  const {editResponse,setEditResponse} = useContext(editResponseContext)
  const {addResponse,setAddResponse} = useContext(addResponseContext)
  const [userProjects, setUserProjects] = useState([])

  useEffect(() => {
    getUserProjects()
  }, [addResponse,editResponse])
  console.log(userProjects);


  const getUserProjects = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      try {
        const result = await userProjectsApi(reqHeader)
        if (result.status == 200) {
          setUserProjects(result.data)
        } else {
          console.log(result.response.data);

        }
      } catch (err) {
        console.log(err);

      }
    }
  }
  return (
    <>
      <div className="d-flex justify-content-between mt-2">
        <h2 className='text-warning'>All Projects</h2>
        <div><Add /></div>
      </div>
      <div className="mt-2">
        {
          userProjects.length > 0 ?
            userProjects.map(project => (
              <div key={project._id} className="border rounded p-2 d-flex justify-content-between">
                <h3>{project.title}</h3>
                <div className="d-flex align-items-center">
                  <div><Edit project={project} /></div>
                  <div className="btn"><a href={project.github} target='_blank'><i className="fa-brands fa-github "></i></a></div>
                  <button className='btn'><i className="fa-solid fa-trash text-danger"></i></button>
                </div>
              </div>
            ))
            :
            <div className="fw-bolder text-warning">no project uploaded yet!!!</div>
        }
      </div>
    </>
  )
}

export default View