import Swal from 'sweetalert2'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

// Función para obtener el carrito del localStorage
export const obtenerCarrito = () => {
  const carritoGuardado = localStorage.getItem('carrito')
  return carritoGuardado ? JSON.parse(carritoGuardado) : []
}

// Función para guardar el carrito en localStorage
export const guardarCarrito = (carrito) => {
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

// Función para obtener la cantidad total
export const obtenerCantidadTotal = () => {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || []
  return carrito.reduce((acc, item) => acc + item.cantidad, 0)
}

// Función para agregar producto al carrito
export const agregarAlCarrito = (producto, cantidad, carritoActual, mostrarToast = true) => {
  if (cantidad <= 0) {
    Swal.fire({
      title: `No es posible agregar ${cantidad} unidades.`,
      timer: 3500,
      icon: 'error',
    })
    return { carrito: carritoActual, agregado: false }
  }

  if (cantidad > producto.stock) {
    Swal.fire({
      title: `No es posible agregar ${cantidad} unidades. Solo tenemos ${producto.stock} en stock.`,
      timer: 3500,
      icon: 'error',
    })
    return { carrito: carritoActual, agregado: false }
  }

  const productoEnCarrito = carritoActual.find((item) => item.id === producto.id)
  const nuevoCarrito = [...carritoActual]

  if (!productoEnCarrito) {
    nuevoCarrito.push({
      ...producto,
      id: producto.id || producto.ID,
      nombre: producto.nombre || producto.MODELO,
      cantidad: cantidad,
    })

    if (mostrarToast) {
      Toastify({
        text: `Se han agregado ${cantidad} unidades de ${producto.nombre}.`,
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
  } else {
    if (cantidad + productoEnCarrito.cantidad > producto.stock) {
      Swal.fire({
        title: `No es posible agregar ${cantidad} unidades. Ya tienes ${productoEnCarrito.cantidad} en el carrito y solo tenemos ${producto.stock} en stock.`,
        timer: 3500,
        icon: 'error',
      })
      return { carrito: carritoActual, agregado: false }
    }

    const index = nuevoCarrito.findIndex((item) => item.id === producto.id)
    nuevoCarrito[index] = {
      ...productoEnCarrito,
      cantidad: productoEnCarrito.cantidad + cantidad,
    }

    if (mostrarToast) {
      Toastify({
        text: `Se han agregado ${cantidad} unidades adicionales de ${producto.nombre}. Ahora tienes ${
          productoEnCarrito.cantidad + cantidad
        } en total.`,
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
  }

  guardarCarrito(nuevoCarrito)
  window.dispatchEvent(new Event('carritoActualizado'))
  return { carrito: nuevoCarrito, agregado: true }
}

// Función para restar cantidad o eliminar del carrito
export const restarDelCarrito = async (productoId, carritoActual) => {
  const nuevoCarrito = [...carritoActual]
  const index = nuevoCarrito.findIndex((item) => item.id === productoId)

  if (index === -1) return carritoActual

  if (nuevoCarrito[index].cantidad > 1) {
    nuevoCarrito[index].cantidad -= 1
  } else {
    const confirmacion = await Swal.fire({
      title: `¿Eliminar "${nuevoCarrito[index].nombre}" del carrito?`,
      text: 'La cantidad va a ser 0. ¿Deseás eliminarlo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    })

    if (confirmacion.isConfirmed) {
      nuevoCarrito.splice(index, 1)
    } else {
      return carritoActual // Si cancela, no cambia nada
    }
  }

  guardarCarrito(nuevoCarrito)
  return nuevoCarrito
}
