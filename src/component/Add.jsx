import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import uploadImg from '../assets/Upload-Icon-Logo-PNG-Clipart-Background.png'
import { addProjectApi } from '../service/allAPI'
import { addResponseContext } from '../context/ContextsShare'

const Add = () => {
  const {addResponse,setAddResponse} = useContext(addResponseContext)
  const [imgFileStatus,setImgFileStatus] = useState(false)
  const [preview,setPreview] = useState(uploadImg)
  const [projectData,setProjectData] = useState({
    title:"",
    languages:"",
    overview:"",
    github:"",
    website:"",
    projectImg:""
  })
const [show, setShow] = useState(false);
useEffect(()=>{
  if(projectData.projectImg.type=="image/png" || projectData.projectImg.type=="image/jpg" ||projectData.projectImg.type=="image/jpeg"){
    setImgFileStatus(true)
    setPreview(URL.createObjectURL(projectData.projectImg))
  }else{
    setImgFileStatus(false)
    setPreview(uploadImg)
    setProjectData({...projectData,projectImg:""})
  }
},[projectData.projectImg])
console.log(projectData);

  const handleClose = () => {
    setShow(false);
    setProjectData( {title:"",
      languages:"",
      overview:"",
      github:"",
      website:"",
      projectImg:""
    })
  }
  const handleShow = () => setShow(true);

  const handleSaveProjects =async ()=>{
    const {title,languages,overview,github,website,projectImg}  = projectData
    if(title&&languages&&overview&&github&&website&&projectData){
      //api call
      // request body must be in form data since data contains files
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("projectImg",projectImg)
      
      const token = sessionStorage.getItem("token")
      if(token){
        
        const reqHeader = {
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        //api call post request
        try {
          const result = await addProjectApi(reqBody,reqHeader)
          console.log(result);
          if(result.status==200){
            handleClose()
            //share result via context
            setAddResponse(result)
          }else{
            alert(result.respose.data)
          } 
        } catch(err){
          console.log(err)
        }
      }
    }else{
      alert("please fill the form completely")
    }
  }
  return (
    <>
        <button onClick={handleShow} className='btn btn-primary'>
            <i className="fa-solid fa-plus"></i>New Project
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
          <Modal.Title>New Project Details!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className="col-lg-4">
                <label>
                    <input onChange={e=>setProjectData({...projectData,projectImg:e.target.files[0]})} style={{display:'none'}} type="file" />
                    <img height={"200px"} src={preview} alt="" />
                </label>
               { 
                 !imgFileStatus&&
                <div className="text-warning fw-bolder my-2">
                    *upload Only the Following file Types (Jpeg,jpg,png) here,
                </div>
                }
            </div>
            <div className="col-lg-8 mt-sm-3">
                <div className='mb-2'>
                    <input  onChange={e=>setProjectData({...projectData,title:e.target.value})} placeholder='project title' type="text" className='form-control' />
                </div>
                <div className='mb-2'>
                    <input value={projectData.languages} onChange={e=>setProjectData({...projectData,languages:e.target.value})} placeholder='Languages used' type="text" className='form-control' />
                </div>
                <div className='mb-2'>
                    <input value={projectData.overview} onChange={e=>setProjectData({...projectData,overview:e.target.value})} placeholder='Project Over View' type="text" className='form-control' />
                </div>
                <div className='mb-2'>
                    <input value={projectData.github} onChange={e=>setProjectData({...projectData,github:e.target.value})} placeholder='project Github Link' type="text" className='form-control' />
                </div>
                <div className='mb-2'>
                    <input value={projectData.website} onChange={e=>setProjectData({...projectData,website:e.target.value})} placeholder='project Website  Link' type="text" className='form-control' />
                </div>
                
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSaveProjects} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add