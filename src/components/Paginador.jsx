import { Pagination } from 'react-bootstrap'

const Paginador = ({ productosPorPagina, totalProductos, paginaActual, onCambiarPagina }) => {
  const totalPaginas = Math.ceil(totalProductos / productosPorPagina)

  // Si no hay productos o solo una página, no mostrar paginador
  if (totalProductos === 0 || totalPaginas <= 1) {
    return null
  }

  // Calcular qué páginas mostrar (máximo 5 páginas visibles)
  const obtenerPaginasVisibles = () => {
    const paginas = []
    const inicio = Math.max(1, paginaActual - 2)
    const fin = Math.min(totalPaginas, paginaActual + 2)

    // Agregar primera página si no está incluida
    if (inicio > 1) {
      paginas.push(1)
      if (inicio > 2) {
        paginas.push('...')
      }
    }

    // Agregar páginas del rango
    for (let i = inicio; i <= fin; i++) {
      paginas.push(i)
    }

    // Agregar última página si no está incluida
    if (fin < totalPaginas) {
      if (fin < totalPaginas - 1) {
        paginas.push('...')
      }
      paginas.push(totalPaginas)
    }

    return paginas
  }

  const paginasVisibles = obtenerPaginasVisibles()

  return (
    <>
      <style>
        {`
          .pagination .page-link {
            color: #212529;
            border-color: #dee2e6;
          }
          .pagination .page-link:hover {
            color: #fff;
            background-color: #ff6600;
            border-color: #ff6600;
          }
          .pagination .page-item.active .page-link {
            background-color: #ff6600;
            border-color: #ff6600;
            color: #fff;
          }
          .pagination .page-item.disabled .page-link {
            color: #6c757d;
            background-color: #fff;
            border-color: #dee2e6;
          }
        `}
      </style>
      <div className='d-flex justify-content-center mt-4'>
        <Pagination>
          {/* Botón Anterior */}
          <Pagination.Prev onClick={() => onCambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
            Anterior
          </Pagination.Prev>

          {/* Números de página */}
          {paginasVisibles.map((pagina, index) => (
            <Pagination.Item
              key={index}
              active={pagina === paginaActual}
              onClick={() => typeof pagina === 'number' && onCambiarPagina(pagina)}
              disabled={pagina === '...'}
              style={{ cursor: pagina === '...' ? 'default' : 'pointer' }}
            >
              {pagina}
            </Pagination.Item>
          ))}

          {/* Botón Siguiente */}
          <Pagination.Next onClick={() => onCambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
            Siguiente
          </Pagination.Next>
        </Pagination>
      </div>
    </>
  )
}

export default Paginador
