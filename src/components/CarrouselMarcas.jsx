import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

// Logos locales de marcas de guitarras
const logosMarcas = [
  '/img/marcas/fender.png',
  '/img/marcas/gibson.png',
  '/img/marcas/ibanez.png',
  '/img/marcas/prs.png',
  '/img/marcas/yamaha.png',
  '/img/marcas/epiphone.png',
  '/img/marcas/boss.png',
  '/img/marcas/marshall.png',
]

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1200 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 1200, min: 900 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 900, min: 600 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2,
  },
}

function CarrouselMarcas() {
  return (
    <div style={{ background: '#fff', padding: '1rem 0' }}>
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={1800}
        arrows={false}
        showDots={false}
        draggable
        swipeable
        containerClass='carousel-container'
        itemClass='d-flex justify-content-center align-items-center'
      >
        {logosMarcas.map((src, idx) => (
          <div key={idx} style={{ height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={src}
              alt={`Logo marca ${idx + 1}`}
              loading='lazy'
              style={{
                maxHeight: 70,
                maxWidth: '90%',
                objectFit: 'contain',
                filter: 'grayscale(1)',
                opacity: 0.8,
              }}
              onError={(e) => {
                // Fallback a un logo genérico si falla la carga
                e.target.src = 'https://via.placeholder.com/120x60?text=Guitar+Brand'
                console.error(`Error cargando logo: ${src}`)
              }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default CarrouselMarcas
