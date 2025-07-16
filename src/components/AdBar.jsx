import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'

const messages = [
  '🎸 Descubrí nuestras nuevas guitarras vintage.',
  '🚚 Envíos gratis a partir de $50.000.',
  '🔥 Oferta exclusiva: 10% de descuento en accesorios.',
]

function AdBar() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className='section-adbar bg-dark text-white py-2'>
      <Container>
        <div className='adbar-message text-center fs-6'>{messages[index]}</div>
      </Container>
    </section>
  )
}

export default AdBar
