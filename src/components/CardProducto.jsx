import { Card, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { agregarAlCarrito, obtenerCarrito } from '../util/carritoUtils'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const CardProducto = ({ producto }) => {
  const { id, marca, nombre, foto, stock, precio } = producto
  const [cantidad, setCantidad] = useState(1)

  const handleAgregarAlCarrito = () => {
    if (cantidad > 0 && cantidad <= producto.stock) {
      const carritoActual = obtenerCarrito()
      const resultado = agregarAlCarrito(producto, cantidad, carritoActual)
      console.log('Producto agregado al carrito:', producto.nombre)
      console.log('Cantidad:', cantidad)
      console.log('Carrito actual:', resultado.carrito)
    } else if (cantidad > producto.stock) {
      Swal.fire({
        icon: 'error',
        title: 'Stock insuficiente',
        text: `No se puede agregar más de ${producto.stock} unidades.`,
      })
    }
  }

  // Determinar la ruta de detalle según el tipo
  let rutaDetalle = '/guitarras/' + id
  if (producto.tipo && producto.tipo.toLowerCase().includes('accesorio')) {
    rutaDetalle = '/accesorios/' + id
  } else if (
    producto.tipo &&
    (producto.tipo.toLowerCase().includes('amplificador') || producto.tipo.toLowerCase().includes('amp'))
  ) {
    rutaDetalle = '/amplificadores/' + id
  }

  // Log para depuración
  console.log('CardProducto:', { id, rutaDetalle, producto })

  return (
    <Card className='h-100 shadow-sm'>
      <div className='d-flex justify-content-center align-items-center p-3' style={{ height: '180px' }}>
        <Card.Img
          src={Array.isArray(foto) ? foto[0] : foto}
          alt={nombre}
          loading='lazy'
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
          }}
        />
      </div>

      <Card.Body className='d-flex flex-column justify-content-between' style={{ minHeight: '260px' }}>
        <div>
          <Card.Title
            style={{
              textTransform: 'uppercase',
              fontWeight: 'bold',
              minHeight: '48px',
            }}
          >
            {nombre}
          </Card.Title>
          <Card.Text className='text-muted'>{marca}</Card.Text>
          {/* Precio */}
          <Card.Text className='fw-bold' style={{ color: '#ff6600', fontWeight: 700 }}>
            U$S {precio}
          </Card.Text>
          {/* Stock */}
          <Card.Text className='fw-bold' style={{ color: '#212529', fontWeight: 700 }}>
            Stock: {stock}
          </Card.Text>
        </div>

        <Button
          as={Link}
          to={rutaDetalle}
          className='mb-3 w-100 button-animado'
          style={{
            backgroundColor: '#212529',
            borderColor: '#212529',
            color: '#fff',
            fontWeight: '600',
            letterSpacing: '0.02em',
          }}
        >
          Ver detalle
        </Button>

        {/* 🔥 Cantidad alineado con texto a la izquierda e input a la derecha */}
        <div className='d-flex justify-content-between align-items-center mb-2'>
          <label htmlFor={`cantidad-${id}`} className='mb-0' style={{ fontSize: '1rem' }}>
            Cantidad:
          </label>
          <input
            id={`cantidad-${id}`}
            type='number'
            min='1'
            max={producto.stock}
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            style={{
              borderRadius: '10px',
              padding: '0.375rem 0.75rem',
              border: '1px solid #ced4da',
              width: '70px',
              textAlign: 'center',
            }}
          />
        </div>

        <Button
          disabled={producto.stock === 0}
          onClick={handleAgregarAlCarrito}
          style={{
            backgroundColor: producto.stock > 0 ? '#ff6600' : '#6c757d',
            borderColor: producto.stock > 0 ? '#ff6600' : '#6c757d',
            color: '#fff',
            fontWeight: '600',
            letterSpacing: '0.02em',
          }}
          onMouseEnter={(e) => {
            if (producto.stock > 0) {
              e.target.style.backgroundColor = '#e55a00'
              e.target.style.borderColor = '#e55a00'
            }
          }}
          onMouseLeave={(e) => {
            if (producto.stock > 0) {
              e.target.style.backgroundColor = '#ff6600'
              e.target.style.borderColor = '#ff6600'
            }
          }}
        >
          {producto.stock > 0 ? 'Agregar al Carrito' : 'Sin stock'}
        </Button>
      </Card.Body>
    </Card>
  )
}

export default CardProducto
