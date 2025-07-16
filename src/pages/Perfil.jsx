import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Swal from 'sweetalert2'

const Perfil = () => {
  const { user, updateUser } = useAuth()
  const [nombre, setNombre] = useState(user?.nombre || '')
  const [email, setEmail] = useState(user?.email || '')
  const [editando, setEditando] = useState(false)

  if (!user)
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '40vh',
        }}
      >
        <p style={{ fontSize: '1.4rem', color: '#ff6600', fontWeight: 600, marginBottom: 24, textAlign: 'center' }}>
          Debes iniciar sesión para ver tu perfil.
        </p>
        <a
          href='/'
          style={{
            backgroundColor: '#ff6600',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 32px',
            fontWeight: 600,
            fontSize: '1rem',
            textDecoration: 'none',
            transition: 'background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.15s',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#e55a00'
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#ff6600'
          }}
        >
          Ir al inicio
        </a>
      </div>
    )

  const handleGuardar = (e) => {
    e.preventDefault()
    updateUser({ nombre, email })
    setEditando(false)
  }

  // Panel de administración para el admin
  const esAdmin = user.email === 'admin@admin'
  let usuarios = []
  if (esAdmin) {
    usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
    usuarios = usuarios.filter((u) => u.email !== 'admin@admin')
  }

  return (
    <div
      style={{
        maxWidth: 500,
        margin: '2rem auto',
        padding: 16,
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0 2px 8px #0001',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>Perfil de usuario</h2>
      {editando ? (
        <form
          onSubmit={handleGuardar}
          style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', marginTop: 16 }}
        >
          <div style={{ width: '100%', maxWidth: 320 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
              Nombre:
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: 8,
                  border: '1px solid #ccc',
                  marginTop: 4,
                  marginBottom: 16,
                  fontSize: '1rem',
                }}
              />
            </label>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
              Email:
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type='email'
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: 8,
                  border: '1px solid #ccc',
                  marginTop: 4,
                  marginBottom: 16,
                  fontSize: '1rem',
                }}
              />
            </label>
          </div>
          <div style={{ display: 'flex', gap: 12, width: '100%', justifyContent: 'center' }}>
            <button
              type='submit'
              className='button-animado'
              style={{
                backgroundColor: '#ff6600',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '10px 32px',
                fontWeight: 600,
                fontSize: '1rem',
                transition: 'background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.15s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#e55a00'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#ff6600'
              }}
            >
              Guardar
            </button>
            <button
              type='button'
              onClick={() => setEditando(false)}
              className='button-animado'
              style={{
                backgroundColor: '#212529',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '10px 32px',
                fontWeight: 600,
                fontSize: '1rem',
                transition: 'background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.15s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#343a40'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#212529'
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <div style={{ marginBottom: 24, textAlign: 'center' }}>
          <p>
            <b>Nombre:</b> {user.nombre}
          </p>
          <p>
            <b>Email:</b> {user.email}
          </p>
          <button
            onClick={() => setEditando(true)}
            className='button-animado'
            style={{
              backgroundColor: '#ff6600',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 32px',
              fontWeight: 600,
              fontSize: '1rem',
              transition: 'background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.15s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#e55a00'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#ff6600'
            }}
          >
            Editar datos
          </button>
        </div>
      )}
      <h3 style={{ textAlign: 'center', marginTop: 32 }}>Historial de compras</h3>
      {user.compras && user.compras.length > 0 ? (
        <ul style={{ padding: 0, listStyle: 'none' }}>
          {user.compras.map((compra, i) => (
            <li key={i} style={{ borderBottom: '1px solid #eee', padding: '16px 0' }}>
              <div style={{ marginBottom: 8 }}>
                <b>Fecha:</b> {compra.fecha}
              </div>
              <div>
                <b>Productos:</b>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {compra.productos.map((prod, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                      <img
                        src={prod.foto}
                        alt={prod.nombre}
                        style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6, border: '1px solid #eee' }}
                      />
                      <span style={{ fontWeight: 600 }}>{prod.nombre}</span>
                      <span style={{ color: '#555', fontSize: '0.95rem' }}>x{prod.cantidad}</span>
                      <span style={{ color: '#ff6600', fontWeight: 600, marginLeft: 'auto' }}>${prod.precio}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ marginTop: 8 }}>
                <b>Total:</b> ${compra.total}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: 'center', margin: '32px 0', color: '#888', fontSize: '1.1rem' }}>
          No tienes compras registradas.
        </p>
      )}
      {/* Panel de administración para el admin */}
      {esAdmin && (
        <div style={{ marginTop: 40 }}>
          <h3 style={{ textAlign: 'center', color: '#ff6600' }}>Administrar usuarios</h3>
          {usuarios.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#888', margin: '32px 0' }}>No hay usuarios registrados.</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, maxWidth: 400, margin: '24px auto 0 auto' }}>
              {usuarios.map((u, idx) => (
                <li
                  key={u.email}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #eee',
                    padding: '12px 0',
                  }}
                >
                  <div>
                    <b>{u.nombre}</b>
                    <div style={{ fontSize: '0.95rem', color: '#555' }}>{u.email}</div>
                  </div>
                  <button
                    className='button-animado'
                    style={{
                      backgroundColor: '#dc3545',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      padding: '8px 18px',
                      fontWeight: 600,
                      fontSize: '0.98rem',
                      transition: 'background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.15s',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#b52a37'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#dc3545'
                    }}
                    onClick={async () => {
                      const result = await Swal.fire({
                        title: `¿Eliminar el usuario ${u.email}?`,
                        text: 'Esta acción no se puede deshacer.',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#dc3545',
                        cancelButtonColor: '#3085d6',
                        confirmButtonText: 'Sí, eliminar',
                        cancelButtonText: 'Cancelar',
                      })
                      if (result.isConfirmed) {
                        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
                        const nuevosUsuarios = usuarios.filter((us) => us.email !== u.email)
                        localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios))
                        await Swal.fire({
                          title: 'Usuario eliminado',
                          text: `El usuario ${u.email} fue eliminado correctamente.`,
                          icon: 'success',
                          confirmButtonColor: '#ff6600',
                        })
                        window.location.reload()
                      }
                    }}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {/* Botón eliminar cuenta solo para usuarios que no sean admin */}
      {user.email !== 'admin@admin' && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
          <button
            className='button-animado'
            style={{
              backgroundColor: '#dc3545',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 32px',
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
            onClick={async () => {
              const result = await Swal.fire({
                title: '¿Eliminar tu cuenta?',
                text: 'Esta acción no se puede deshacer.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar',
              })
              if (result.isConfirmed) {
                // Borrar usuario de la lista de usuarios
                const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
                const nuevosUsuarios = usuarios.filter((u) => u.email !== user.email)
                localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios))
                // Borrar usuario actual y token
                localStorage.removeItem('user')
                localStorage.removeItem('token')
                await Swal.fire({
                  title: 'Cuenta eliminada',
                  text: 'Tu cuenta fue eliminada correctamente.',
                  icon: 'success',
                  confirmButtonColor: '#ff6600',
                })
                window.location.href = '/'
              }
            }}
          >
            Eliminar mi cuenta
          </button>
        </div>
      )}
    </div>
  )
}

export default Perfil
