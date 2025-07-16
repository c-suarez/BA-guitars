import { Container, Button, Badge } from 'react-bootstrap'
import { obtenerCarrito, guardarCarrito, agregarAlCarrito, restarDelCarrito } from '../util/carritoUtils'
import Swal from 'sweetalert2'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Carrito() {
  const [carrito, setCarrito] = useState(() => obtenerCarrito())
  const { user, addCompra } = useAuth()

  const actualizarCarrito = (nuevo) => {
    guardarCarrito(nuevo)
    setCarrito(nuevo)
    window.dispatchEvent(new Event('carritoActualizado'))
  }

  const eliminarDelCarrito = (id) => {
    const nuevoCarrito = carrito.filter((item) => item.id !== id)
    actualizarCarrito(nuevoCarrito)

    Toastify({
      text: 'Producto eliminado',
      duration: 2000,
      gravity: 'top',
      position: 'right',
      style: {
        background: '#ff6600',
        color: '#fff',
        fontWeight: 600,
        borderRadius: '12px',
      },
    }).showToast()
  }

  const vaciarCarrito = () => {
    Swal.fire({
      title: '¿Seguro?',
      text: 'Se eliminarán todos los productos del carrito.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, vaciar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        actualizarCarrito([])
        Toastify({
          text: 'Carrito vaciado',
          duration: 2000,
          gravity: 'top',
          position: 'right',
          style: {
            background: '#ff6600',
            color: '#fff',
            fontWeight: 600,
            borderRadius: '12px',
          },
        }).showToast()
      }
    })
  }

  const pagar = () => {
    if (!user) {
      Swal.fire({
        title: 'Debes iniciar sesión',
        text: 'Inicia sesión para registrar tu compra en el historial.',
        icon: 'info',
      })
      return
    }
    // Crear objeto de compra con detalles de productos
    const compra = {
      fecha: new Date().toLocaleDateString(),
      productos: carrito.map((item) => ({
        nombre: item.nombre,
        foto: item.foto || 'https://via.placeholder.com/60x60?text=Sin+Imagen',
        cantidad: item.cantidad,
        precio: item.precio?.toFixed(2) || '0.00',
      })),
      total: totalCarrito.toFixed(2),
    }
    addCompra(compra)
    Swal.fire({
      title: '¡Gracias por tu compra!',
      text: `Total: $${totalCarrito.toLocaleString()}`,
      icon: 'success',
    })
    actualizarCarrito([])
  }

  // Calcular totales
  const totalCarrito = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  // Calcular total original (sin descuentos)
  const totalOriginal = carrito.reduce((acc, item) => {
    const precioOriginal = item.precioOriginal || item.precio
    return acc + precioOriginal * item.cantidad
  }, 0)

  // Calcular ahorro total
  const ahorroTotal = totalOriginal - totalCarrito

  return (
    <Container className='mt-5'>
      <h1 className='text-center mb-4'>Tu carrito</h1>

      {carrito.length === 0 ? (
        <p className='text-center'>Tu carrito está vacío</p>
      ) : (
        <>
          <div className='table-responsive'>
            <table className='table table-striped table-bordered align-middle text-center'>
              <thead className='table-dark'>
                <tr>
                  <th>Foto</th>
                  <th>Nombre</th>
                  <th>Precio unitario</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((item) => {
                  const precioOriginal = item.precioOriginal || item.precio
                  const tieneDescuento = item.precioOriginal && item.precioOriginal > item.precio
                  const descuentoItem = item.descuento || 0

                  return (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.foto}
                        alt={item.nombre}
                          className='rounded'
                          style={{ width: 60, height: 60, objectFit: 'fit-content' }}
                      />
                    </td>
                      <td>
                        <div>
                          {item.nombre}
                          {tieneDescuento && (
                            <Badge bg='danger' className='ms-2'>
                              -{descuentoItem}% OFF
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td>
                        {tieneDescuento ? (
                          <div>
                            <div className='text-decoration-line-through text-muted'>
                              U$S {precioOriginal.toFixed(2)}
                            </div>
                            <div className='fw-bold text-danger'>U$S {item.precio.toFixed(2)}</div>
                          </div>
                        ) : (
                          <div>U$S {item.precio.toFixed(2)}</div>
                        )}
                      </td>
                    <td>{item.cantidad}</td>
                      <td>
                        {tieneDescuento ? (
                          <div>
                            <div className='text-decoration-line-through text-muted'>
                              U$S {(precioOriginal * item.cantidad).toFixed(2)}
                            </div>
                            <div className='fw-bold text-danger'>U$S {(item.precio * item.cantidad).toFixed(2)}</div>
                          </div>
                        ) : (
                          <div>U$S {(item.precio * item.cantidad).toFixed(2)}</div>
                        )}
                      </td>
                      <td>
                        <div className='d-flex justify-content-center gap-1 flex-wrap'>
                        <Button
                            size='sm'
                          onClick={() => eliminarDelCarrito(item.id)}
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
                          Eliminar
                        </Button>
                        <Button
                            size='sm'
                          onClick={() => {
                              const { carrito: nuevo } = agregarAlCarrito(item, 1, carrito, false)
                              actualizarCarrito(nuevo)
                            }}
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
                          +1
                        </Button>
                        <Button
                            variant='secondary'
                            size='sm'
                          onClick={async () => {
                              const nuevo = await restarDelCarrito(item.id, carrito)
                            if (Array.isArray(nuevo)) {
                                actualizarCarrito(nuevo)
                            }
                          }}
                        >
                          -1
                        </Button>
                      </div>
                    </td>
                  </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <hr />

          {/* Resumen de descuentos */}
          {ahorroTotal > 0 && (
            <div className='row justify-content-end mb-3'>
              <div className='col-md-6'>
                <div className='card' style={{ borderColor: '#ff6600' }}>
                  <div className='card-body text-center'>
                    <h5 className='card-title' style={{ color: '#ff6600' }}>
                      ¡Ahorraste U$S {ahorroTotal.toFixed(2)}!
                    </h5>
                    <div className='row'>
                      <div className='col-6'>
                        <small className='text-muted'>Precio original:</small>
                        <div className='text-decoration-line-through'>U$S {totalOriginal.toFixed(2)}</div>
                      </div>
                      <div className='col-6'>
                        <small className='text-muted'>Precio final:</small>
                        <div className='fw-bold fs-5' style={{ color: '#ff6600' }}>
                          U$S {totalCarrito.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <h3 className='text-end fw-bold' style={{ color: '#ff6600' }}>
            Total a pagar: U$S {totalCarrito.toFixed(2)}
          </h3>
          <div className='d-flex justify-content-end gap-3 mt-3'>
            <Button
              onClick={vaciarCarrito}
              className='button-animado'
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
              Vaciar carrito
            </Button>
            <Button
              onClick={pagar}
              className='button-animado'
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
              Pagar
            </Button>
          </div>
        </>
      )}
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
  )
}

export default Carrito
