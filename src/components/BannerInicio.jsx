import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function BannerInicio() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const imageSrc = isMobile ? '/img/baner2.jpeg' : '/img/baner1.jpeg'

  return (
    <div style={{ width: '100vw', overflow: 'hidden' }}>
      <Link to='/guitarras'>
        <img
          src={imageSrc}
          alt='Banner'
          loading='lazy'
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            cursor: 'pointer',
          }}
        />
      </Link>
    </div>
  )
}

export default BannerInicio
