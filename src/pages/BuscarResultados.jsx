import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import CardProducto from '../components/CardProducto'
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'

function BuscarResultados() {
  const { termino } = useParams()
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [resultados, setResultados] = useState([])

  useEffect(() => {
    setLoading(true)
    fetch('https://68681b84d5933161d70acfae.mockapi.io/products')
      .then(res => res.json())
      .then(data => {
        setProductos(data)
        // Filtrar por nombre (case-insensitive)
        const filtrados = data.filter(p =>
          p.name && p.name.toLowerCase().includes(termino.toLowerCase())
        )
        setResultados(filtrados)
      })
      .catch(() => setResultados([]))
      .finally(() => setLoading(false))
  }, [termino])

  return (
    <Container className='my-5'>
      <Helmet>
        <title>Resultados de búsqueda | BA Guitars</title>
        <meta name='description' content={`Resultados de búsqueda para "${termino}" en BA Guitars.`} />
      </Helmet>
      <h1 className='mb-4 text-center'>Resultados para: <span style={{ color: '#ff6600' }}>{termino}</span></h1>
      {loading ? (
        <div className='d-flex justify-content-center align-items-center' style={{ height: 200 }}>
          <Spinner animation='border' variant='primary' />
        </div>
      ) : resultados.length > 0 ? (
        <Row className='g-4'>
          {resultados.map((producto, idx) => (
            <Col key={producto.id || idx} xs={12} sm={6} md={4} lg={3}>
              <CardProducto producto={{
                id: producto.id || `busqueda-${idx}`,
                marca: producto.name.split(' ')[0],
                nombre: producto.name.toUpperCase(),
                precio: producto.price,
                foto: producto.image,
                stock: producto.stock ?? Math.floor(Math.random() * 10) + 1,
                tipo: producto.category ? producto.category.toLowerCase().includes('guitarra') ? 'guitarra' : producto.category.toLowerCase().includes('amplificador') || producto.category.toLowerCase().includes('amp') ? 'amplificador' : 'accesorio' : 'accesorio',
                descripcion: producto.description ?? '',
              }} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className='text-center my-5'>
          <h3>No se encontraron productos para "{termino}"</h3>
          <Link to='/'>
            <Button variant='dark' style={{ backgroundColor: '#ff6600', borderColor: '#ff6600', marginTop: 24 }}>
              Volver al inicio
            </Button>
          </Link>
        </div>
      )}
    </Container>
  )
}

export default BuscarResultados 