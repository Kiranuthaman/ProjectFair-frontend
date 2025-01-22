import React, { useEffect, useState } from 'react'
import photo from '../assets/photo.png'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { homeProjectApi } from '../service/allApi'



function Home() {

  const [islogin , setisLogin] = useState(false)
  const [homeProject, setHomeProject] = useState([])
   
  const getHomeProject = async()=>{
    const result = await homeProjectApi()
    setHomeProject(result.data)
  }

  console.log(homeProject);
  


  useEffect(()=>{
    getHomeProject()
    if(sessionStorage.getItem("token")){
      setisLogin(true)
    }else{
      setisLogin(false)
    }
  },[])

  return (
    <>

    <div className='p-5 bg-success'style={{height:'100vh'}}>
      <div className='container-fluid mt-5'>
      <div className="row d-flex justify-content-center align-items-center">
      <div className="col-md-6">
        <h1 className='text-light' style={{fontSize:'50px'}}>Project Fair</h1>
        <p>One stop destination for all software development projects</p>

       {islogin == false ?  <Link to={'/projects'}> <button className='btn text-light p-1 mt-3'>Get Started  <FontAwesomeIcon icon={faArrowRight} style={{color: "#ffffff",}} /></button></Link> :
        <Link to={'/dashboard'}> <button className='btn text-light p-1 mt-3'>Manage Project  <FontAwesomeIcon icon={faArrowRight} style={{color: "#ffffff",}} /></button></Link>}

      </div>
      <div className="col-md-6 mt-4">
        <img className='w-100 p-3' src={photo} alt="" />
      </div>
     </div>
      </div>
    </div>
    {/* explore our projects */}
     
     <div>
      <h1 className='text-center mt-5'>Explore Our Project</h1>
     <div className='container'>
     <div className="row mt-5">

    { homeProject?.map ((item)=>(
      <div className="col-md-4 "><ProjectCard  project = {item} /></div>
    ))}
     </div>
    </div>
    <Link className='text-decoration-none ' to={'/projects'}><p className='text-danger text-center mt-5 mb-4' >See more projects .....</p></Link>
     </div>
    </>
  )
}

export default Home