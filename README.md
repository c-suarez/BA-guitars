# BA Guitars

E-commerce académico de guitarras, amplificadores y accesorios hecho en React.

Para iniciar la app en modo desarrollo:

```
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## Funcionalidades principales

- Catálogo de guitarras, amplificadores y accesorios (MockAPI)
- Filtros, búsqueda con autocompletado y paginación
- Carrito de compras (Context API)
- Registro, login y autenticación (Context API + LocalStorage)
- CRUD de productos (admin, MockAPI)
- Gestión de usuarios (admin)
- Historial de compras por usuario
- Diseño responsive (Bootstrap)
- Notificaciones (React Toastify)
- Iconos (React Icons y Bootstrap Icons)
- SEO y metadatos (React Helmet)
- Accesibilidad mejorada (labels, aria-labels, aria-live)
- Optimización de carga (lazy loading, code splitting, imágenes optimizadas)
- Styled-components: usado para el botón principal personalizado (ver `src/components/BotonNaranja.jsx`)

## Registro de usuario y compras

- Para crear un usuario, haz clic en "Registrate" desde la pantalla de inicio de sesión e ingresa tu nombre, email y contraseña.
- Luego, inicia sesión con ese usuario.
- Cada usuario puede realizar compras y ver su historial en la sección "Perfil".
- El historial de compras es personal y solo visible para cada usuario.

### Nota sobre seguridad y datos

Los usuarios, contraseñas e historial de compras se guardan únicamente en el LocalStorage del navegador de quien usa la app. No se almacenan en ningún servidor ni se suben a GitHub. Es seguro para fines académicos y de prueba.

## Gestión de usuarios

- Cada usuario puede eliminar su cuenta desde la sección de perfil.
- El usuario admin puede ver y eliminar usuarios registrados desde su perfil.
- Todas las acciones de gestión de usuarios son locales y seguras.

---

Desarrollado por Cristian Suarez
