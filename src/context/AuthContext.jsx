import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loadingUser, setLoadingUser] = useState(true)

  // Nueva función para actualizar el usuario y persistir en localStorage y en la lista de usuarios
  const updateUser = (newUserData) => {
    setUser((prev) => {
      const updated = { ...prev, ...newUserData }
      localStorage.setItem('user', JSON.stringify(updated))
      // Actualizar en la lista de usuarios
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
      const nuevosUsuarios = usuarios.map(u => u.email === updated.email ? { ...u, ...newUserData } : u)
      localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios))
      return updated
    })
  }

  // Nueva función para agregar una compra al historial y persistir en la lista de usuarios
  const addCompra = (compra) => {
    setUser((prev) => {
      const compras = prev?.compras || []
      const updated = { ...prev, compras: [...compras, compra] }
      localStorage.setItem('user', JSON.stringify(updated))
      // Actualizar en la lista de usuarios
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
      const nuevosUsuarios = usuarios.map(u => u.email === updated.email ? { ...u, compras: [...compras, compra] } : u)
      localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios))
      return updated
    })
  }

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedUser = JSON.parse(localStorage.getItem('user'))
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(savedUser)
    }
    setLoadingUser(false)
  }, [])

  useEffect(() => {
    console.log('Usuario cargado:', user)
  }, [user])

  const login = (username, password) => {
    // Buscar usuario en LocalStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
    const encontrado = usuarios.find((u) => u.email === username && u.password === password)
    if (encontrado) {
      const tokenFalso = btoa(username + ':' + password)
      setToken(tokenFalso)
      setUser({ ...encontrado })
      localStorage.setItem('token', tokenFalso)
      localStorage.setItem('user', JSON.stringify({ ...encontrado }))
      return true
    }
    // Soporte para admin hardcodeado
    if (username === 'admin@admin' && password === 'admin') {
      const tokenFalso = 'dG9rZW5GYWxzbzEyMzQ='
      const userObj = {
        email: username,
        nombre: 'Admin',
        compras: [],
      }
      setToken(tokenFalso)
      setUser(userObj)
      localStorage.setItem('token', tokenFalso)
      localStorage.setItem('user', JSON.stringify(userObj))
      return true
    }
    return false
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const sucess = login(email, password)
    console.log('Login success:', sucess)
    // Redirección debe hacerse desde el componente Login.jsx tras login exitoso
    if (!sucess) {
      setError('Credenciales incorrectas. Inténtalo de nuevo.')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        handleSubmit,
        error,
        setEmail,
        setPassword,
        loadingUser,
        updateUser,
        addCompra,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
