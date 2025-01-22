import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { serverUrl } from '../service/serviceUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserProjectApi } from '../service/allApi';
import { editProjectResponse } from '../context/ContextShare';

function Edit({ project }) {
    const [show, setShow] = useState(false);
    const [preview, setPreview] = useState("")
    const [key, setKey] = useState(1)
    const {setEditResponse} = useContext(editProjectResponse) 
    // console.log(project);

    const [projectDetails, setProjectDetails] = useState({
        title: project.title,
        language: project.language,
        github: project.github,
        website: project.website,
        overview: project.overview,
        projectImg: ""
    })

    const handleCancel = () => {
        setProjectDetails({
            title: project.title,
            language: project.language,
            github: project.github,
            website: project.website,
            overview: project.overview,
            projectImg: ""

        })
        setPreview("")
        if (key == 1) {
            setKey(0)
        } else {
            setKey(1)
        }
    }

    console.log(projectDetails);


    const handleFile = (e) => {
        console.log(e.target.files);
        setProjectDetails({ ...projectDetails, projectImg: e.target.files[0] })

    }

    useEffect(() => {
        if (projectDetails.projectImg) {
            setPreview(URL.createObjectURL(projectDetails.projectImg))
        }
    }, [projectDetails.projectImg])


    const handleUpdate = async () => {
        const { title, language, github, website, overview, projectImg } = projectDetails
        if (!title || !language || !github || !website || !overview) {
            toast.info("Fill the form completely")
        } else {
            // api
            // reqbody
            const reqBody = new FormData()
            reqBody.append("title", title)
            reqBody.append("language", language)
            reqBody.append("github", github)
            reqBody.append("website", website)
            reqBody.append("overview", overview)
            preview ? reqBody.append("projectImg", projectImg) : reqBody.append("projectImg", project.projectImg)

            const token = sessionStorage.getItem("token")

            if (preview) {

                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
                const result = await updateUserProjectApi(project._id, reqBody, reqHeader)
                console.log(result);

                if (result.status == 200) {
                    toast.success('project updated successfully')
                    setTimeout(() => {
                        handleClose()
                    }, 2000)
                    setEditResponse(result)
                    
                }
                else if (result.status == 406) {
                    toast.warning(result.response.data)
                    handleCancel()
                    
                }

                else {
                    toast.error('something went wrong')
                    handleClose()
                }

            } else {
                const reqHeader = {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }

                const result = await updateUserProjectApi(project._id, reqBody, reqHeader)
                console.log(result);

                if (result.status == 200) {
                    toast.success('project updated successfully')
                    setTimeout(() => {
                        handleClose()
                    }, 2000)
                    setEditResponse(result)
                    
                }
                else if (result.status == 406) {
                    toast.warning(result.response.data)
                    handleCancel
                }

                else {
                    toast.error('something went wrong')
                    handleClose()
                }


            }
        }
    }



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <FontAwesomeIcon icon={faPenToSquare} onClick={handleShow} size='lg' className='text-info' />
            <Modal show={show} onHide={handleClose} centered size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-success'>Add Project Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row">
                            <div className="col-6 d-flex justify-content-center align-items-center">
                                <label htmlFor="projectImage">
                                    <input key={key} onChange={(e) => handleFile(e)} type="file" id='projectImage' className='d-none' />
                                    <img src={preview ? preview : `${serverUrl}/upload/${project.projectImg}`} className='w-100' alt="" />
                                </label>
                            </div>
                            <div className="col-6">
                                <div><input type="text" onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} value={projectDetails.title} placeholder='Title' className='form-control mt-3' /></div>
                                <div><input type="text" onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })} value={projectDetails.language} placeholder='Language' className='form-control mt-3' /></div>
                                <div><input type="text" onChange={(e) => setProjectDetails({ ...projectDetails, github: e.target.value })} value={projectDetails.github} placeholder='GitHub' className='form-control mt-3' /></div>
                                <div><input type="text" onChange={(e) => setProjectDetails({ ...projectDetails, website: e.target.value })} value={projectDetails.website} placeholder='Website ' className='form-control mt-3' /></div>
                                <div><textarea onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })} value={projectDetails.overview} rows={5} placeholder='Overview' className='form-control mt-3'></textarea></div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning me-3" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={handleUpdate}>
                        Add Update
                    </Button>
                </Modal.Footer>
                <ToastContainer position='top-center' autoClose="2000" />
            </Modal>
        </>
    )
}

export default Edit