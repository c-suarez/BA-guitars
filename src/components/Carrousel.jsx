import { useState, useEffect } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Card, Badge, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { agregarAlCarrito, obtenerCarrito } from '../util/carritoUtils'
import Swal from 'sweetalert2'

function Carrousel() {
  const [productosDestacados, setProductosDestacados] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('https://68681b84d5933161d70acfae.mockapi.io/products')
        const data = await response.json()

        // Tomar los primeros 10 productos y agregar descuentos aleatorios
        const destacados = data.slice(0, 10).map((producto, index) => {
          console.log('Producto de API:', producto) // Debug: ver estructura del producto
          const descuento = Math.floor(Math.random() * 21) + 10 // 10% a 30%

          // Determinar tipo para id temporal
          let tipo = (producto.category || '').toLowerCase()
          let idTemporal = ''
          if (
            tipo.includes('accesorio') ||
            tipo.includes('pedal') ||
            tipo.includes('funda') ||
            tipo.includes('cuerda')
          ) {
            idTemporal = `accesorio-${index}`
          } else if (tipo.includes('amplificador') || tipo.includes('amp')) {
            idTemporal = `amplificador-${index}`
          } else {
            idTemporal = `guitarra-${index}`
          }

          // Asegurar que cada producto tenga un ID único y consistente con las páginas
          const productoConId = {
            ...producto,
            id: producto.id || idTemporal,
            precioOriginal: producto.price,
            precioDescuento: Math.round(producto.price * (1 - descuento / 100)),
            descuento: descuento,
          }

          console.log('Producto con ID:', productoConId.id) // Debug: verificar ID
          return productoConId
        })

        setProductosDestacados(destacados)
      } catch (error) {
        console.error('Error al cargar productos destacados:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProductos()
  }, []) // Dependencias vacías para que solo se ejecute una vez

  const handleAgregarAlCarrito = (producto, index) => {
    // Generar stock aleatorio si no existe
    const stockDisponible = producto.stock ?? Math.floor(Math.random() * 20) + 1

    const productoNormalizado = {
      id: producto.id, // Usar el ID que ya está garantizado
      marca: producto.name.split(' ')[0],
      nombre: producto.name.toUpperCase(),
      precio: producto.precioDescuento, // Usar precio con descuento
      precioOriginal: producto.precioOriginal, // Incluir precio original
      descuento: producto.descuento, // Incluir porcentaje de descuento
      foto: producto.image,
      stock: stockDisponible, // Usar el stock generado
      tipo: producto.category,
      descripcion: producto.description ?? '',
    }

    console.log('Producto a agregar:', productoNormalizado)
    console.log('ID del producto:', productoNormalizado.id)

    // Usar la misma lógica que CardProducto
    if (1 > 0 && 1 <= productoNormalizado.stock) {
      const carritoActual = obtenerCarrito()
      console.log('Carrito antes:', carritoActual)
      const resultado = agregarAlCarrito(productoNormalizado, 1, carritoActual)
      console.log('Producto agregado al carrito:', productoNormalizado.nombre)
      console.log('Cantidad:', 1)
      console.log('Carrito después:', resultado.carrito)
    } else if (1 > productoNormalizado.stock) {
      Swal.fire({
        icon: 'error',
        title: 'Stock insuficiente',
        text: `No se puede agregar más de ${productoNormalizado.stock} unidades.`,
      })
    }
  }

  const handleVerDetalle = (producto) => {
    // Guardar el producto completo en localStorage para que ProductoCompleto pueda acceder
    const productoParaDetalle = {
      id: producto.id,
      marca: producto.name.split(' ')[0],
      nombre: producto.name.toUpperCase(),
      precio: producto.precioDescuento, // Usar precio con descuento
      foto: producto.image,
      stock: producto.stock ?? Math.floor(Math.random() * 20) + 1,
      tipo: producto.category,
      descripcion: producto.description ?? '',
    }

    localStorage.setItem('productoDestacado', JSON.stringify(productoParaDetalle))
  }

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1200 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1200, min: 900 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 900, min: 600 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
    },
  }

  if (loading) {
  return (
      <div className='text-center py-5'>
        <div className='spinner-border' role='status'>
          <span className='visually-hidden'>Cargando...</span>
        </div>
      </div>
    )
  }

  return (
    <div className='w-100' style={{ backgroundColor: '#f8f9fa' }}>
      <div className='container-fluid py-5'>
        <h2 className='text-center mb-5 display-5 fw-bold'> Productos Destacados</h2>
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={4000}
          arrows
          showDots={false}
          draggable
          swipeable
          containerClass='carousel-container'
          itemClass='d-flex justify-content-center align-items-stretch px-3'
        >
          {productosDestacados.map((producto, index) => (
            <div key={producto.id} className='h-100 d-flex justify-content-center'>
              <Card
                className='shadow-lg border-0 h-100'
                style={{
                  borderRadius: '15px',
                  overflow: 'hidden',
                  width: '280px',
                  minWidth: '280px',
                }}
              >
                <div style={{ height: '180px', overflow: 'hidden' }}>
                  <Card.Img
                    variant='top'
                    src={producto.image}
                    alt={producto.name}
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x250?text=Producto+Destacado'
                    }}
          />
        </div>
                <Card.Body className='d-flex flex-column justify-content-between p-4'>
                  <div>
                    <span
                      className='mb-3 fs-6 px-3 py-2 d-inline-block'
                      style={{
                        backgroundColor: '#e74c3c',
                        color: '#fff',
                        borderRadius: '0.375rem',
                        fontWeight: '500',
                        display: 'inline-block',
                        textAlign: 'center',
                        minWidth: 'fit-content',
                      }}
                    >
                      -{producto.descuento}% OFF
                    </span>
                    <Card.Title className='fw-bold fs-5 mb-2'>{producto.name}</Card.Title>
                    <Card.Text className='text-muted mb-3'>{producto.category}</Card.Text>
                    <div className='mb-3'>
                      <span className='text-decoration-line-through text-muted me-2'>
                        U$S {producto.precioOriginal}
                      </span>
                      <span className='fs-4 fw-bold' style={{ color: '#ff6600' }}>
                        U$S {producto.precioDescuento}
                      </span>
                    </div>
                  </div>
                  <div className='d-grid gap-2'>
                    <Button
                      as={Link}
                      to={(() => {
                        let tipo = (producto.category || '').toLowerCase()
                        let ruta = '/guitarras/' + (producto.id || `guitarra-${index}`)
                        if (
                          tipo.includes('accesorio') ||
                          tipo.includes('pedal') ||
                          tipo.includes('funda') ||
                          tipo.includes('cuerda')
                        ) {
                          ruta = '/accesorios/' + (producto.id || `accesorio-${index}`)
                        } else if (tipo.includes('amplificador') || tipo.includes('amp')) {
                          ruta = '/amplificadores/' + (producto.id || `amplificador-${index}`)
                        }
                        return ruta
                      })()}
                      className='fw-bold'
                      onClick={() => handleVerDetalle(producto)}
                      style={{
                        backgroundColor: '#212529',
                        borderColor: '#212529',
                        color: '#fff',
                        fontWeight: '600',
                        letterSpacing: '0.02em',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#343a40'
                        e.target.style.borderColor = '#343a40'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#212529'
                        e.target.style.borderColor = '#212529'
                      }}
                    >
                      Ver Detalle
                    </Button>
                    <Button
                      className='fw-bold'
                      onClick={() => handleAgregarAlCarrito(producto, index)}
                      disabled={false} // Siempre habilitado, el stock se genera dinámicamente
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
                      Agregar al Carrito
                    </Button>
                  </div>
                </Card.Body>
              </Card>
        </div>
          ))}
    </Carousel>
      </div>
    </div>
  )
}

export default Carrousel
