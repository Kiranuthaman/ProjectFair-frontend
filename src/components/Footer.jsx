import { faFacebook, faInstagram, faLinkedin, faStackOverflow, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
    <div className="bg-success w-full container-fluid" >
        <div className="row p-3">
            <div className="col-md-5 mt-4">
                <h4 className='text-white'><FontAwesomeIcon icon={faStackOverflow} /> Project Fair</h4>
                <p className=' d-flex text-align-justify' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum nemo incidunt sunt fuga earum excepturi officiis iure, voluptates, laborum accusamus doloremque obcaecati consequatur saepe repellat eveniet. Placeat, neque hic? Nesciunt.</p>
            </div>
            <div className="col-md-2 mt-4">
            <h4 className='text-white'>Guides</h4>
            <Link to={'/'}><p className='text-black '>Home</p></Link>
            <Link to={'/projects'}><p className='text-black'>Project</p></Link>
            <Link to={'/dashboard'}> <p className='text-black'>DashBoard</p> </Link>
           </div>
            <div className="col-md-2 mt-4">
            <h4 className='text-white'>Links</h4>
            <p>React</p>
            <p>React Bootsrsp</p>
            <p>Bootsawtch</p>

            </div>
            <div className="col-md-3 mt-4">
            <h4 className='text-white'>Contact</h4>
            <div className='d-flex'>
            <input type="text" placeholder='Enter Email' className='form-control' />
            <button className='btn btn-warning ms-1'>Subscribe</button>
            </div>
           
            <div className='d-flex justify-content-between'>
            <FontAwesomeIcon icon={faInstagram} size='2xl' className='text-white mt-4' />
            <FontAwesomeIcon icon={faTwitter} size='2xl' className='text-white mt-4' />
            <FontAwesomeIcon icon={faLinkedin} size='2xl' className='text-white mt-4' />
            <FontAwesomeIcon icon={faFacebook} size='2xl' className='text-white mt-4' />
            </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Footer