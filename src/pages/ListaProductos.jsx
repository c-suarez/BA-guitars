import { Table, Button, Spinner, Container, Form, Modal } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import Paginador from '../components/Paginador'
import usePaginacion from '../util/usePaginacion'
import { Helmet } from 'react-helmet-async'

const API_URL = 'https://68681b84d5933161d70acfae.mockapi.io/products'

function ListaProductos() {
  const [listaProductos, setListaProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtroNombre, setFiltroNombre] = useState('')
  const [filtroCategoria, setFiltroCategoria] = useState('')
  const [filtroMarca, setFiltroMarca] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState('create')
  const [currentItem, setCurrentItem] = useState(null)
  const [nuevoProducto, setNuevoProducto] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    stock: '',
    marca: '',
  })
  const [nuevaCategoria, setNuevaCategoria] = useState('')
  const [nuevaMarca, setNuevaMarca] = useState('')
  const navigate = useNavigate()

  const fetchItems = async () => {
    setLoading(true)
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('Error al cargar productos')
      const data = await response.json()

      // Normalizar datos - extraer marca del nombre del producto
      const normalizados = data.map((d) => ({
        id: d.id,
        name: d.name,
        description: d.description || '',
        price: d.price || 0,
        image: d.image || '',
        category: d.category || '',
        stock: d.stock !== undefined ? d.stock : Math.floor(Math.random() * 20) + 1,
        marca: extractMarca(d.name),
      }))

      setListaProductos(normalizados)
    } catch (error) {
      console.error('Error al cargar productos:', error)
      Swal.fire('Error', 'No se pudieron cargar los productos', 'error')
    } finally {
      setLoading(false)
    }
  }

  // Función para extraer marca del nombre del producto
  const extractMarca = (nombre) => {
    if (!nombre) return 'Sin marca'
    const palabras = nombre.split(' ')
    return palabras[0] // Primera palabra como marca
  }

  useEffect(() => {
    fetchItems()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setNuevoProducto((prev) => ({ ...prev, [name]: value }))
  }

  const handleShowModal = () => setShowModal(true)

  const handleCloseModal = () => {
    setShowModal(false)
    setNuevoProducto({
      name: '',
      description: '',
      price: '',
      image: '',
      category: '',
      stock: '',
      marca: '',
    })
    setCurrentItem(null)
  }

  const handleCreate = async () => {
    // Validaciones
    if (!nuevoProducto.name.trim()) {
      Swal.fire('Error', 'El nombre es obligatorio', 'error')
      return
    }

    const categoriaFinal = capitalizeWords(nuevoProducto.category === 'nueva' ? nuevaCategoria : nuevoProducto.category)
    const stockFinal = nuevoProducto.stock === '' ? 10 : Number(nuevoProducto.stock)
    const precioFinal = nuevoProducto.price === '' ? 1 : Number(nuevoProducto.price)

    if (!categoriaFinal) {
      Swal.fire('Error', 'La categoría es obligatoria', 'error')
      return
    }
    if (precioFinal <= 0) {
      Swal.fire('Error', 'El precio debe ser mayor a 0', 'error')
      return
    }

    const productoAGuardar = {
      name: nuevoProducto.name,
      description: nuevoProducto.description,
      price: precioFinal,
      image: nuevoProducto.image,
      category: categoriaFinal,
      stock: stockFinal,
    }

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoAGuardar),
      })
      if (!res.ok) throw new Error('Error al crear producto')
      await fetchItems()
      handleCloseModal()
      Swal.fire('Éxito', 'Producto creado correctamente', 'success')
    } catch (error) {
      Swal.fire('Error', 'Error creando producto', 'error')
      console.error(error)
    }
  }

  const handleUpdate = async () => {
    if (!currentItem?.id) {
      Swal.fire('Error', 'El producto no tiene un ID válido', 'error')
      return
    }

    // Validaciones
    if (!nuevoProducto.name.trim()) {
      Swal.fire('Error', 'El nombre es obligatorio', 'error')
      return
    }

    const categoriaFinal = capitalizeWords(nuevoProducto.category === 'nueva' ? nuevaCategoria : nuevoProducto.category)
    const stockFinal = nuevoProducto.stock === '' ? 10 : Number(nuevoProducto.stock)
    const precioFinal = nuevoProducto.price === '' ? 1 : Number(nuevoProducto.price)

    if (!categoriaFinal) {
      Swal.fire('Error', 'La categoría es obligatoria', 'error')
      return
    }
    if (precioFinal <= 0) {
      Swal.fire('Error', 'El precio debe ser mayor a 0', 'error')
      return
    }

    const payload = {
      name: nuevoProducto.name,
      description: nuevoProducto.description,
      price: precioFinal,
      image: nuevoProducto.image,
      category: categoriaFinal,
      stock: stockFinal,
    }

    try {
      const res = await fetch(`${API_URL}/${currentItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error(`Error al actualizar producto - status: ${res.status}`)
      }

      await fetchItems()
      handleCloseModal()
      Swal.fire('Éxito', 'Producto actualizado correctamente', 'success')
    } catch (error) {
      Swal.fire('Error', 'Error actualizando el producto', 'error')
      console.error('Error en handleUpdate:', error)
    }
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Seguro que quieres eliminar este producto?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    })

    if (result.isConfirmed) {
      try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
        if (!res.ok) throw new Error('Error al eliminar producto')
        await fetchItems()
        Swal.fire('Eliminado', 'El producto fue eliminado correctamente.', 'success')
      } catch (error) {
        Swal.fire('Error', 'Error eliminando producto', 'error')
        console.error(error)
      }
    }
  }

  const handleGuardarNuevo = () => {
    // Validaciones
    if (!nuevoProducto.name.trim()) {
      Swal.fire('Error', 'El nombre es obligatorio', 'error')
      return
    }
    if ((!nuevoProducto.category || nuevoProducto.category === 'nueva') && !nuevaCategoria.trim()) {
      Swal.fire('Error', 'La categoría es obligatoria', 'error')
      return
    }

    const precioFinal = nuevoProducto.price === '' ? 1 : Number(nuevoProducto.price)
    if (precioFinal <= 0) {
      Swal.fire('Error', 'El precio debe ser mayor a 0', 'error')
      return
    }

    const categoriaFinal = capitalizeWords(nuevoProducto.category === 'nueva' ? nuevaCategoria : nuevoProducto.category)
    const stockFinal = nuevoProducto.stock === '' ? 10 : Number(nuevoProducto.stock)

    setNuevoProducto((prev) => ({
      ...prev,
      category: categoriaFinal,
      stock: stockFinal,
      price: precioFinal,
    }))

    setTimeout(() => {
      if (modalMode === 'edit') {
        handleUpdate()
      } else {
        handleCreate()
      }
    }, 0)
  }

  // Obtener categorías únicas para filtros
  const categorias = Array.from(new Set(listaProductos.map((p) => p.category).filter(Boolean)))
  const marcas = Array.from(new Set(listaProductos.map((p) => p.marca).filter(Boolean)))

  const productosFiltrados = listaProductos.filter(
    (p) =>
      p.name.toLowerCase().includes(filtroNombre.toLowerCase()) &&
      (filtroCategoria ? p.category === filtroCategoria : true) &&
      (filtroMarca ? p.marca === filtroMarca : true)
  )

  // Usar el hook de paginación
  const { productosPaginados, infoPaginacion, cambiarPagina, resetearPaginacion } = usePaginacion(
    productosFiltrados,
    10
  )

  // Resetear paginación cuando cambian los filtros
  useEffect(() => {
    resetearPaginacion()
  }, [filtroNombre, filtroCategoria, filtroMarca])

  // Función para capitalizar cada palabra
  function capitalizeWords(str) {
    if (!str) return ''
    return str.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
  }

  return (
    <>
      <Helmet>
        <title>Administrar Productos | BA Guitars</title>
        <meta
          name='description'
          content='Panel de administración para agregar, editar o eliminar productos del catálogo de BA Guitars.'
        />
      </Helmet>
      <Container className='my-5'>
        <h1 className='mb-4 text-center'>Guitarras y Accesorios</h1>
        <div className='text-end mb-3'>
          <Button
            onClick={() => {
              setModalMode('create')
              setCurrentItem(null)
              handleShowModal()
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
            Agregar Producto
          </Button>
        </div>

        {/* Filtros */}
        <div className='mb-3 d-flex flex-wrap gap-2 align-items-end'>
          <Form.Group>
            <Form.Label>Buscar por nombre</Form.Label>
            <Form.Control
              type='text'
              placeholder='Buscar...'
              value={filtroNombre}
              onChange={(e) => setFiltroNombre(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Categoría</Form.Label>
            <Form.Select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
              <option value=''>Todas</option>
              {categorias.map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Marca</Form.Label>
            <Form.Select value={filtroMarca} onChange={(e) => setFiltroMarca(e.target.value)}>
              <option value=''>Todas</option>
              {marcas.map((marca) => (
                <option key={marca} value={marca}>
                  {marca}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </div>

        {loading ? (
          <div className='text-center'>
            <Spinner animation='border' />
            <p>Cargando productos...</p>
          </div>
        ) : (
          <>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Marca</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productosPaginados.map((producto) => (
                  <tr key={producto.id}>
                    <td>
                      <img
                        src={producto.image}
                        alt={producto.name}
                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/60x60?text=No+Image'
                        }}
                      />
                    </td>
                    <td>{producto.name}</td>
                    <td>{producto.marca}</td>
                    <td>{producto.category}</td>
                    <td>${producto.price}</td>
                    <td>{producto.stock}</td>
                    <td>
                      <Button
                        size='sm'
                        className='me-2'
                        onClick={() => {
                          setModalMode('edit')
                          setCurrentItem(producto)
                          setNuevoProducto({
                            name: producto.name,
                            description: producto.description,
                            price: producto.price,
                            image: producto.image,
                            category: producto.category,
                            stock: producto.stock,
                            marca: producto.marca,
                          })
                          handleShowModal()
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
                        Editar
                      </Button>
                      <Button
                        size='sm'
                        onClick={() => handleDelete(producto.id)}
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
                        Borrar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Información de paginación */}
            {infoPaginacion.hayProductos && (
              <div className='text-center mt-3 mb-2'>
                <small className='text-muted'>
                  Mostrando {infoPaginacion.inicio} - {infoPaginacion.fin} de {infoPaginacion.totalProductos} productos
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
          </>
        )}

        {/* Modal para crear/editar */}
        <Modal show={showModal} onHide={handleCloseModal} size='lg'>
          <Modal.Header closeButton>
            <Modal.Title>{modalMode === 'edit' ? 'Editar' : 'Nuevo'} Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className='mb-3'>
                <Form.Label>Nombre del Producto*</Form.Label>
                <Form.Control
                  name='name'
                  value={nuevoProducto.name}
                  onChange={handleChange}
                  placeholder='Ej: Fender Stratocaster'
                  required
                />
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={3}
                  name='description'
                  value={nuevoProducto.description}
                  onChange={handleChange}
                  placeholder='Describe las características del producto...'
                />
              </Form.Group>

              <div className='row'>
                <div className='col-md-6'>
                  <Form.Group className='mb-3'>
                    <Form.Label>Precio*</Form.Label>
                    <Form.Control
                      name='price'
                      type='number'
                      min='1'
                      value={nuevoProducto.price}
                      onChange={handleChange}
                      placeholder='0'
                      required
                    />
                  </Form.Group>
                </div>
                <div className='col-md-6'>
                  <Form.Group className='mb-3'>
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                      name='stock'
                      type='number'
                      min='0'
                      value={nuevoProducto.stock}
                      onChange={handleChange}
                      placeholder='10'
                    />
                  </Form.Group>
                </div>
              </div>

              <Form.Group className='mb-3'>
                <Form.Label>Categoría*</Form.Label>
                <Form.Select
                  name='category'
                  value={nuevoProducto.category}
                  onChange={(e) => {
                    setNuevoProducto({ ...nuevoProducto, category: e.target.value })
                    if (e.target.value !== 'nueva') setNuevaCategoria('')
                  }}
                  required
                >
                  <option value=''>Seleccione categoría</option>
                  {categorias.map((categoria) => (
                    <option key={categoria} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                  <option value='nueva'>Nueva categoría</option>
                </Form.Select>
                {nuevoProducto.category === 'nueva' && (
                  <Form.Control
                    className='mt-2'
                    type='text'
                    placeholder='Ingrese nueva categoría'
                    value={nuevaCategoria}
                    onChange={(e) => setNuevaCategoria(e.target.value)}
                    required
                  />
                )}
              </Form.Group>

              <Form.Group className='mb-3'>
                <Form.Label>URL de la Imagen</Form.Label>
                <Form.Control
                  name='image'
                  type='url'
                  value={nuevoProducto.image}
                  onChange={handleChange}
                  placeholder='https://ejemplo.com/imagen.jpg'
                />
                {nuevoProducto.image && (
                  <div className='mt-2'>
                    <img
                      src={nuevoProducto.image}
                      alt='Vista previa'
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100x100?text=Error'
                      }}
                    />
                  </div>
                )}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={handleCloseModal}
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
              Cancelar
            </Button>
            <Button
              onClick={handleGuardarNuevo}
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
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>
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

export default ListaProductos
