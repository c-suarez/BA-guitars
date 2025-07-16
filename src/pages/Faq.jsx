import { Container, Accordion } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'

function Faq() {
  return (
    <>
      <Helmet>
        <title>Preguntas Frecuentes | BA Guitars</title>
        <meta
          name='description'
          content='Respuestas a las preguntas más comunes sobre envíos, pagos, devoluciones y más en BA Guitars.'
        />
      </Helmet>
      <Container className='my-5'>
        <h1 className='mb-4 text-center fw-bold' style={{ color: '#ff6600' }}>
          Preguntas Frecuentes
        </h1>
        <Accordion defaultActiveKey='0' flush>
          <Accordion.Item eventKey='0'>
            <Accordion.Header>¿Cuáles son los métodos de pago disponibles?</Accordion.Header>
            <Accordion.Body>
              Aceptamos tarjetas de crédito, débito, transferencias bancarias y Mercado Pago. También podés abonar en
              efectivo en nuestro local.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='1'>
            <Accordion.Header>¿Realizan envíos a todo el país?</Accordion.Header>
            <Accordion.Body>
              Sí, realizamos envíos a todo Argentina a través de correo seguro. El costo y tiempo de entrega se calculan
              al finalizar la compra.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='2'>
            <Accordion.Header>¿Puedo retirar mi compra en el local?</Accordion.Header>
            <Accordion.Body>
              Sí, podés retirar tu compra en nuestro local de Talcahuano 333, CABA. Te avisaremos cuando esté lista para
              retirar.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='3'>
            <Accordion.Header>¿Qué hago si el producto llega dañado?</Accordion.Header>
            <Accordion.Body>
              Si tu producto llega dañado, comunicate con nosotros dentro de las 48hs y te lo cambiamos sin costo.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='4'>
            <Accordion.Header>¿Cómo sé si un producto está en stock?</Accordion.Header>
            <Accordion.Body>
              Todos los productos publicados muestran el stock disponible en tiempo real. Si tenés dudas, consultanos
              por WhatsApp.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey='5'>
            <Accordion.Header>¿Puedo devolver un producto?</Accordion.Header>
            <Accordion.Body>
              Sí, tenés 10 días para devolver tu compra si no estás conforme. El producto debe estar en perfectas
              condiciones y con su embalaje original.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  )
}

export default Faq
