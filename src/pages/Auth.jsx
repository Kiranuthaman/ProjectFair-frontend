import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, requestApi } from '../service/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { lodingResponseContext } from '../context/ContextShare'

function Auth({register}) {
  const {setLoginResponse} = useContext(lodingResponseContext)

  const navigate = useNavigate()


  const [userDetails , setuserDetails] = useState({
    username:"",
    email:"",
    password :""
  })
  console.log(userDetails);

  // register
  const handleRegister = async ()=>{
    const {username,email,password} = userDetails
    if(!username || !email ||!password) {
      toast.info("Fill the form")
    }else{

      const result = await requestApi(userDetails)
      console.log(result);
      if(result.status == 200){
        toast.success('suceesull')

         setuserDetails({
          username:"",
          email:"",
          password:""
         })

         navigate("/login")

      }else if (result.status == 406) {
        toast.error(result.response.status)

      }else{
        toast.error('Something went wrong')
      }
      
    }
  }

  // login

  const handleLogin = async()=> {
       const {email,password} = userDetails;
       if (!email || !password) {
        toast.info('fill the form completely')
       }else{
        const result = await loginApi( {email,password})
       
        if(result.status ==200){
          console.log(result);
          toast.success('Login successful')
          setLoginResponse(true)
          setuserDetails({
            username:"",
            email:"",
            password:""
           })

           sessionStorage.setItem("existingUsers", JSON.stringify(result.data.existingUsers))
           sessionStorage.setItem("token",result.data.token)

           setTimeout(()=>{
            navigate("/")
           },2000)
  
           
         

        }else if (result.status == 406) {
          toast.error(result.response.status)
  
        }else{
          toast.error('Something went wrong')
        }
       }
  }
  
  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8 ">
            <Link className='text-decoration-none' to={'/'}> <h4 className='text-warning'><FontAwesomeIcon icon={faArrowLeft}  /> Back To Home</h4></Link>
            <div className="row bg-success mb-4 rounded shadow-lg ">
              <div className="col-md-6 p-5">
                <img src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="" className='w-100' />
              </div>
              <div className="col-md-6 d-flex justify-content-center flex-column p-5">
                <h4 className='text-center text-light ' ><FontAwesomeIcon icon={faStackOverflow} /> Project Fair</h4>
                
               { !register ? <h5 className='text-light text-center'>Sign into your Account</h5> :
                <h5 className='text-light text-center'>Sign Up to Your Account</h5>}
               { register && <div>
                <input type="text" placeholder='Username' className='form-control mt-3' onChange={(e)=>setuserDetails({...userDetails,username:e.target.value})} />
                </div>}
                <div>
                <input type="text" placeholder='Email ID' className='form-control mt-3' onChange={(e)=>setuserDetails({...userDetails, email:e.target.value})}  />
                </div>
                <div>
                <input type="text" placeholder='PassWord' className='form-control mt-3' onChange={(e)=>setuserDetails({...userDetails, password:e.target.value})}  />
                </div>
               { !register ? <div>
                  <Link to={'/login'}><button className='btn btn-warning w-100 mt-3' onClick={handleLogin}>Login</button></Link>
                
                <p className='mt-3 text-light '>New user? click here to <Link className='text-danger' to={'/register'}>Register</Link> </p>
                </div>
                :
                <div>
                  <button className='btn btn-warning w-100 mt-3' onClick={handleRegister}>Register</button>
               
                <p className='mt-3 text-light '>Already a User? click Here to login <Link className='text-primary' to={'/login'}>Login</Link> </p>
                </div>}
              </div>
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
      <ToastContainer position='top-center' autoClose="2000"  />
    </>
  )
}

export default Auth