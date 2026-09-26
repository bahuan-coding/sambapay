import type { FeatureColumn, FeatureGroup } from './features';

export const esCopy = {
  seoTitle: 'Producto',
  lede: 'Precios locales, local signup y direct connection. Varios adquirentes lado a lado. La tienda digitalizada incluye la terminal. El dinero recaudado localmente vuelve en el menor número de pasos.',
  refusalTitle: 'Lo que no hacemos',
  refusal: 'No tomamos los merchants de nuestros clientes. No disputamos sus cuentas. No hacemos fulfilment ni envío. Dos nichos, sin conflicto de interés.',
  close: 'De punta a punta. Autorizado y capturado en el mercado de adquirencia. Liquidado en la ventana del adquirente. Comisión, reserva, devolución y chargeback salen en el neto. El payout sigue cuando el libro cierra.',
  cta: 'Crear cuenta',
  ctaHref: '/es/signup',
  columns: [
    {
      title: 'Cobrar',
      items: [
        { mark: 'prices', title: 'Precios locales', body: 'El volumen se precifica al MDR que recibe un merchant local.' },
        { mark: 'methods', title: 'Tarjeta y medios locales', body: 'Crédito y débito, 3DS y 2D, más los medios locales de ese mercado.' },
        { mark: 'terminal', title: 'Captura en tarjeta', body: 'La tienda digitalizada incluye la captura en tarjeta para la venta en línea.' },
      ],
    },
    {
      title: 'Conectar',
      items: [
        { mark: 'signup', title: 'Local signup', body: 'Protocolamos los datos del cliente con los socios locales, incluidas las licencias que el adquirente exige.' },
        { mark: 'connection', title: 'Direct connection', body: 'El cliente usa nuestra política comercial local. No cumple cada exigencia del adquirente por su cuenta.' },
        { mark: 'rails', title: 'Adquirentes lado a lado', body: 'Varios adquirentes están en cada mercado. Ninguno solo limita el volumen ni carga el riesgo.' },
      ],
    },
    {
      title: 'Habilitar',
      items: [
        { mark: 'stock', title: 'El stock', body: 'El negocio trae el stock.' },
        { mark: 'store', title: 'La tienda en línea', body: 'Digitalizamos la tienda donde tenemos estructura.' },
        { mark: 'included', title: 'Incluido', body: 'La captura en tarjeta está incluida. No cobramos la tasa de un marketplace.' },
      ],
    },
    {
      title: 'Liquidar',
      items: [
        { mark: 'collect', title: 'Captura local', body: 'El pago se captura en el mercado de adquirencia.' },
        { mark: 'steps', title: 'Liquidación', body: 'El valor liquidado llega en el menor número de saltos.' },
        { mark: 'book', title: 'Conciliación', body: 'Nada se paga antes de que la conciliación cierre.' },
      ],
    },
  ] as FeatureColumn[],
  groups: [
    {
      title: 'PayIn',
      lede: 'Quien compra paga con los medios de ese mercado.',
      items: [
        { icon: 'credit', title: 'Crédito', body: 'Cobros con tarjeta de crédito, autorizados y capturados.' },
        { icon: 'debit', title: 'Débito', body: 'Cobros con tarjeta de débito.' },
        {
          icon: ['visa_secure', 'mastercard_id_check', 'amex_safekey'],
          title: '',
          body: 'Reduzca el chargeback. Use 3DS. El banco de quien compra confirma que es quien compra. Sin ese desafío, el cobro es 2D.',
        },
        { icon: 'pix', title: '', body: 'En Brasil, el pago instantáneo.' },
        { icon: 'boleto', title: 'Boleto', body: 'En Brasil, el boleto bancario.' },
        { icon: 'spei', title: 'SPEI', body: 'En México, la transferencia bancaria instantánea.' },
        { icon: 'oxxo', title: 'OXXO Pay', body: 'En México, el pago en efectivo.' },
        { icon: 'qra', title: 'QR Argentina', body: 'En Argentina, un código en la caja. Quien compra paga desde la billetera que ya tiene en el teléfono.' },
        { icon: 'pagofacil', title: 'Pago Fácil', body: 'En Argentina, el pago en efectivo.' },
        { icon: 'transfer', title: 'Transferencia bancaria', body: 'En Chile, la transferencia bancaria.' },
        { icon: 'brought', title: 'Medios traídos', body: 'El cliente puede traer sus propios medios de pago para conectar localmente.' },
        { icon: 'prices', title: 'Precios locales', body: 'El volumen se precifica al MDR que recibe un merchant local.' },
        { icon: 'capture', title: 'Captura en tarjeta', body: 'La tienda digitalizada incluye la captura en tarjeta para la venta en línea.' },
      ],
    },
    {
      title: 'Cuenta',
      lede: 'El volumen encuentra al adquirente local en este orden.',
      plate: 'rails',
      items: [
        { title: 'Local signup', body: 'Reunimos sus datos y los entregamos a los socios locales.' },
        { title: 'Las licencias', body: 'Ayudamos con las licencias, las regulaciones y las exigencias de instituciones reguladas, para que la aprobación tenga más chance.' },
        { title: 'Direct connection', body: 'Usted no cumple cada exigencia por su cuenta. Usa el volumen de nuestra política comercial local.' },
        { title: 'Lado a lado', body: 'Varios adquirentes locales están en cada mercado. Ninguno solo limita el volumen ni concentra el riesgo.' },
        { title: 'Un sistema', body: 'Un cliente con más de una nacionalidad tiene un sistema, con entidades y equipos locales ya en esos mercados.' },
        { title: 'Cribado', body: 'La empresa y sus dueños se verifican antes de salir al aire.' },
      ],
    },
    {
      title: 'Checkout',
      lede: 'Donde tenemos estructura, la tienda queda en pie en este orden.',
      plate: 'enable',
      items: [
        { title: 'El stock', body: 'El negocio trae el stock. Un marketplace de nicho, o stock compartido entre tiendas físicas.' },
        { title: 'La tienda en línea', body: 'Digitalizamos la tienda donde tenemos estructura.' },
        { title: 'La terminal', body: 'La tienda digitalizada incluye la terminal para la venta en línea.' },
        { title: 'Incluido', body: 'El cliente local de cada mercado tiene el servicio incluido. No cobramos la tasa de un marketplace.' },
        { title: 'Nuestro checkout', body: 'Quien compra paga en el checkout de una tienda que digitalizamos.' },
        { title: 'Su sitio', body: 'O en el propio sitio del merchant, usando nuestro checkout.' },
        { title: 'La empresa', body: 'La digitalización va del CNPJ a las entidades locales, hasta el payout.' },
      ],
    },
    {
      title: 'Liquidación',
      lede: 'El dinero recaudado localmente vuelve en este orden.',
      plate: 'settle',
      items: [
        { title: 'Captura local', body: 'El pago se captura en el mercado de adquirencia.' },
        { title: 'Autorización', body: 'El riel autoriza el intento. La aprobación se cuenta aquí.' },
        { title: 'La ventana', body: 'Los fondos liquidan en la ventana del adquirente. Todo operador tiene una hora de corte.' },
        { title: 'El libro', body: 'El archivo del adquirente se ata al libro, línea por línea. Nada se paga antes de que el libro cierre.' },
        { title: 'Lo que sale', body: 'Tasas, reserva, reembolsos y chargebacks salen antes de que el dinero se mueva.' },
        { title: 'Pocos pasos', body: 'El valor liquidado llega en el menor número de saltos.' },
        { title: 'Payout', body: 'El payout sigue cuando el libro cierra.' },
      ],
    },
  ] as FeatureGroup[],
};

