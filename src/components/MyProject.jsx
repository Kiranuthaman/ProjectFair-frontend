import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import Edit from './Edit'
import { faGlobe, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { removeUserProjectApi, userProjectApi } from '../service/allApi'
import { Link } from 'react-router-dom'
import { addResponseContext, editProjectResponse } from '../context/ContextShare'





function MyProject() {
  const [userProject,setUserProject]=useState([])

  const {addResponse} = useContext(addResponseContext)

  const {editResponse} = useContext(editProjectResponse)

  const [removestatus , setRemoveStatus]= useState({})
     
  const userDetails = async () => {
      if (sessionStorage.getItem("token")) {
          const token =sessionStorage.getItem("token");
      
        const reqHeader = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const result = await userProjectApi(reqHeader);
        console.log(result);
        setUserProject(result.data);
      }
    };
    useEffect(()=>{
      userDetails()
    },[addResponse , removestatus,editResponse])
    console.log(userProject);


    const handleDelete = async (id)=>{
      if (sessionStorage.getItem("token")) {
        const token =sessionStorage.getItem("token");
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
      const result = await removeUserProjectApi(id , reqHeader)
      console.log(result);
      if (result.status == 200) {
        setRemoveStatus()
       alert('project delted Sucessfully')
      }else{
        alert('somthing went wrong')
      }
      
     
    }

    }
  return (
    <>
    <div className=' p-5  shadow-lg'>
        <div className='d-flex justify-content-between'>
        <h3 className='text-success'>My Project</h3>
       <AddProject/>
        </div>
        {userProject?.length>0 ?
        userProject?.map((item)=>(
          <div className="p-3 bg-light mt-3 rounded d-flex align-items-center justify-content-between">
          <h5>{item.title}</h5>
          <div className='d-flex mt-2'>
            <Edit project = {item}/>
            <Link to={item.website} target='_blank'>
            <FontAwesomeIcon  icon={faGlobe} className='ms-4 me-4  text-success' size='lg' />
            </Link>
           <Link to={item.github} target='_blank'>
           <FontAwesomeIcon icon={faGithub}  className='me-4 text-warning' size='lg' />
           </Link>
            <FontAwesomeIcon onClick={()=>handleDelete(item?._id)} icon={faTrash} style={{color: "#ff0000",}}  className='me-4' size='lg' />
          </div>
        </div>
        ))
         :
        <h4 className='text-center text-warning mt-5'>No Project Added</h4>}
    </div>
    
    </>
  )
}

export default MyProject