import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Container, Row } from 'react-bootstrap'
import MyProject from '../components/MyProject'
import Profile from '../components/Profile'

function Dashboard() {
   const [User , setUser ]=useState("")
    
      useEffect(()=>{
     const storedUser = sessionStorage.getItem("existingUsers")
     if (storedUser) {
      setUser(JSON.parse(storedUser))
     }
      },[])
 

  return (

    
    <>
    <Header/>
   <div className="p-5 mb-2 " style={{marginTop:'80px'}} >
   <h3 className='mt-4'>Welcome <span className='text-warning'>{User ? User.username : "User" }</span></h3>
    <Container className='mb-5'>
      <Row className='mt-5'>
        <Col sm={12} md={8} ><MyProject/></Col>
        <Col sm={12} md={4}><Profile/></Col>
      </Row>
    </Container>
   </div>


    </>
  )
}

export default Dashboard