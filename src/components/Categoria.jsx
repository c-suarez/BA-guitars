import React, { useState } from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react'
import { obtenerCantidadTotal } from '../util/carritoUtils'
import { useAuth } from '../context/AuthContext'
import { FaUser, FaBars } from 'react-icons/fa'

const Header = () => {
  const [cantidadCarrito, setCantidadCarrito] = useState(0)
  const { user, logout } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    setCantidadCarrito(obtenerCantidadTotal())

    const handleStorageChange = () => {
      setCantidadCarrito(obtenerCantidadTotal())
    }
    window.addEventListener('carritoActualizado', handleStorageChange)
    return () => {
      window.removeEventListener('carritoActualizado', handleStorageChange)
    }
  }, [])

  const handleMouseEnter = () => setShowDropdown(true)
  const handleMouseLeave = () => setShowDropdown(false)

  return (
    <Navbar bg='light' variant='light' expand='lg'>
      <Container fluid className='flex-column'>
        {/* Logo y nombre */}
        <div className='d-flex justify-content-between w-100 align-items-center'>
          <Link to='/' className='d-flex align-items-center text-decoration-none text-dark'>
            <img
              src='/img/logo.jpeg'
              alt='logo'
              style={{
                height: '100%',
                maxHeight: '50px',
                objectFit: 'contain',
              }}
            />
            <Navbar.Brand className='ms-3 mb-0'>BA Guitars</Navbar.Brand>
          </Link>

          {/* Carrito e inicio de sesión */}
          <Nav className='align-items-center'>
            {user && user.email ? (
              <>
                <Navbar.Text className='text-dark me-3'>Bienvenido, {user.email}</Navbar.Text>
                <Nav.Link onClick={logout}>Cerrar sesión</Nav.Link>
              </>
            ) : (
              <div className='d-flex align-items-center'>
                <FaUser className='me-2 text-dark' size={20} />
                <Nav.Link as={Link} to='/login' style={{ fontSize: '1rem' }}>
                  ¡Hola! Iniciá sesión o registrate
                </Nav.Link>
              </div>
            )}

            <Nav.Link as={Link} to='/carrito' title='Ver carrito' className='position-relative'>
              <i className='bi bi-cart' style={{ fontSize: '1.5rem', color: 'black' }}></i>
              {cantidadCarrito > 0 && (
                <span
                  className='position-absolute top-0 start-100 badge rounded-pill bg-danger'
                  style={{
                    transform: 'translate(-60%, 0%)',
                    padding: '0.5rem',
                    fontSize: '0.75rem',
                    lineHeight: '1rem',
                  }}
                >
                  {cantidadCarrito}
                </span>
              )}
            </Nav.Link>
          </Nav>
        </div>

        {/* Menú Categorías debajo del logo */}
        <div className='w-100 mt-2'>
          <Nav onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <NavDropdown
              title={
                <span className='d-flex align-items-center text-dark fw-normal'>
                  <FaBars className='me-2' />
                  Categorías
                </span>
              }
              id='categorias-dropdown'
              show={showDropdown}
            >
              <NavDropdown.Item as={Link} to='/guitarras'>
                Guitarras
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/accesorios'>
                Accesorios
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  )
}

export default Header
