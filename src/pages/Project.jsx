import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { allProjectApi } from '../service/allApi'




function Project() {
  
  const [token , setToken] = useState("")
  const [allproject, setAllProject] = useState([])
  const [searchKey , setSearchKey] = useState("")


  const getAllProject = async()=>{
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem('token')
      const reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization": `Bearer ${token}`
    }
    const result = await allProjectApi(searchKey,reqHeader)
    // console.log(result.data);
    setAllProject(result.data)
    // console.log(allproject);
    
    }
  }
  console.log(token);
  console.log(allproject);
  console.log(searchKey);


  useEffect(()=>{
    getAllProject()
  },[searchKey])
  
  
  

  useEffect(()=>{
    getAllProject()
    if (sessionStorage.getItem('token')) {
      setToken(sessionStorage.getItem('token'))
    }
  },[])




  return (
    <>
    <Header/>
    <h3 className='text-center text-success ' style={{marginTop:'110px'}}>All Projects</h3>
  { !token ? <div className="mt-5">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6 d-flex justify-content-center align-items-center flex-column">
          <img src="https://cdn-icons-gif.flaticon.com/17905/17905775.gif" alt="no image"  className='w-50'/>
          <h5 className='text-center mt-5'>Please <Link to={'/login'}>Login</Link> to see more Projects</h5>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
   </div>
      :
    <div>
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 d-flex ">
            <input onChange={(e)=>setSearchKey(e.target.value)} type="text" placeholder='Technologies' className='form-control shadow '  />
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{color:'lightgray',marginTop:'12px', marginLeft:'-30px'}} />
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
      <div className="container-fluid mb-2 mt-2 mt-md-0 p-mt- p-5">
        <div className="row mt-2 mt-md-0 ">

         { allproject?.map((item)=>(
          <div className="col-md-3 mb-5 "><ProjectCard project={item} /></div>
         )) }

        </div>
      </div>
    </div>}
    </>
  )
}

export default Project