export const esChapters = [
  {
    plate: 'rails' as const,
    title: 'Cómo funcionan los rieles',
    lede: 'El volumen encuentra al adquirente local en este orden.',
    steps: [
      { title: 'Local signup', body: 'Reunimos sus datos y los entregamos a los socios locales.' },
      { title: 'Las licencias', body: 'Ayudamos con las licencias, las regulaciones y las exigencias de instituciones reguladas, para que la aprobación tenga más chance.' },
      { title: 'Lado a lado', body: 'Varios adquirentes locales están en cada mercado. Ninguno solo limita el volumen ni concentra el riesgo.' },
      { title: 'Direct connection', body: 'Usted no cumple cada exigencia por su cuenta. Usa el volumen de nuestra política comercial local y entra en el mercado competitivo.' },
    ],
  },
  {
    plate: 'enable' as const,
    title: 'Cómo queda en pie la tienda',
    lede: 'Donde tenemos estructura, la tienda queda en pie en este orden.',
    steps: [
      { title: 'El stock', body: 'El negocio trae el stock. Un marketplace de nicho, o stock compartido entre tiendas físicas.' },
      { title: 'La tienda en línea', body: 'Digitalizamos la tienda donde tenemos estructura.' },
      { title: 'La terminal', body: 'La tienda digitalizada incluye la terminal para la venta en línea.' },
      { title: 'Incluido', body: 'El cliente local de cada mercado tiene el servicio incluido. No cobramos la tasa de un marketplace.' },
    ],
  },
  {
    plate: 'settle' as const,
    title: 'Cómo vuelve el dinero',
    lede: 'El dinero recaudado localmente vuelve en este orden.',
    steps: [
      { title: 'Recaudado aquí', body: 'El dinero se recauda en el mercado.' },
      { title: 'Pocos pasos', body: 'Llega en el menor número de pasos.' },
      { title: 'El libro', body: 'Nada se mueve antes de que el libro cierre.' },
    ],
  },
];
