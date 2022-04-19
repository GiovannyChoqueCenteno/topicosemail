import {useEffect} from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

const Formulario = () => {
    
   
  return (

    <Container className='d-flex justify-content-center '>
        <Outlet />
    </Container>
  )
}

export default Formulario