import Header from './components/Header'
import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AdBar from './components/AdBar'
import Footer from './components/Footer'
import { ProductoProvider } from './context/ProductoContext'
import { AuthProvider } from './context/AuthContext'
import RutaPrivadaAdmin from './components/RutaPrivadaAdmin'
import CarrouselMarcas from './components/CarrouselMarcas'
import './App.css'

const Home = lazy(() => import('./pages/Home'))
const Register = lazy(() => import('./pages/Register'))
const Contact = lazy(() => import('./pages/Contact'))
const Login = lazy(() => import('./pages/Login'))
const Carrito = lazy(() => import('./pages/Carrito'))
const ProductoCompleto = lazy(() => import('./pages/ProductoCompleto'))
const ListaProductos = lazy(() => import('./pages/ListaProductos'))
const Guitarras = lazy(() => import('./pages/Guitarras'))
const Accesorios = lazy(() => import('./pages/Accesorios'))
const Amplificadores = lazy(() => import('./pages/Amplificadores'))
const BuscarResultados = lazy(() => import('./pages/BuscarResultados'))
const Faq = lazy(() => import('./pages/Faq'))
const Perfil = lazy(() => import('./pages/Perfil'))

function App() {
  return (
    <Router>
      <ProductoProvider>
        <AuthProvider>
          <div>
            <Suspense
              fallback={
                <div className='text-center py-2'>
                  <div className='spinner-border spinner-border-sm' role='status'></div>
                </div>
              }
            >
            <AdBar />
            </Suspense>
            <Header />
            <Routes>
              <Route
                path='/'
                element={
                  <Suspense
                    fallback={
                      <div className='text-center py-5'>
                        <div className='spinner-border' role='status'>
                          <span className='visually-hidden'>Cargando...</span>
                        </div>
                      </div>
                    }
                  >
                    <Home />
                  </Suspense>
                }
              />
              <Route
                path='/guitarras'
                element={
                  <Suspense
                    fallback={
                      <div className='text-center py-5'>
                        <div className='spinner-border' role='status'>
                          <span className='visually-hidden'>Cargando...</span>
                        </div>
                      </div>
                    }
                  >
                    <Guitarras />
                  </Suspense>
                }
              />
              <Route
                path='/amplificadores'
                element={
                  <Suspense
                    fallback={
                      <div className='text-center py-5'>
                        <div className='spinner-border' role='status'>
                          <span className='visually-hidden'>Cargando...</span>
                        </div>
                      </div>
                    }
                  >
                    <Amplificadores />
                  </Suspense>
                }
              />
              <Route
                path='/accesorios'
                element={
                  <Suspense
                    fallback={
                      <div className='text-center py-5'>
                        <div className='spinner-border' role='status'>
                          <span className='visually-hidden'>Cargando...</span>
                        </div>
                      </div>
                    }
                  >
                    <Accesorios />
                  </Suspense>
                }
              />
              <Route
                path='/contact'
                element={
                  <Suspense
                    fallback={
                      <div className='text-center py-5'>
                        <div className='spinner-border' role='status'>
                          <span className='visually-hidden'>Cargando...</span>
                        </div>
                      </div>
                    }
                  >
                    <Contact />
                  </Suspense>
                }
              />
              <Route
                path='/carrito'
                element={
                  <Suspense
                    fallback={
                      <div className='text-center py-5'>
                        <div className='spinner-border' role='status'>
                          <span className='visually-hidden'>Cargando...</span>
                        </div>
                      </div>
                    }
                  >
                    <Carrito />
                  </Suspense>
                }
              />
              <Route
                path='/login'
                element={
                  <Suspense
                    fallback={
                      <div className='text-center py-5'>
                        <div className='spinner-border' role='status'>
                          <span className='visually-hidden'>Cargando...</span>
                        </div>
                      </div>
                    }
                  >
                    <Login />
                  </Suspense>
                }
              />
              <Route
                path='/register'
                element={
                  <Suspense
                    fallback={
                      <div className='text-center py-5'>
                        <div className='spinner-border' role='status'>
                          <span className='visually-hidden'>Cargando...</span>
                        </div>
                      </div>
                    }
                  >
                    <Register />
                  </Suspense>
                }
              />
              <Route
                path='/guitarras/:id'
                element={
                  <Suspense
                    fallback={
                      <div className='text-center py-5'>
                        <div className='spinner-border' role='status'>
                          <span className='visually-hidden'>Cargando...</span>
                        </div>
                      </div>
                    }
                  >
                    <ProductoCompleto />
                  </Suspense>
                }
              />
              <Route
                path='/accesorios/:id'
                element={
                  <Suspense
                    fallback={
                      <div className='text-center py-5'>
                        <div className='spinner-border' role='status'>
                          <span className='visually-hidden'>Cargando...</span>
                        </div>
                      </div>
                    }
                  >
                    <ProductoCompleto />
                  </Suspense>
                }
              />
              <Route
                path='/amplificadores/:id'
                element={
                  <Suspense
                    fallback={
                      <div className='text-center py-5'>
                        <div className='spinner-border' role='status'>
                          <span className='visually-hidden'>Cargando...</span>
                        </div>
                      </div>
                    }
                  >
                    <ProductoCompleto />
                  </Suspense>
                }
              />
              <Route
                path='/editproductos'
                element={
                  <RutaPrivadaAdmin>
                    <Suspense
                      fallback={
                        <div className='text-center py-5'>
                          <div className='spinner-border' role='status'>
                            <span className='visually-hidden'>Cargando...</span>
                          </div>
                        </div>
                      }
                    >
                    <ListaProductos />
                    </Suspense>
                  </RutaPrivadaAdmin>
                }
              />
              <Route
                path='/buscar/:termino'
                element={
                  <Suspense
                    fallback={
                      <div className='text-center py-5'>
                        <div className='spinner-border' role='status'>
                          <span className='visually-hidden'>Cargando...</span>
                        </div>
                      </div>
                    }
                  >
                    <BuscarResultados />
                  </Suspense>
                }
              />
              <Route
                path='/faq'
                element={
                  <Suspense
                    fallback={
                      <div className='text-center py-5'>
                        <div className='spinner-border' role='status'>
                          <span className='visually-hidden'>Cargando...</span>
                        </div>
                      </div>
                    }
                  >
                    <Faq />
                  </Suspense>
                }
              />
              <Route
                path='/perfil'
                element={
                  <Suspense
                    fallback={
                      <div className='text-center py-5'>
                        <div className='spinner-border' role='status'>
                          <span className='visually-hidden'>Cargando...</span>
                        </div>
                      </div>
                    }
                  >
                    <Perfil />
                  </Suspense>
                }
              />
            </Routes>
            <Suspense
              fallback={
                <div className='text-center py-2'>
                  <div className='spinner-border spinner-border-sm' role='status'></div>
                </div>
              }
            >
            <CarrouselMarcas />
            </Suspense>
            <Suspense
              fallback={
                <div className='text-center py-2'>
                  <div className='spinner-border spinner-border-sm' role='status'></div>
                </div>
              }
            >
            <Footer />
            </Suspense>
          </div>
        </AuthProvider>
      </ProductoProvider>
    </Router>
  )
}

export default App
