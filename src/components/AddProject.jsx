import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import { addProjectApi } from '../service/allApi';
import { addResponseContext } from '../context/ContextShare';


function AddProject() {
//    states
    const [show, setShow] = useState(false);
    const handleClose = () =>{
        setShow(false);
        handleCancel()
    }
    const {setAddResponse} = useContext(addResponseContext)
    const handleShow = () => setShow(true);
    const [preview , setPreview] = useState("")
    const [key, setKey] = useState(1)

    const [projectDetails , setProjectDetails] = useState({
        title:"",
        language:"",
        github:"",
        website:"",
        overview:"",
        projectImg :""
    })
    console.log(projectDetails);
    const [token , setToken] = useState("")
    console.log(token);
    
   


// add files 
    const handleFile = (e)=>{
        // console.log(e.target.files[0]);
        setProjectDetails({...projectDetails,projectImg:e.target.files[0]})
    }
   useEffect(()=>{
     if (projectDetails.projectImg) {
        setPreview(URL.createObjectURL(projectDetails.projectImg)) // the code to convert image to url very important
     }
   },[projectDetails.projectImg])




   
//    handle cancel
const handleCancel= ()=>{
    setProjectDetails({
        title:"",
        language:"",
        github:"",
        website:"",
        overview:"",
        projectImg :""
    })
    setPreview("")
    if(key == 1){
           setKey(0)
    }else{
        setKey(1)
    }
}

// handleAdd
const handleAdd = async()=>{
    const {title,language,github,website,overview,projectImg}= projectDetails;

    if(!title || !language || !github || !website || !overview || !projectImg){
        toast.info('Fill the form Completely')
    }else{
        const reqBody = new FormData()
        reqBody.append ("title",title)
        reqBody.append ("language",language)
        reqBody.append ("github",github)
        reqBody.append ("website",website)
        reqBody.append ("overview",overview)
        reqBody.append ("projectImg",projectImg)

        if(token){
            const reqHeader = {
                "Content-Type":"multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
            const result =  await addProjectApi(reqBody,reqHeader)
            console.log(result);

            if(result.status == 200){
                toast.success('project added successfully')
                setTimeout(()=>{
                    handleClose()
                },2000)
                setAddResponse(result)
            }
            else if(result.status == 406){
                    toast.warning(result.response.data)
                    handleCancel
                }
            
            else{
                toast.error('something went wrong')
                handleClose()
            }
            
        }else{
            toast.warning("please Login")
        }
    }

}

useEffect(()=>{
    if (sessionStorage.getItem('token')) {
        setToken(sessionStorage.getItem('token'))
    }
},[])
    

    return (
        <>
            <div> 
                <button className='btn btn-success ' onClick={handleShow} >Add Project Here</button>

                <Modal show={show} onHide={handleClose} centered size='lg'>
                    <Modal.Header closeButton>
                        <Modal.Title className='text-success'>Add Project Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-6 d-flex justify-content-center align-items-center">
                                    <label htmlFor="projectImage">
                                        <input type="file" id='projectImage' onChange={(e)=>handleFile(e)} key={key} className='d-none' />
                                        <img src={ preview ? preview :"https://cdn.iconscout.com/icon/free/png-256/free-add-file-icon-download-in-svg-png-gif-formats--new-files-document-pack-folders-icons-2079210.png?f=webp&w=256" }className='w-100' alt="" />
                                    </label>
                                </div>
                                <div className="col-6">
                                    <div> <input type="text" placeholder='Title' className='form-control mt-3' value={projectDetails.title} onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})} /></div>
                                    <div><input type="text" placeholder='Language' className='form-control mt-3' value={projectDetails.language}  onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})} /></div>
                                    <div><input type="text" placeholder='GitHub' className='form-control mt-3' value={projectDetails.github}  onChange={(e)=>setProjectDetails({...projectDetails,github:e.target.value})} /></div>
                                    <div><input type="text" placeholder='Website ' className='form-control mt-3' value={projectDetails.website}  onChange={(e)=>setProjectDetails({...projectDetails,website:e.target.value})} /></div>
                                    <div><textarea rows={5} placeholder='Overview' className='form-control mt-3 'value={projectDetails.overview}  onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})} ></textarea></div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="warning me-3" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button variant="success" onClick={handleAdd}>
                            Add Project
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
         <ToastContainer position='top-center' autoClose="2000"  />
        </>
    )
}

export default AddProject