import React, { useState } from 'react'
import { Container, Form, Button, Card, Row, Col, InputGroup } from 'react-bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    newsletter: false,
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const [passwords, setPassword] = useState(false)
  const [confirmarPasswords, setConfirmarPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }
    // Obtener usuarios existentes
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
    // Verificar si el email ya está registrado
    if (usuarios.some((u) => u.email === formData.email)) {
      setError('El email ya está registrado.')
      return
    }
    // Crear nuevo usuario
    const nuevoUsuario = {
      nombre: formData.nombre,
      email: formData.email,
      password: formData.password,
      compras: [],
    }
    localStorage.setItem('usuarios', JSON.stringify([...usuarios, nuevoUsuario]))
    // Redirigir al login
    navigate('/login')
  }

  return (
    <>
      <Helmet>
        <title>Registrate | BA Guitars</title>
        <meta
          name='description'
          content='Creá tu cuenta en BA Guitars y accedé a beneficios exclusivos para músicos y amantes de la guitarra.'
        />
      </Helmet>
      <Container fluid className='py-5 d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
        <Row className='justify-content-center w-100'>
          <Col xs={12} sm={10} md={8} lg={5} xl={4} style={{ display: 'flex', justifyContent: 'center' }}>
            <Card className='shadow' style={{ width: '100%', maxWidth: 380, margin: '0 auto' }}>
              <Card.Body className='p-0'>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '40px 0' }}>
                  <h2 className='text-center mb-4'>Registrarse</h2>
                  <Form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 320, margin: '0 auto', textAlign: 'center' }}>
                    <Form.Group className='mb-3' controlId='nombre'>
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        type='text'
                        name='nombre'
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        aria-label='Nombre'
                      />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='email'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                        aria-label='Email'
                      />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='password'>
                      <Form.Label>Contraseña</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={passwords ? 'text' : 'password'}
                          name='password'
                          value={formData.password}
                          onChange={handleChange}
                          required
                          aria-label='Contraseña'
                        />
                        <Button
                          style={{
                            backgroundColor: '#ff6600',
                            borderColor: '#ff6600',
                            color: '#fff',
                            transition: 'background 0.2s, border 0.2s',
                          }}
                          onMouseEnter={e => { e.target.style.backgroundColor = '#e55a00'; e.target.style.borderColor = '#e55a00'; }}
                          onMouseLeave={e => { e.target.style.backgroundColor = '#ff6600'; e.target.style.borderColor = '#ff6600'; }}
                          onClick={() => setPassword(!passwords)}
                          type='button'
                        >
                          <i className={`bi bi-eye${passwords ? '-slash' : ''}`}></i>
                        </Button>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='confirmPassword'>
                      <Form.Label>Repetir Contraseña</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={confirmarPasswords ? 'text' : 'password'}
                          name='confirmPassword'
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                          aria-label='Confirmar contraseña'
                        />
                        <Button
                          style={{
                            backgroundColor: '#ff6600',
                            borderColor: '#ff6600',
                            color: '#fff',
                            transition: 'background 0.2s, border 0.2s',
                          }}
                          onMouseEnter={e => { e.target.style.backgroundColor = '#e55a00'; e.target.style.borderColor = '#e55a00'; }}
                          onMouseLeave={e => { e.target.style.backgroundColor = '#ff6600'; e.target.style.borderColor = '#ff6600'; }}
                          onClick={() => setConfirmarPassword(!confirmarPasswords)}
                          type='button'
                        >
                          <i className={`bi bi-eye${confirmarPasswords ? '-slash' : ''}`}></i>
                        </Button>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group className='mb-4' style={{ textAlign: 'left' }}>
                      <Form.Check
                        type='checkbox'
                        name='newsletter'
                        label='Suscribirse al newsletter'
                        checked={formData.newsletter}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <div aria-live='polite'>
                      {error && <div className='text-danger mb-2'>{error}</div>}
                    </div>
                    <Button variant='primary' type='submit' className='w-100' aria-label='Registrarse'>
                      Registrarse
                    </Button>
                  </Form>
                </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
      {/* Botón volver al inicio */}
      <div className='text-center my-4'>
        <Link to='/'>
          <button
            style={{
              backgroundColor: '#ff6600',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 28px',
              fontWeight: 600,
              fontSize: '1.1rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#e55a00'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#ff6600'
            }}
          >
            Volver al inicio
          </button>
        </Link>
      </div>
    </>
  )
}

export default Register
