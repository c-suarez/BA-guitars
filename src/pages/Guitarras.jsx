import { useState, useEffect, useMemo, useContext } from 'react'
import CardProducto from '../components/CardProducto'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import AsideFiltros from '../components/AsideFiltros'
import { filtrarProductos } from '../util/filtrarProductos'
import ProductoContext from '../context/ProductoContext'
import Paginador from '../components/Paginador'
import usePaginacion from '../util/usePaginacion'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

function Guitarras() {
  const [guitarras, setGuitarras] = useState([])
  const [loading, setLoading] = useState(true)
  const { setProductos } = useContext(ProductoContext)

  const [busqueda, setBusqueda] = useState('')
  const [filtroMarca, setFiltroMarca] = useState('')
  const [filtroStock, setFiltroStock] = useState('')
  const [orden, setOrden] = useState('')

  const marcas = useMemo(() => {
    const todas = guitarras.map((b) => b.marca)
    return [...new Set(todas)].sort()
  }, [guitarras])

  const productosFiltrados = useMemo(
    () =>
      filtrarProductos(guitarras, {
        busqueda,
        filtroMarca,
        filtroStock,
        orden,
      }),
    [guitarras, busqueda, filtroMarca, filtroStock, orden]
  )

  // Usar el hook de paginación
  const { productosPaginados, infoPaginacion, cambiarPagina, resetearPaginacion } = usePaginacion(
    productosFiltrados,
    12
  )

  // Resetear paginación cuando cambian los filtros
  useEffect(() => {
    resetearPaginacion()
  }, [busqueda, filtroMarca, filtroStock, orden, resetearPaginacion])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://68681b84d5933161d70acfae.mockapi.io/products')
        const data = await response.json()
        console.log('Datos API:', data)

        const soloGuitarras = data.filter((d) => d.category && d.category.toLowerCase() === 'guitarras')

        const normalizados = soloGuitarras.map((d, idx) => ({
          id: d.id ? `${d.id}` : `guitarra-${idx}`,
          marca: d.name.split(' ')[0],
          nombre: d.name.toUpperCase(),
          precio: d.price,
          foto: d.image,
          stock: d.stock ?? Math.floor(Math.random() * 20) + 1, // Stock random si falta
          tipo: 'guitarra',
          descripcion: d.description ?? '',
        }))

        setGuitarras(normalizados)
        setProductos(normalizados)
      } catch (error) {
        console.error('Error al cargar guitarras:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [setProductos])

  return (
    <>
      <Helmet>
        <title>Guitarras | BA Guitars</title>
        <meta
          name='description'
          content='Explorá nuestro catálogo de guitarras eléctricas, acústicas y clásicas. Las mejores marcas y precios en BA Guitars.'
        />
      </Helmet>
      <Container fluid className='my-5'>
        <h1 className='d-flex justify-content-center align-items-center mb-4'>Guitarras</h1>
        {loading ? (
          <div className='d-flex justify-content-center align-items-center' style={{ height: '200px' }}>
            <Spinner animation='border' variant='primary' />
          </div>
        ) : (
          <Row>
            <Col xs={12} md={3}>
              <AsideFiltros
                marcas={marcas}
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                filtroMarca={filtroMarca}
                setFiltroMarca={setFiltroMarca}
                filtroStock={filtroStock}
                setFiltroStock={setFiltroStock}
                orden={orden}
                setOrden={setOrden}
              />
            </Col>
            <Col xs={12} md={9}>
              <Row className='g-4'>
                {Array.isArray(productosPaginados) &&
                  productosPaginados.map((producto, index) => (
                    <Col key={producto.id ?? index} xs={12} sm={6} md={4} lg={3} xl={3}>
                      <CardProducto producto={producto} />
                    </Col>
                  ))}
              </Row>

              {/* Información de paginación */}
              {infoPaginacion.hayProductos && (
                <div
                  className='d-flex justify-content-center align-items-center mt-3 mb-2'
                  style={{ minHeight: '32px' }}
                >
                  <small
                    className='text-muted text-center w-100'
                    style={{ fontSize: '1.08rem', letterSpacing: '0.01em' }}
                  >
                    Mostrando {infoPaginacion.inicio} - {infoPaginacion.fin} de {infoPaginacion.totalProductos}{' '}
                    productos
                  </small>
                </div>
              )}

              {/* Componente de paginación */}
              <Paginador
                productosPorPagina={infoPaginacion.productosPorPagina}
                totalProductos={infoPaginacion.totalProductos}
                paginaActual={infoPaginacion.paginaActual}
                onCambiarPagina={cambiarPagina}
              />
            </Col>
          </Row>
        )}
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

export default Guitarras
