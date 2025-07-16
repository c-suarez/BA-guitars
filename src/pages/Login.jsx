import React, { useState } from 'react'
import { Container, Form, Button, Card } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Helmet } from 'react-helmet-async'
import BotonNaranja from '../components/BotonNaranja'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const sucess = login(email, password)
    if (sucess) {
      navigate('/')
    } else {
      setError('Credenciales incorrectas. Inténtalo de nuevo.')
    }
  }

  return (
    <>
      <Helmet>
        <title>Iniciar Sesión | BA Guitars</title>
        <meta
          name='description'
          content='Accedé a tu cuenta para comprar guitarras y accesorios en BA Guitars. ¡Tu música, tu estilo!'
        />
      </Helmet>
      <Container className='d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
        <div className='text-center'>
          <Card style={{ width: '400px' }} className='p-4 mb-3'>
            <Card.Body>
              <h2 className='text-center mb-4'>Iniciar Sesión</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId='email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label='Email'
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='password'>
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    aria-label='Contraseña'
                  />
                </Form.Group>
                <div aria-live='polite'>{error && <div className='text-danger mb-2'>{error}</div>}</div>
                <BotonNaranja type='submit' className='w-100' aria-label='Iniciar sesión'>
                  Iniciar sesión
                </BotonNaranja>
              </Form>
              <div className='mt-3'>
                <span>¿No tenés cuenta? </span>
                <Link to='/register' style={{ color: '#ff6600', fontWeight: 600 }}>
                  Registrate acá
                </Link>
              </div>
            </Card.Body>
          </Card>

          <div className='text-muted' style={{ fontSize: '0.9rem' }}>
            <p className='mb-1'>
              <strong>Email:</strong> admin@admin
            </p>
            <p className='mb-0'>
              <strong>Pass:</strong> admin
            </p>
          </div>
        </div>
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

export default Login
