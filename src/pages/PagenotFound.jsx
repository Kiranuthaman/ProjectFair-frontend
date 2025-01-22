import React from 'react'
import { Link } from 'react-router-dom'

function PagenotFound() {
  return (
    <><div className="container-fluid p-5">
        <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8 d-flex align-items-center justify-content-center flex-column">
                <img className='w-50' src="https://cdn.dribbble.com/users/1175431/screenshots/6188233/404-error-dribbble-800x600.gif" alt="" />
                <h1>Look like you're lost  </h1>
                <h4 >This Page you are looking is unavailable</h4>
                <Link to={'./'}><button className='btn btn-success rounded-0 mt-4' > Go Home</button>
                </Link>
            </div>
            <div className="col-md-2"></div>
        </div>
    </div>
    </>
  )
}

export default PagenotFound