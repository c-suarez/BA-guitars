import { createContext, useState, useEffect } from 'react'

const ProductoContext = createContext()

export function ProductoProvider({ children }) {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://68681b84d5933161d70acfae.mockapi.io/products') 
      .then((res) => res.json())
      .then((data) => {
        setProductos(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error al cargar productos:', error)
        setLoading(false)
      })
  }, [])

  return <ProductoContext.Provider value={{ productos, setProductos, loading }}>{children}</ProductoContext.Provider>
}

export default ProductoContext
