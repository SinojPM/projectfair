import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import uploadImg from '../assets/Upload-Icon-Logo-png-Clipart-Background.png'
import serverURL from '../service/serverUrl';
import { editResponseContext } from '../context/ContextsShare';
import { editProjectApi } from '../service/allAPI';

const Edit = ({ project }) => {
  const { editResponse, setEditResponse } = useContext(editResponseContext)
  const [imgFileStatus, setImgFileStatus] = useState(false)
  const [preview, setPreview] = useState("")
  const [projectData, setProjectData] = useState({
    id: project?._id,
    title: project?.title,
    languages: project?.languages,
    overview: project?.overview,
    github: project?.github,
    website: project?.website,
    projectImg: ""
  })
  useEffect(() => {
    if (projectData.projectImg.type == "image/png" || projectData.projectImg.type == "image/jpg" || projectData.projectImg.type == "image/jpeg") {
      setImgFileStatus(true)
      setPreview(URL.createObjectURL(projectData.projectImg))
    } else {
      setImgFileStatus(false)
      setPreview("")
      setProjectData({ ...projectData, projectImg: "" })
    }
  }, [projectData.projectImg])

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setProjectData({
      id: project?._id,
      title: project?.title,
      languages: project?.languages,
      overview: project?.overview,
      github: project?.github,
      website: project?.website,
      projectImg: ""
    })
  }
  const handleShow = () => {
    setShow(true);
    setProjectData({
      id: project?._id,
      title: project?.title,
      languages: project?.languages,
      overview: project?.overview,
      github: project?.github,
      website: project?.website,
      projectImg: ""
    })
  }

  const handleUpdateProject = async () => {
    console.log("inside handle update");
    
    const { id, title, languages, overview, github, website, projectImg } = projectData
    if (title && languages && overview && github && website) {

      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("languages", languages)
      reqBody.append("overview", overview)
      reqBody.append("github", github)
      reqBody.append("website", website)
      preview ? reqBody.append("projectImg", projectImg) : reqBody.append("projectImg", project?.projectImg)
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": preview ? "multipart/form-data" : "application/json",
          "Authorization": `Bearer ${token}`
        }
        //api call -put request
        try {
          const result = await editProjectApi(id, reqBody, reqHeader)
          if (result.status == 200) {
            alert("project updated successfully")
            handleClose()
            setEditResponse(result)
          } else {
            console.log(result);

          }
        } catch (err) {
          console.log(err);

        }

      } else {
        alert("please Fill the form completely!!")
      }
    }
  }

  return (
    <>
      <button onClick={handleShow} className='btn'>
        <i className="fa-solid fa-edit"></i>
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Project Details!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className="col-lg-4">
              <label>
                <input onChange={e => setProjectData({ ...projectData, projectImg: e.target.files[0] })} style={{ display: 'none' }} type="file" />
                <img width={"100%"} height={"200px"} src={preview ? preview : `${serverURL}/uploads/${project?.projectImg}`} alt="" />
              </label>
              {
                !imgFileStatus &&
                <div className="text-warning fw-bolder my-2">
                  *upload Only the Following file Types (Jpeg,jpg,png) here,
                </div>
              }
            </div>
            <div className="col-lg-8 mt-sm-3">
              <div className='mb-2'>
                <input value={projectData.title} onChange={e => setProjectData({ ...projectData, title: e.target.value })} placeholder='project title' type="text" className='form-control' />
              </div>
              <div className='mb-2'>
                <input value={projectData.languages} onChange={e => setProjectData({ ...projectData, languages: e.target.value })} placeholder='Languages used' type="text" className='form-control' />
              </div>
              <div className='mb-2'>
                <input value={projectData.overview} onChange={e => setProjectData({ ...projectData, overview: e.target.value })} placeholder='Project Over View' type="text" className='form-control' />
              </div>
              <div className='mb-2'>
                <input value={projectData.github} onChange={e => setProjectData({ ...projectData, github: e.target.value })} placeholder='project Github Link' type="text" className='form-control' />
              </div>
              <div className='mb-2'>
                <input value={projectData.website} onChange={e => setProjectData({ ...projectData, website: e.target.value })} placeholder='project Website  Link' type="text" className='form-control' />
              </div>

            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdateProject} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit