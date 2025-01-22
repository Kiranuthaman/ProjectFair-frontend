import {  faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../service/serviceUrl'
import {  toast } from 'react-toastify';
import { updateUserProfileApi } from '../service/allApi';
import Collapse from 'react-bootstrap/Collapse';

function Profile() {

  const [preview , setPreview] = useState("")
  const [existingImg , setExistingImg] = useState("")
  const [updateStatus, setUpdateStatus] = useState({})
  const [open, setOpen] = useState(false);
  const [userDetails, setuserdetails] = useState({
    username:"",
    email:"",
    password :"",
    profile:"",
    linkedin:"",
    github:""
  })
  console.log(userDetails);

  // add file
   const handleFile = (e)=>{
          // console.log(e.target.files[0]);
          setuserdetails({...userDetails,profile:e.target.files[0]})
      }
      useEffect(()=>{
         if (userDetails.profile) {
          setPreview(URL.createObjectURL(userDetails.profile))
         }
      },[userDetails.profile])
      console.log(preview);

      useEffect(()=>{
        if (sessionStorage.getItem("existingUsers")) {
          const user = JSON.parse(sessionStorage.getItem("existingUsers"))
          console.log(user);
          setuserdetails({...userDetails, username:user.username , email:user.email , password:user.password, github:user.github , linkedin:user.linkedin})
          setExistingImg(user.profile)
        }
      },[updateStatus])


      const handleUpdate = async ()=>{
        const {username , email , password , profile , linkedin, github}    = userDetails
        if (!github || !linkedin) {
          toast.info("Enter github and linkedin")
        }else{
          
          const reqBody = new FormData()
            reqBody.append("username", username)
            reqBody.append("email", email)
            reqBody.append("password", password)
            reqBody.append("linkedin", linkedin)
            reqBody.append("github", github)
            preview ? reqBody.append("profile", profile) : reqBody.append("existingImg", existingImg)
            
            const token = sessionStorage.getItem("token")
            if (preview) {

              const reqHeader = {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${token}`
              }
              const result = await updateUserProfileApi(reqBody,reqHeader)
              console.log(result);
              if (result.status == 200) {
                toast.success('Profile Updated Successfully')
                sessionStorage.setItem("existingUsers",JSON.stringify(result.data))
                setUpdateStatus(result)
              }
              
            }else{
              const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            if (result.status == 200) {
              toast.success('Profile Updated Successfully')
              sessionStorage.setItem("existingUsers",JSON.stringify(result.data))
              setUpdateStatus(result)
            }
            const result = await updateUserProfileApi(reqBody,reqHeader)
            console.log(result);
          }
        }
      }
      
    
  
  return (
    <>
    <div className="p-4 shadow" onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
      <div className="d-flex justify-content-between">
      <h4 className='text-success'>Profile</h4>
      <button className='btn' onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text">
      { open == true?<FontAwesomeIcon 
        aria-expanded={open} icon={faAngleUp} size='lg' />:
        <FontAwesomeIcon  icon={faAngleDown} size='lg' />}

        </button>
      </div>
      <Collapse in={open}>
      <div>
      <div className='d-flex justify-content-center align-items-center flex-column'>
        <label htmlFor="profileImage" className='d-flex justify-content-center align-items-center'>
        <input onChange={ (e)=> handleFile(e)} type="file" id='profileImage' className='d-none' />

        {existingImg == "" ?<img src={ preview ? preview :"https://cdn3.iconfinder.com/data/icons/e-commerce-website-2/64/My-account-512.png"} className='' alt="" style={{width:"250px", height:'225px', borderRadius:'50%', marginTop:'10px'}}  />
        :
        <img src={ preview ? preview :`${serverUrl}/upload/${existingImg}`} className='w-75' alt="" />}

        </label>
        <div className='w-100 mt-3'>
          <div className='mb-3'><input type="text" value={userDetails?.github} onChange={(e)=>setuserdetails({...userDetails, github:e.target.value})} placeholder='GitHub' className='form-control' /></div>
          <div className='mb-4'><input type="text" value={userDetails?.linkedin} onChange={(e)=>setuserdetails({...userDetails, linkedin:e.target.value})} placeholder='LinkedIn' className='form-control' /></div>
          <div className='mb-3 text-center'><button onClick={handleUpdate} className='btn btn-success w-75'>Update Profile</button></div>
        </div>

      </div>
      </div>
      </Collapse>
    </div>
    </>
  )
}

export default Profile