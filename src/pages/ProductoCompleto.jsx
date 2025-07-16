import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Row, Col, Spinner, Button, Form } from 'react-bootstrap'
import { agregarAlCarrito, obtenerCarrito } from '../util/carritoUtils'
import Swal from 'sweetalert2'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'
import { useAuth } from '../context/AuthContext'

function ProductoCompleto() {
  const { id } = useParams()
  const [producto, setProducto] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cantidad, setCantidad] = useState(1)
  const { user } = useAuth()
  // Estado para reseñas
  const [reseñas, setReseñas] = useState([])
  const [miReseña, setMiReseña] = useState({ calificacion: 0, comentario: '' })
  const [editando, setEditando] = useState(false)

  useEffect(() => {
    setLoading(true)
    // Si el id es generado (ej: guitarra-0, accesorio-2, amplificador-1), buscar en la lista completa
    if (id && (id.startsWith('guitarra-') || id.startsWith('accesorio-') || id.startsWith('amplificador-'))) {
      fetch('https://68681b84d5933161d70acfae.mockapi.io/products')
        .then((res) => res.json())
        .then((data) => {
          let producto = null
          if (id.startsWith('guitarra-')) {
            const soloGuitarras = data.filter((d) => d.category && d.category.toLowerCase() === 'guitarras')
            const idx = parseInt(id.replace('guitarra-', ''))
            producto = soloGuitarras[idx]
            if (producto) {
              producto = {
                id,
                marca: producto.name.split(' ')[0],
                nombre: producto.name.toUpperCase(),
                precio: producto.price,
                foto: producto.image,
                stock: producto.stock ?? Math.floor(Math.random() * 20) + 1,
                tipo: 'guitarra',
                descripcion: producto.description ?? '',
              }
            }
          } else if (id.startsWith('accesorio-')) {
            const filtrados = data.filter(
              (d) =>
                (d.category || '').toLowerCase() !== 'guitarras' &&
                !(d.category || '').toLowerCase().includes('amplificador') &&
                !(d.category || '').toLowerCase().includes('amp')
            )
            const idx = parseInt(id.replace('accesorio-', ''))
            producto = filtrados[idx]
            if (producto) {
              producto = {
                id,
                marca: producto.name.split(' ')[0],
                nombre: producto.name.toUpperCase(),
                precio: producto.price,
                foto: producto.image,
                stock: producto.stock ?? Math.floor(Math.random() * 10) + 1,
                tipo: 'accesorio',
                descripcion: producto.description ?? 'Sin descripción',
              }
            }
          } else if (id.startsWith('amplificador-')) {
            const filtrados = data.filter(
              (d) =>
                (d.category || '').toLowerCase().includes('amplificador') ||
                (d.category || '').toLowerCase().includes('amp')
            )
            const idx = parseInt(id.replace('amplificador-', ''))
            producto = filtrados[idx]
            if (producto) {
              producto = {
                id,
                marca: producto.name.split(' ')[0],
                nombre: producto.name.toUpperCase(),
                precio: producto.price,
                foto: producto.image,
                stock: producto.stock ?? Math.floor(Math.random() * 10) + 1,
                tipo: 'amplificador',
                descripcion: producto.description ?? 'Amplificador de alta calidad para guitarra',
              }
            }
          }
          setProducto(producto)
        })
        .catch((error) => {
          console.error('Error al buscar producto generado:', error)
          setProducto(null)
        })
        .finally(() => setLoading(false))
    } else {
      // Si el id es de la API, fetch normal
      fetch(`https://68681b84d5933161d70acfae.mockapi.io/products/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Producto no encontrado: ${res.status}`)
          }
          return res.json()
        })
        .then((data) => {
          const normalizado = {
            id: `${data.id}`,
            marca: data.name.split(' ')[0],
            nombre: data.name.toUpperCase(),
            precio: data.price,
            foto: data.image,
            stock: data.stock ?? Math.floor(Math.random() * 20) + 1,
            tipo: data.category,
            descripcion: data.description ?? '',
          }
          setProducto(normalizado)
        })
        .catch((error) => {
          console.error('Error al cargar el producto:', error)
          setProducto(null)
        })
        .finally(() => setLoading(false))
    }
  }, [id])

  // Cargar reseñas al montar
  useEffect(() => {
    if (producto?.id) {
      const guardadas = JSON.parse(localStorage.getItem('reseñas_' + producto.id)) || []
      setReseñas(guardadas)
      if (user) {
        const propia = guardadas.find((r) => r.email === user.email)
        if (propia) {
          setMiReseña({ calificacion: propia.calificacion, comentario: propia.comentario || '' })
        } else {
          setMiReseña({ calificacion: 0, comentario: '' })
        }
      }
    }
  }, [producto, user])

  // Guardar o editar reseña
  const handleGuardarReseña = (e) => {
    e.preventDefault()
    if (!user) return
    if (miReseña.calificacion < 1 || miReseña.calificacion > 5) return
    let nuevas = reseñas.filter((r) => r.email !== user.email)
    nuevas.push({
      usuario: user.nombre,
      email: user.email,
      calificacion: miReseña.calificacion,
      comentario: miReseña.comentario,
      fecha: new Date().toLocaleDateString(),
    })
    setReseñas(nuevas)
    localStorage.setItem('reseñas_' + producto.id, JSON.stringify(nuevas))
    setEditando(false)
  }

  // Eliminar reseña propia
  const handleEliminarReseña = () => {
    if (!user) return
    const nuevas = reseñas.filter((r) => r.email !== user.email)
    setReseñas(nuevas)
    localStorage.setItem('reseñas_' + producto.id, JSON.stringify(nuevas))
    setMiReseña({ calificacion: 0, comentario: '' })
    setEditando(false)
  }

  const handleAgregarAlCarrito = () => {
    if (!producto) return

    if (cantidad > 0 && cantidad <= producto.stock) {
      const carritoActual = obtenerCarrito()
      // Deshabilitar notificaciones automáticas para evitar duplicación
      const resultado = agregarAlCarrito(producto, cantidad, carritoActual, false)

      if (resultado.agregado) {
        Toastify({
          text: `Se agregaron ${cantidad} unidades de ${producto.nombre} al carrito`,
          duration: 3000,
          gravity: 'bottom',
          position: 'right',
          style: {
            background: '#ff6600',
            color: '#fff',
            fontWeight: 600,
            borderRadius: '12px',
          },
        }).showToast()
      }
    } else if (cantidad > producto.stock) {
      Swal.fire({
        icon: 'error',
        title: 'Stock insuficiente',
        text: `No se puede agregar más de ${producto.stock} unidades.`,
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Cantidad inválida',
        text: 'La cantidad debe ser mayor a 0.',
      })
    }
  }

  if (loading) {
    return (
      <div className='d-flex justify-content-center align-items-center' style={{ height: '300px' }}>
        <Spinner animation='border' variant='primary' />
      </div>
    )
  }

  if (!producto) {
    return (
      <Container className='text-center my-5'>
        <h2>⚠️ Producto no encontrado</h2>
      </Container>
    )
  }

  return (
    <>
      <Container className='my-5'>
      <Row>
          <Col md={6} className='text-center'>
            <img src={producto.foto} alt={producto.nombre} className='img-fluid rounded shadow' loading='lazy' />
        </Col>
        <Col md={6}>
            <h2 className='mb-3'>{producto.nombre}</h2>
            <h4 className='text-muted mb-3'>Marca: {producto.marca}</h4>
            <p className='mb-4'>{producto.descripcion}</p>
            <h3 className='mb-4' style={{ color: '#ff6600', fontWeight: 700 }}>
              U$S {producto.precio}
            </h3>
            <p className='mb-3'>Stock disponible: {producto.stock}</p>
            {/* Selector de cantidad */}
            <div className='d-flex align-items-center mb-4'>
              <label htmlFor='cantidad-producto' className='me-3 mb-0' style={{ fontSize: '1.1rem' }}>
                Cantidad:
              </label>
              <Form.Control
                id='cantidad-producto'
                type='number'
                min='1'
                max={producto.stock}
                value={cantidad}
                onChange={(e) => setCantidad(Number(e.target.value))}
                style={{
                  width: '80px',
                  textAlign: 'center',
                  borderRadius: '8px',
                }}
              />
            </div>
            <Button
              size='md'
              onClick={handleAgregarAlCarrito}
              disabled={cantidad <= 0 || cantidad > producto.stock}
              style={{
                backgroundColor: cantidad <= 0 || cantidad > producto.stock ? '#6c757d' : '#ff6600',
                borderColor: cantidad <= 0 || cantidad > producto.stock ? '#6c757d' : '#ff6600',
                color: '#fff',
                fontWeight: '600',
                letterSpacing: '0.02em',
                padding: '8px 24px',
              }}
              onMouseEnter={(e) => {
                if (cantidad > 0 && cantidad <= producto.stock) {
                  e.target.style.backgroundColor = '#e55a00'
                  e.target.style.borderColor = '#e55a00'
                }
              }}
              onMouseLeave={(e) => {
                if (cantidad > 0 && cantidad <= producto.stock) {
                  e.target.style.backgroundColor = '#ff6600'
                  e.target.style.borderColor = '#ff6600'
                }
              }}
            >
              Agregar al carrito
          </Button>
        </Col>
      </Row>
    </Container>
      <Container className='my-5'>
        <h3 style={{ color: '#ff6600', textAlign: 'center', marginBottom: 32 }}>Valoraciones y reseñas</h3>
        {/* Mostrar reseñas */}
        {reseñas.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>Este producto aún no tiene reseñas.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, maxWidth: 500, margin: '0 auto 32px auto' }}>
            {reseñas
              .slice()
              .reverse()
              .map((r, idx) => (
                <li key={idx} style={{ borderBottom: '1px solid #eee', padding: '16px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <b style={{ color: '#212529' }}>{r.usuario}</b>
                    <span style={{ color: '#ff6600', fontWeight: 700, marginLeft: 8 }}>
                      {'★'.repeat(r.calificacion)}
                      {'☆'.repeat(5 - r.calificacion)}
                    </span>
                    <span style={{ color: '#888', fontSize: '0.95rem', marginLeft: 12 }}>{r.fecha}</span>
                  </div>
                  {r.comentario && <div style={{ marginTop: 6, color: '#333' }}>{r.comentario}</div>}
                </li>
              ))}
          </ul>
        )}
        {/* Formulario de reseña */}
        <div
          style={{
            maxWidth: 500,
            margin: '0 auto',
            background: '#fafbfc',
            borderRadius: 10,
            boxShadow: '0 2px 8px #0001',
            padding: 24,
          }}
        >
          <h5 style={{ textAlign: 'center', marginBottom: 16 }}>Dejá tu valoración</h5>
          <form onSubmit={handleGuardarReseña} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 4, fontSize: '2rem' }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <span
                  key={n}
                  style={{
                    cursor: user ? 'pointer' : 'not-allowed',
                    color: n <= miReseña.calificacion ? '#ff6600' : '#ddd',
                    transition: 'color 0.2s',
                  }}
                  onClick={() => user && setMiReseña((m) => ({ ...m, calificacion: n }))}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              placeholder='Comentario (opcional)'
              value={miReseña.comentario}
              onChange={(e) => user && setMiReseña((m) => ({ ...m, comentario: e.target.value }))}
              rows={3}
              style={{ borderRadius: 8, border: '1px solid #ccc', padding: 8, fontSize: '1rem', resize: 'vertical' }}
              disabled={!user}
            />
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 8 }}>
              <button
                type='submit'
                className='button-animado'
                style={{
                  backgroundColor: '#ff6600',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 32px',
                  fontWeight: 600,
                  fontSize: '1rem',
                  transition: 'background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.15s',
                  cursor: user ? 'pointer' : 'not-allowed',
                  opacity: user ? 1 : 0.6,
                }}
                onMouseEnter={(e) => {
                  if (user) e.target.style.backgroundColor = '#e55a00'
                }}
                onMouseLeave={(e) => {
                  if (user) e.target.style.backgroundColor = '#ff6600'
                }}
                disabled={!user || miReseña.calificacion < 1 || miReseña.calificacion > 5}
              >
                {reseñas.some((r) => r.email === (user && user.email)) ? 'Actualizar reseña' : 'Enviar reseña'}
              </button>
              {user && reseñas.some((r) => r.email === user.email) && (
                <button
                  type='button'
                  className='button-animado'
                  style={{
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '8px 24px',
                    fontWeight: 600,
                    fontSize: '1rem',
                    transition: 'background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.15s',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#b52a37'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#dc3545'
                  }}
                  onClick={handleEliminarReseña}
                >
                  Eliminar
                </button>
              )}
            </div>
            {!user && (
              <p style={{ textAlign: 'center', color: '#888', marginTop: 12 }}>
                Inicia sesión para dejar tu valoración.
              </p>
            )}
          </form>
        </div>
      </Container>
    </>
  )
}

export default ProductoCompleto
