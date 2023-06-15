const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const WebWhatsappProvider = require('@bot-whatsapp/provider/web-whatsapp')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowChildren1 = addKeyword("1").addAnswer(`
Nuestros productos se destacan por su alta calidad y excelencia. Nos enorgullece ofrecer productos que cumplen con los estándares más exigentes en términos de diseño, fabricación y materiales. Trabajamos arduamente para asegurarnos de que cada producto que sale de nuestras instalaciones cumpla con las expectativas de nuestros clientes.

Utilizamos materiales de primera calidad y llevamos a cabo rigurosos procesos de control de calidad para garantizar que nuestros productos sean duraderos, funcionales y seguros de usar. Además, nos esforzamos por mantenernos actualizados con las últimas tendencias y avances tecnológicos para ofrecerte productos innovadores y modernos.

La satisfacción del cliente es nuestra máxima prioridad, y nos esforzamos por superar tus expectativas en términos de calidad y rendimiento. Estamos seguros de que quedarás satisfecho con la calidad de nuestros productos.`)
.addAnswer("Si te has equivocado o quieres saber mas, saludame de nuevo ☺️")
const flowChildren2 = addKeyword("2").addAnswer(`El período de devolución es de 30 días a partir de la fecha de compra. Para realizar una devolución, asegúrate de conservar el recibo original y los productos en su estado original. `)
.addAnswer("Si te has equivocado o quieres saber mas, saludame de nuevo ☺️")
const flowChildren3 = addKeyword("3").addAnswer(`El tiempo de entrega de los pedidos varía según la ubicación y el método de envío seleccionado. Por lo general, nuestros pedidos son procesados y enviados en un plazo de 1 a 3 días hábiles. Una vez enviado, el tiempo de entrega estimado es de 3 a 7 días hábiles, aunque puede variar. `)
.addAnswer("Si te has equivocado o quieres saber mas, saludame de nuevo ☺️")


const flowPrincipal = addKeyword(['hola', 'ole', 'alo', 'buenaas'])
    .addAnswer(`¡Hola! Soy Furbito, tu asistente de servicio técnico de la tienda de ropa. Estoy aquí para ayudarte con cualquier problema que puedas tener. ¿Puedo ayudarte a resolver alguno de estos problemas?
Problemas de talla: Si necesitas asesoramiento sobre qué talla de ropa te conviene o tienes dudas sobre las medidas, ¡estoy aquí para guiarte!

Escribe 1 si tienes consultas sobre productos: ¿Tienes alguna pregunta sobre nuestros productos? No dudes en preguntar, puedo brindarte información detallada sobre características, materiales y disponibilidad.

Escribe 2 si tienes problemas con devoluciones y cambios: Si necesitas realizar una devolución o cambio de algún artículo, estaré encantado de asistirte en el proceso y proporcionarte las instrucciones necesarias.

Escribe 3 si tienes problemas con el envío: Si tienes algún inconveniente con el envío de tu pedido, como retrasos o errores en la dirección, déjame ayudarte a resolverlo y rastrear tu paquete.

Simplemente elige el número correspondiente a tu consulta o escribe tu problema en detalle, y estaré aquí para ofrecerte la mejor solución. ¡Gracias por elegir Furbito, tu asistente de confianza en el mundo de la moda!`,
 {capture:true}, (ctx, {fallBack}) => {    
    if (ctx.body !== '1' && ctx.body !== '2' && ctx.body !== '3') {
    return fallBack()
    }
    console.log("mensaje entrante", ctx.body)
}, [flowChildren1, flowChildren2, flowChildren3])
/**
 * Esta es la funcion importante es la que realmente inicia
 * el chatbot.
 */
const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(WebWhatsappProvider)
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
}

main()