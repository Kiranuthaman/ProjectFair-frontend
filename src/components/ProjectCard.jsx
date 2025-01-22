import React from 'react'
import Card from 'react-bootstrap/Card';
import project1 from '../assets/project1.png'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { serverUrl } from '../service/serviceUrl';



function ProjectCard({project}) {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    return (
        <>
            <Card style={{ width: '100%' }} className='shadow border-0 mt-4 mt-md-0'>
                <Card.Img variant="top" style={{height:'200px'}} onClick={handleShow} src={`${serverUrl}/upload/${project.projectImg}`} className='w-100'/>
                <Card.Body>
                    <Card.Title>{project.title}</Card.Title>
                </Card.Body>
            </Card>
       

      <Modal show={show} onHide={handleClose} centered size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <img src={`${serverUrl}/upload/${project.projectImg}`} alt="no image" className='w-100' />
                    </div>
                    <div className="col-md-6">
                        <h3>Description</h3>
                        <p>{project.overview}</p>
                        <h4>Technologies</h4>
                        <p>{project.language}</p>
                    </div>

                </div>
            </div>

        </Modal.Body>
        <Modal.Footer>
            <Link to={project.website} target='_blank'  ><FontAwesomeIcon icon={faGlobe} size='2xl' className='me-3' /></Link>
            <Link to={project.github} target='_blank' ><FontAwesomeIcon icon={faGithub} size='2xl' className='me-3 ms-3' /></Link>
        </Modal.Footer>
      </Modal>
        </>
    )
}

export default ProjectCard