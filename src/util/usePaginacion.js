import { useState, useMemo, useEffect } from 'react'

const usePaginacion = (productos, productosPorPagina = 12) => {
  const [paginaActual, setPaginaActual] = useState(1)

  // Resetear paginación cuando cambian los productos
  useEffect(() => {
    setPaginaActual(1)
  }, [productos.length])

  // Calcular productos de la página actual
  const productosPaginados = useMemo(() => {
    const inicio = (paginaActual - 1) * productosPorPagina
    const fin = inicio + productosPorPagina
    return productos.slice(inicio, fin)
  }, [productos, paginaActual, productosPorPagina])

  // Calcular información de paginación
  const infoPaginacion = useMemo(() => {
    const totalProductos = productos.length
    const totalPaginas = Math.ceil(totalProductos / productosPorPagina)
    const inicio = (paginaActual - 1) * productosPorPagina + 1
    const fin = Math.min(paginaActual * productosPorPagina, totalProductos)

    return {
      totalProductos,
      totalPaginas,
      paginaActual,
      productosPorPagina,
      inicio,
      fin,
      hayProductos: totalProductos > 0,
    }
  }, [productos, paginaActual, productosPorPagina])

  // Función para cambiar de página
  const cambiarPagina = (nuevaPagina) => {
    const totalPaginas = Math.ceil(productos.length / productosPorPagina)
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina)
      // Scroll hacia arriba para mejor UX
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Resetear a la primera página cuando cambian los productos
  const resetearPaginacion = () => {
    setPaginaActual(1)
  }

  return {
    productosPaginados,
    infoPaginacion,
    cambiarPagina,
    resetearPaginacion,
  }
}

export default usePaginacion
 