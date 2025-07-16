import React from 'react'
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useEffect, useState, useContext } from 'react'
import { obtenerCantidadTotal } from '../util/carritoUtils'
import { useAuth } from '../context/AuthContext'
import { FaUser, FaBars } from 'react-icons/fa'
import ProductoContext from '../context/ProductoContext'
import { useRef } from 'react'

const Header = () => {
  const [cantidadCarrito, setCantidadCarrito] = useState(0)
  const { user, logout } = useAuth()
  const [busqueda, setBusqueda] = useState('')
  const navigate = useNavigate()
  const { productos } = useContext(ProductoContext)
  const [sugerencias, setSugerencias] = useState([])
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false)
  const inputRef = useRef()

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

  // Filtrar sugerencias al escribir
  useEffect(() => {
    if (busqueda.trim().length >= 2) {
      const texto = busqueda.trim().toLowerCase()
      const sugeridas = productos.filter((p) => (p.name || p.nombre || '').toLowerCase().includes(texto)).slice(0, 6)
      setSugerencias(sugeridas)
      setMostrarSugerencias(true)
    } else {
      setSugerencias([])
      setMostrarSugerencias(false)
    }
  }, [busqueda, productos])

  // Cerrar sugerencias al hacer click fuera
  useEffect(() => {
    const handleClick = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setMostrarSugerencias(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header>
      <style>
        {`
          .dropdown-item:hover, .dropdown-item:focus {
            background-color: #ff6600 !important;
            color: white !important;
          }
          .dropdown-item.active, .dropdown-item:active {
            background-color: #e55a00 !important;
            color: white !important;
          }
          .contact-btn {
            background-color: #ff6600 !important;
            border-color: #ff6600 !important;
            color: #fff !important;
            transition: all 0.3s ease !important;
          }
          .contact-btn:hover {
            background-color: #212529 !important;
            border-color: #212529 !important;
            color: #fff !important;
          }
          .buscador-input:focus {
            border-color: #ff6600 !important;
            box-shadow: 0 0 0 0.2rem rgba(255, 102, 0, 0.25) !important;
            outline: none !important;
          }
          /* Forzar el fondo blanco del menú desplegable de categorías */
          #categorias-dropdown .dropdown-menu {
            background-color: #fff !important;
            border: 1px solid #dee2e6 !important;
            box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.075);
          }
          #categorias-dropdown .dropdown-item {
            color: #212529 !important;
          }
          @media (max-width: 576px) {
            .header-row-mobile {
              display: flex !important;
              flex-direction: column !important;
              align-items: stretch !important;
              gap: 0 !important;
              justify-content: flex-start !important;
            }
            .header-top-row {
              display: flex !important;
              flex-direction: row !important;
              justify-content: space-between !important;
              align-items: center !important;
              width: 100% !important;
            }
            .header-buscador {
              width: 100% !important;
              margin-bottom: 0 !important;
            }
            .header-buscador form {
              width: 100% !important;
              min-width: 0 !important;
              max-width: 100% !important;
            }
          }
          @media (min-width: 577px) {
            .header-row-mobile {
              display: grid !important;
              grid-template-columns: auto 1fr auto !important;
              align-items: center !important;
              gap: 0 !important;
              justify-content: stretch !important;
            }
            .header-top-row {
              display: contents !important;
            }
            .header-categorias-contacto {
              grid-column: 1;
              width: auto !important;
              margin-bottom: 0 !important;
              margin-right: 0 !important;
              justify-content: flex-start !important;
            }
            .header-buscador {
              grid-column: 2;
              flex: 1 1 0 !important;
              display: flex !important;
              justify-content: center !important;
              margin: 0 !important;
              width: 100% !important;
              position: static !important;
              transform: none !important;
            }
            .header-buscador form {
              min-width: 260px !important;
              max-width: 540px !important;
              width: 100% !important;
            }
            .header-contacto-desktop {
              grid-column: 3;
              justify-self: end !important;
              margin-left: 0 !important;
              display: flex !important;
              align-items: center !important;
              width: auto !important;
            }
          }
        `}
      </style>
      <Navbar bg='light' variant='light' expand='lg'>
        <Container fluid className='flex-column'>
          <nav aria-label='Navegación principal' className='w-100'>
        {/* Logo y nombre */}
            <div
              className='d-flex justify-content-between w-100 align-items-center flex-wrap flex-md-nowrap'
              style={{ minHeight: 60 }}
            >
              <div className='d-flex align-items-center'>
          <Link
                  to='/'
                  className='d-flex align-items-center text-decoration-none text-dark'
                  aria-label='Ir a la página principal'
          >
            <img
                    src='/img/logo.jpeg'
                    alt='Logo de BA Guitars'
              style={{
                      height: '100%',
                      maxHeight: '50px',
                      objectFit: 'contain',
                    }}
                  />
                  <Navbar.Brand className='ms-3 mb-0'></Navbar.Brand>
          </Link>
              </div>
          {/* Carrito e inicio de sesión */}
              <div className='d-flex align-items-center justify-content-end flex-nowrap gap-2' style={{ minWidth: 0 }}>
            {user && user.email ? (
              <>
                    <Navbar.Text className='text-dark me-2 text-truncate' style={{ maxWidth: 120, fontSize: '1rem' }}>
                  Bienvenido, {user.email}
                </Navbar.Text>
                    <Nav.Link as={Link} to='/perfil' className='me-2' aria-label='Ir al perfil'>
                      <FaUser className='me-1' aria-hidden='true' /> Perfil
                    </Nav.Link>
                    {user.email === 'admin@admin' && (
                      <Nav.Link as={Link} to='/editproductos' className='me-2' aria-label='Panel de administración'>
                        <i className='bi bi-gear-fill me-1' aria-hidden='true'></i>
                        Admin
                      </Nav.Link>
                    )}
                    <Nav.Link onClick={logout} className='me-2' aria-label='Cerrar sesión'>
                      Cerrar sesión
                    </Nav.Link>
              </>
            ) : (
                  <div className='d-flex align-items-center me-2'>
                    <FaUser className='me-2 text-dark icono-animado' size={20} aria-hidden='true' />
                <Nav.Link
                  as={Link}
                      to='/login'
                      style={{ fontSize: '1rem' }}
                      aria-label='Iniciar sesión o registrarse'
                >
                      <span style={{ color: '#ff6600' }}>¡Hola!</span> Iniciá sesión o registrate
                </Nav.Link>
              </div>
            )}
            <Nav.Link
              as={Link}
                  to='/carrito'
                  title='Ver carrito'
                  aria-label='Ver carrito'
                  className='position-relative p-0 ms-2 icono-animado'
                >
                  <i
                    className='bi bi-cart-fill'
                    style={{ fontSize: '1.5rem', color: '#343a40' }}
                    aria-hidden='true'
              ></i>
              {cantidadCarrito > 0 && (
                <span
                      className='position-absolute top-0 start-100 badge rounded-pill'
                  style={{
                        transform: 'translate(-60%, 0%)',
                        padding: '0.5rem',
                        fontSize: '0.75rem',
                        lineHeight: '1rem',
                        backgroundColor: '#ff6600',
                        color: '#fff',
                      }}
                      aria-label={`Carrito con ${cantidadCarrito} productos`}
                >
                  {cantidadCarrito}
                </span>
              )}
            </Nav.Link>
              </div>
        </div>
          </nav>
          {/* Menú Categorías, Buscador y Contacto debajo del logo */}
          {/* MOBILE: Fila única con categorías, buscador y contactanos */}
          <div
            className='w-100 mt-2 py-2 d-flex d-md-none justify-content-between align-items-center'
            style={{ gap: '0.5rem' }}
          >
            <div className='d-flex flex-row align-items-center'>
          <NavDropdown
            title={
                  <span className='d-flex align-items-center text-dark fw-semibold'>
                    <FaBars className='me-2' />
                Categorías
              </span>
            }
                id='categorias-dropdown-mobile'
                className='no-caret'
                menuVariant='light'
                align='start'
              >
                <NavDropdown.Item as={Link} to='/guitarras'>
                  Guitarras
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/amplificadores'>
                  Amplificadores
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/accesorios'>
                  Accesorios
                </NavDropdown.Item>
              </NavDropdown>
            </div>
            <form
              className='d-flex align-items-center'
              style={{ maxWidth: 180 }}
              onSubmit={(e) => {
                e.preventDefault()
                if (busqueda.trim()) {
                  navigate(`/buscar/${encodeURIComponent(busqueda.trim())}`)
                }
              }}
            >
              <input
                type='search'
                className='form-control text-center'
                placeholder='Buscar'
                aria-label='Buscar productos'
                style={{
                  borderRadius: '8px 0 0 8px',
                  fontSize: '0.95rem',
                  maxWidth: 100,
                  minWidth: 60,
                  height: 36,
                  borderRight: 'none',
                  padding: '0 0.5rem',
                }}
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <Button
                type='submit'
                style={{
                  backgroundColor: '#ff6600',
                  borderColor: '#ff6600',
                  color: '#fff',
                  borderRadius: '0 8px 8px 0',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  height: 36,
                  minWidth: 48,
                  maxWidth: 60,
                  padding: '0 0.5rem',
                  transition: 'all 0.2s',
                }}
                disabled={!busqueda.trim()}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#e55a00'
                  e.target.style.borderColor = '#e55a00'
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#ff6600'
                  e.target.style.borderColor = '#ff6600'
                }}
              >
                <span className='d-none d-sm-inline'>Buscar</span>
                <span className='d-inline d-sm-none'>
                  <i className='bi bi-search'></i>
                </span>
              </Button>
            </form>
            <div className='d-flex align-items-center'>
              <Link to='/contact'>
                <Button
                  variant='dark'
                  size='sm'
                  className='contact-btn button-animado'
                  style={{ height: 36, fontSize: '0.95rem', minWidth: 80 }}
                >
                  Contáctanos
                </Button>
              </Link>
            </div>
          </div>

          {/* DESKTOP: Grid de tres columnas (categorías, buscador, contactanos) */}
          <div
            className='w-100 mt-2 py-2 d-none d-md-grid'
            style={{ gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: 0 }}
          >
            <div className='d-flex flex-row align-items-center'>
              <NavDropdown
                title={
                  <span className='d-flex align-items-center text-dark fw-semibold'>
                    <FaBars className='me-2' />
                    Categorías
                  </span>
                }
                id='categorias-dropdown-desktop'
                className='no-caret'
                menuVariant='light'
                align='start'
              >
                <NavDropdown.Item as={Link} to='/guitarras'>
              Guitarras
            </NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/amplificadores'>
                  Amplificadores
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/accesorios'>
              Accesorios
            </NavDropdown.Item>
          </NavDropdown>
            </div>
            <div className='d-flex justify-content-center position-relative' ref={inputRef} style={{ width: '100%' }}>
              <div style={{ position: 'relative', display: 'flex', width: '100%', maxWidth: 540, minWidth: 260 }}>
                <form
                  className='d-flex flex-grow-1 justify-content-center'
                  style={{ width: '100%' }}
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (busqueda.trim()) {
                      navigate(`/buscar/${encodeURIComponent(busqueda.trim())}`)
                      setMostrarSugerencias(false)
                    }
                  }}
                  role='search'
                  aria-label='Buscar productos'
                >
                  <label htmlFor='buscador-header' className='visually-hidden'>
                    Buscar productos
                  </label>
                  <input
                    id='buscador-header'
                    type='search'
                    className='form-control text-center buscador-input'
                    placeholder='¿Qué estás buscando?'
                    aria-label='Buscar productos'
                    style={{
                      borderRadius: '8px 0 0 8px',
                      fontSize: '1rem',
                      maxWidth: 500,
                      minWidth: 220,
                      height: 44,
                      borderRight: 'none',
                    }}
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    onFocus={() => busqueda.trim().length >= 2 && setMostrarSugerencias(true)}
                  />
                  <Button
                    type='submit'
                    style={{
                      backgroundColor: '#ff6600',
                      borderColor: '#ff6600',
                      color: '#fff',
                      borderRadius: '0 8px 8px 0',
                      fontWeight: 600,
                      fontSize: '1rem',
                      height: 44,
                      minWidth: 90,
                      transition: 'all 0.2s',
                    }}
                    disabled={!busqueda.trim()}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#e55a00'
                      e.target.style.borderColor = '#e55a00'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#ff6600'
                      e.target.style.borderColor = '#ff6600'
                    }}
                  >
                    Buscar
                  </Button>
                </form>
                {/* Sugerencias */}
                {mostrarSugerencias && sugerencias.length > 0 && (
                  <ul
                    style={{
                      position: 'absolute',
                      top: 48,
                      left: 0,
                      width: '100%', // Ahora solo ocupa el ancho del input+botón
                      minWidth: 0,
                      maxWidth: '100%',
                      zIndex: 1000,
                      background: '#fff',
                      borderRadius: 8,
                      boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                      margin: 0,
                      padding: 0,
                      listStyle: 'none',
                      border: '1px solid #eee',
                      maxHeight: 320,
                      overflowY: 'auto',
                    }}
                  >
                    {sugerencias.map((p, idx) => (
                      <li
                        key={p.id || idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          padding: '10px 16px',
                          cursor: 'pointer',
                          borderBottom: idx < sugerencias.length - 1 ? '1px solid #f2f2f2' : 'none',
                          transition: 'background 0.15s',
                        }}
                        onClick={() => {
                          // Navegar al detalle según tipo
                          let ruta = '/guitarras/' + (p.id || idx)
                          if (p.tipo && p.tipo.toLowerCase().includes('accesorio')) {
                            ruta = '/accesorios/' + (p.id || idx)
                          } else if (
                            p.tipo &&
                            (p.tipo.toLowerCase().includes('amplificador') || p.tipo.toLowerCase().includes('amp'))
                          ) {
                            ruta = '/amplificadores/' + (p.id || idx)
                          }
                          navigate(ruta)
                          setMostrarSugerencias(false)
                        }}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        <img
                          src={p.foto || p.image || 'https://via.placeholder.com/40x40?text=No+Img'}
                          alt={p.nombre || p.name}
                          style={{
                            width: 40,
                            height: 40,
                            objectFit: 'cover',
                            borderRadius: 6,
                            border: '1px solid #eee',
                          }}
                        />
                        <span style={{ fontWeight: 600, fontSize: '1rem', color: '#222' }}>{p.nombre || p.name}</span>
                        <span style={{ color: '#ff6600', fontWeight: 600, marginLeft: 'auto', fontSize: '1rem' }}>
                          ${p.precio || p.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className='d-flex align-items-center justify-content-end'>
              <Link to='/contact'>
                <Button variant='dark' size='sm' className='contact-btn button-animado'>
                  Contáctanos
                </Button>
              </Link>
            </div>
        </div>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header
