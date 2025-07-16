import { useState } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Footer() {
  const [email, setEmail] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastVariant, setToastVariant] = useState('success') // success or danger

  const handleSubmit = (e) => {
    e.preventDefault()

    if (email.includes('@')) {
      setToastMessage('¡Gracias por suscribirte!')
      setToastVariant('success')
    } else {
      setToastMessage('Por favor ingresa un email válido.')
      setToastVariant('danger')
    }
    setShowToast(true)
    setEmail('')

    // Ocultar toast después de 3 segundos
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <footer className='bg-dark text-white py-4'>
      <style>{`
        .footer-social-icon {
          transition: color 0.2s, transform 0.18s;
        }
        .footer-social-icon:hover, .footer-social-icon:focus {
          color: #ff6600 !important;
          transform: scale(1.18) translateY(-2px);
        }
      `}</style>
      <Container>
        <Row className='align-items-center'>
          {/* Redes sociales */}
          <Col md={6} className='mb-3 mb-md-0'>
            <div className='d-flex justify-content-center justify-content-md-start mb-3'>
              <a
                href='https://facebook.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-white mx-2 fs-4 footer-social-icon'
                aria-label='Facebook'
              >
                <FaFacebookF />
              </a>
              <a
                href='https://instagram.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-white mx-2 fs-4 footer-social-icon'
                aria-label='Instagram'
              >
                <FaInstagram />
              </a>
              <a
                href='https://twitter.com'
                target='_blank'
                rel='noopener noreferrer'
                className='text-white mx-2 fs-4 footer-social-icon'
                aria-label='Twitter'
              >
                <FaTwitter />
              </a>
              <a
                href='https://wa.me/5491112345678'
                target='_blank'
                rel='noopener noreferrer'
                className='text-white mx-2 fs-4 footer-social-icon'
                aria-label='WhatsApp'
              >
                <FaWhatsapp />
              </a>
            </div>
          </Col>

          {/* Newsletter */}
          <Col md={6}>
            <Form
              onSubmit={handleSubmit}
              className='d-flex flex-column align-items-center align-items-md-end position-relative'
              style={{ maxWidth: '350px', marginLeft: 'auto' }}
            >
              <div className='d-flex w-100'>
                <Form.Control
                  type='email'
                  placeholder='Tu email'
                  size='sm'
                  className='me-2'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type='submit' variant='outline-light'>
                  Suscribirme
                </Button>
              </div>

              {/* Toast local bootstrap */}
              {showToast && (
                <div
                  className='toast show mt-3 align-items-center border-0'
                  role='alert'
                  aria-live='assertive'
                  aria-atomic='true'
                  style={{
                    minWidth: '100%',
                    background: '#ff6600',
                    color: '#fff',
                    borderRadius: '12px',
                    fontWeight: 600,
                  }}
                >
                  <div className='d-flex'>
                    <div className='toast-body'>{toastMessage}</div>
                    <button
                      type='button'
                      className='btn-close btn-close-white me-2 m-auto'
                      aria-label='Close'
                      onClick={() => setShowToast(false)}
                    ></button>
                  </div>
                </div>
              )}
            </Form>
          </Col>
        </Row>

        <Row className='mt-3'>
          <Col className='text-center'>
            <p className='mb-1'>© 2025 BA Guitars. Todos los derechos reservados.</p>
            <div className='mt-2'>
              <Link to='/contact' className='text-white me-3 text-decoration-underline'>
                Contacto
              </Link>
              <Link to='/faq' className='text-white text-decoration-underline'>
                Preguntas Frecuentes
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
