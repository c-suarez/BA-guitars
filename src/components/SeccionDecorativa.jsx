import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function SeccionDecorativa() {
  return (
    <div
      style={{
        backgroundImage: 'url(/img/baner1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        padding: '5rem 0',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
      }}
    >
      {/* Overlay para mejorar legibilidad */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%)',
          zIndex: 1,
        }}
      />

      <Container style={{ position: 'relative', zIndex: 2 }}>
        <Row className='justify-content-center text-center'>
          <Col lg={8} md={10}>
            <h1
              className='mb-4'
              style={{
                fontFamily: 'Bebas Neue, Montserrat, Arial, sans-serif',
                fontSize: '4rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#fff',
                marginBottom: '2rem',
                textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
              }}
            >
              BIENVENIDO A <span style={{ color: '#ff6600' }}>BA</span> GUITARS
            </h1>

            <p
              className='mb-4'
              style={{
                fontFamily: 'Montserrat, Arial, sans-serif',
                fontSize: '1.3rem',
                color: 'rgba(255,255,255,0.95)',
                textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                lineHeight: '1.6',
                fontWeight: '500',
                marginBottom: '2.5rem',
              }}
            >
              Descubrí el arte de la música donde cada nota cuenta una historia y cada instrumento tiene su propia voz
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default SeccionDecorativa
