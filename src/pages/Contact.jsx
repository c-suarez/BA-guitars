import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function Contact() {
  const mapRef = useRef(null)

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    // Función para cargar Google Maps
    const loadGoogleMaps = () => {
      // Coordenadas del local ficticio (Buenos Aires, Argentina)
      const storeLocation = { lat: -34.6026, lng: -58.3863 } // Talcahuano 333, Buenos Aires

      const map = new window.google.maps.Map(mapRef.current, {
        center: storeLocation,
        zoom: 15,
        styles: [
          {
            featureType: 'poi.business',
            stylers: [{ visibility: 'off' }],
          },
        ],
      })

      // Marcador del local
      new window.google.maps.Marker({
        position: storeLocation,
        map: map,
        title: 'BA Guitars - Tienda Principal',
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
          scaledSize: new window.google.maps.Size(40, 40),
        },
      })

      // InfoWindow con información del local
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; max-width: 200px;">
            <h5 style="margin: 0 0 5px 0; color: #dc3545;">BA Guitars</h5>
            <p style="margin: 5px 0; font-size: 14px;">
              <strong>Dirección:</strong><br>
              Talcahuano 333<br>
              Buenos Aires, Argentina
            </p>
            <p style="margin: 5px 0; font-size: 14px;">
              <strong>Horarios:</strong><br>
              Lun-Vie: 9:00 - 18:00<br>
              Sáb: 9:00 - 14:00
            </p>
          </div>
        `,
      })

      // Mostrar infoWindow al hacer clic en el marcador
      map.addListener('click', () => {
        infoWindow.open(map, null)
      })
    }

    // Cargar Google Maps API
    if (!window.google) {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap`
      script.async = true
      script.defer = true
      window.initMap = loadGoogleMaps
      document.head.appendChild(script)
    } else {
      loadGoogleMaps()
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    alert('¡Gracias por tu mensaje! Te responderemos pronto.')
  }

  return (
    <>
      <Helmet>
        <title>Contacto | BA Guitars</title>
        <meta
          name='description'
          content='¿Tenés dudas o consultas? Contactate con el equipo de BA Guitars y te ayudamos a encontrar tu instrumento ideal.'
        />
      </Helmet>

      <Container fluid className='py-4'>
        <h2 className='text-center mb-4'>Contacto</h2>

        <Row className='justify-content-center mb-5'>
          <Col xs={12} md={10} lg={8}>
            <div className='text-center mb-4'>
              <h4 className='text-muted'>¿Tenés dudas o consultas?</h4>
              <p className='lead'>Estamos acá para ayudarte a encontrar tu instrumento ideal</p>
            </div>
          </Col>
        </Row>

        <Row className='justify-content-center'>
          {/* Información de contacto */}
          <Col xs={12} md={4} className='mb-4'>
            <Card className='h-100 shadow-sm'>
              <Card.Body className='text-center'>
                <h5 className='card-title mb-4' style={{ color: '#ff6600', fontWeight: '600' }}>
                  Información de Contacto
                </h5>

                <div className='mb-4'>
                  <h6 className='text-muted' style={{ fontWeight: '600' }}>
                    Dirección
                  </h6>
                  <p className='mb-0'>
                    Talcahuano 333
                    <br />
                    Buenos Aires, Argentina
                    <br />
                    C1013AAE
                  </p>
                </div>

                <div className='mb-4'>
                  <h6 className='text-muted' style={{ fontWeight: '600' }}>
                    Teléfono
                  </h6>
                  <p className='mb-0'>
                    <a href='tel:+541123456789' className='text-decoration-none' style={{ color: '#ff6600' }}>
                      +54 11 2345-6789
                    </a>
                  </p>
                </div>

                <div className='mb-4'>
                  <h6 className='text-muted' style={{ fontWeight: '600' }}>
                    Email
                  </h6>
                  <p className='mb-0'>
                    <a href='mailto:info@baguitars.com' className='text-decoration-none' style={{ color: '#ff6600' }}>
                      info@baguitars.com
                    </a>
                  </p>
                </div>

                <div className='mb-4'>
                  <h6 className='text-muted' style={{ fontWeight: '600' }}>
                    Horarios
                  </h6>
                  <p className='mb-0'>
                    <strong>Lunes a Viernes:</strong> 9:00 - 18:00
                    <br />
                    <strong>Sábados:</strong> 9:00 - 14:00
                    <br />
                    <strong>Domingos:</strong> Cerrado
                  </p>
                </div>

                <div>
                  <h6 className='text-muted' style={{ fontWeight: '600' }}>
                    Cómo llegar
                  </h6>
                  <p className='mb-0'>
                    <strong>Subte:</strong> Línea D - Estación Tribunales
                    <br />
                    <strong>Colectivo:</strong> 5, 6, 7, 10, 17, 24, 26, 29, 39, 60, 67, 75, 99, 100, 102, 115, 124,
                    132, 140, 146, 150, 180
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Formulario de contacto */}
          <Col xs={12} md={4} className='mb-4'>
            <Card className='h-100 shadow-sm'>
              <Card.Body>
                <h5 className='card-title mb-4 text-center' style={{ color: '#ff6600', fontWeight: '600' }}>
                  Enviar Mensaje
                </h5>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className='mb-3'>
                    <Form.Label>Nombre completo</Form.Label>
                    <Form.Control type='text' placeholder='Tu nombre' required />
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' placeholder='tu@email.com' required />
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Label>Asunto</Form.Label>
                    <Form.Select required>
                      <option value=''>Seleccionar asunto</option>
                      <option value='consulta'>Consulta general</option>
                      <option value='producto'>Consulta sobre producto</option>
                      <option value='envio'>Consulta sobre envío</option>
                      <option value='devolucion'>Devolución o cambio</option>
                      <option value='otro'>Otro</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Label>Mensaje</Form.Label>
                    <Form.Control as='textarea' rows={4} placeholder='Escribí tu mensaje aquí...' required />
                  </Form.Group>

                  <Button
                    type='submit'
                    className='w-100'
                    style={{
                      backgroundColor: '#ff6600',
                      borderColor: '#ff6600',
                      color: '#fff',
                      fontWeight: '600',
                      letterSpacing: '0.02em',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#e55a00'
                      e.target.style.borderColor = '#e55a00'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#ff6600'
                      e.target.style.borderColor = '#ff6600'
                    }}
                  >
                    Enviar Mensaje
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Mapa */}
          <Col xs={12} md={4} className='mb-4'>
            <Card className='h-100 shadow-sm'>
              <Card.Body>
                <h5 className='card-title mb-4 text-center' style={{ color: '#ff6600', fontWeight: '600' }}>
                  Ubicación
                </h5>
                <div
                  ref={mapRef}
                  style={{
                    height: '300px',
                    width: '100%',
                    borderRadius: '8px',
                    border: '1px solid #dee2e6',
                  }}
                />
                <div className='text-center mt-3'>
                  <small className='text-muted'>Hacé clic en el marcador para ver más información</small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Sección adicional */}
        <Row className='justify-content-center mt-5'>
          <Col xs={12} md={8}>
            <Card className='bg-light'>
              <Card.Body className='text-center'>
                <h5 style={{ color: '#ff6600', fontWeight: '600' }}>¿Por qué elegir BA Guitars?</h5>
                <Row>
                  <Col xs={12} md={4} className='mb-3'>
                    <h6>Amplia Selección</h6>
                    <small className='text-muted'>Guitarras, bajos y accesorios de las mejores marcas</small>
                  </Col>
                  <Col xs={12} md={4} className='mb-3'>
                    <h6>Envío Gratis</h6>
                    <small className='text-muted'>Envío sin cargo en compras superiores a $50.000</small>
                  </Col>
                  <Col xs={12} md={4} className='mb-3'>
                    <h6>Garantía</h6>
                    <small className='text-muted'>Todos nuestros productos incluyen garantía oficial</small>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

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
      </Container>
    </>
  )
}

export default Contact
