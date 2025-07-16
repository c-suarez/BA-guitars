import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap'

function SeccionesCategoria() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const secciones = [
    {
      titulo: 'GUITARRAS',
      descripcion: 'Descubrí nuestra colección de guitarras eléctricas y acústicas',
      imagen: '/img/guitarras.jpg',
      ruta: '/guitarras',
      color: '#ff6600',
    },
    {
      titulo: 'AMPLIFICADORES',
      descripcion: 'Encontrá tu sonido con los mejores amplificadores',
      imagen: '/img/amps.jpg',
      ruta: '/amplificadores',
      color: '#212529',
    },
    {
      titulo: 'ACCESORIOS',
      descripcion: 'Todo lo que necesitás para tu instrumento',
      imagen: '/img/pedales.jpg',
      ruta: '/accesorios',
      color: '#dc3545',
    },
  ]

  return (
    <Container className='my-5'>
      <Row>
        {secciones.map((seccion, index) => (
          <Col key={index} lg={4} md={6} className='mb-4'>
            <Link to={seccion.ruta} className='text-decoration-none'>
              <Card
                className='h-100 shadow-lg border-0 overflow-hidden'
                style={{
                  borderRadius: '15px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)'
                }}
              >
                {/* Imagen de fondo completa */}
                <div
                    style={{
                    height: isMobile ? '300px' : '350px',
                    backgroundImage: `url(${seccion.imagen})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    position: 'relative',
                    }}
                    onError={(e) => {
                    e.target.style.backgroundImage = `url(https://via.placeholder.com/400x350/${seccion.color.replace(
                        '#',
                        ''
                    )}/ffffff?text=${seccion.titulo})`
                  }}
                >
                  {/* Overlay semi-transparente para el texto */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                      padding: '2rem 1.5rem 1.5rem',
                      color: 'white',
                    }}
                  >
                    <h3
                      className='fw-bold mb-2'
                      style={{
                        fontFamily: 'Bebas Neue, Montserrat, Arial, sans-serif',
                        fontSize: '2.2rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'white',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                    }}
                  >
                    {seccion.titulo}
                    </h3>
                    <p
                      className='mb-0'
                    style={{
                      fontFamily: 'Montserrat, Arial, sans-serif',
                      fontSize: '0.9rem',
                      lineHeight: '1.4',
                        color: 'rgba(255,255,255,0.9)',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                    }}
                  >
                    {seccion.descripcion}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default SeccionesCategoria
