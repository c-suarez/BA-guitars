import React from 'react'
import Guitarras from './Guitarras'
import SeccionesCategoria from '../components/SeccionesCategoria'
import SeccionDecorativa from '../components/SeccionDecorativa'
import Carrousel from '../components/Carrousel'
import { Helmet } from 'react-helmet-async'
const Home = () => {
  return (
    <>
      <Helmet>
        <title>BA Guitars | Tienda de Guitarras y Accesorios</title>
        <meta
          name='description'
          content='Descubrí la mejor selección de guitarras, bajos y accesorios en BA Guitars. Envíos a todo el país. ¡Viví la música!'
        />
      </Helmet>
      <SeccionDecorativa />
      <SeccionesCategoria />
      <div className='my-4'>
        <Carrousel />
      </div>
    </>
  )
}

export default Home
