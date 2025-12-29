import { urlToBase64 } from "../utils/Conversions";
import CreatePdf from "../utils/tickets/createPdf";

const TicketSale = async (output, data) => {
  const logoCompany = await urlToBase64(data.logoCompany);

  const dateFormatter = new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const timeFormatter = new Intl.DateTimeFormat("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const currencyFormatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });

  const now = new Date();

  // Calculate total
  const totalAmount = data.products.reduce((acc, product) => {
    return acc + product._quantity * product._sale_price;
  }, 0);

  const productsTableBody = [
    [
      { text: "CANT.", style: "tProductsHeader", alignment: "center" },
      { text: "DESCRIPCIÓN", style: "tProductsHeader", alignment: "left" },
      { text: "P.UNIT", style: "tProductsHeader", alignment: "right" },
      { text: "IMPORTE", style: "tProductsHeader", alignment: "right" },
    ],
    ...data.products.map((product) => {
      const totalLine = product._quantity * product._sale_price;
      return [
        {
          text: product._quantity.toString(),
          style: "tProductsBody",
          alignment: "center",
        },
        { text: product._desc, style: "tProductsBody", alignment: "left" },
        {
          text: currencyFormatter.format(product._sale_price),
          style: "tProductsBody",
          alignment: "right",
        },
        {
          text: currencyFormatter.format(totalLine),
          style: "tProductsBody",
          alignment: "right",
        },
      ];
    }),
  ];

  const content = [
    // Data Company
    {
      image: logoCompany,
      fit: [100, 50], // Adjusted size
      alignment: "center",
      margin: [0, 0, 0, 10],
    },
    {
      text: "NOMBRE EMPRESA", // Should come from data if available
      style: "header",
    },
    {
      text: "Domicilio Comercial: DIRECCIÓN DE LA EMPRESA",
      style: "text",
    },
    {
      text: "CUIT: 30-00000000-0", // Placeholder or data
      style: "text",
    },
    {
      text: "IIBB: 000-000000-0",
      style: "text",
    },
    {
      text: "Inicio de Actividades: 01/01/2020",
      style: "text",
    },
    {
      text: "IVA RESPONSABLE INSCRIPTO", // Or Consumidor Final / Monotributo depending on context
      style: "text",
      margin: [0, 0, 0, 5],
    },

    // Separator line
    {
      canvas: [
        {
          type: "line",
          x1: 0,
          y1: 5,
          x2: 200,
          y2: 5,
          lineWidth: 1,
          dash: { length: 2 },
        },
      ],
      margin: [0, 5, 0, 5],
    },

    // Type Document
    {
      text: "TIQUE FACTURA B",
      style: "subHeader",
    },
    {
      text: "Nro: 0001-00000001",
      style: "subHeader",
    },
    {
      table: {
        widths: ["50%", "50%"],
        body: [
          [
            {
              text: `FECHA: ${dateFormatter.format(now)}`,
              style: "text",
              alignment: "left",
            },
            {
              text: `HORA: ${timeFormatter.format(now)}`,
              style: "text",
              alignment: "right",
            },
          ],
        ],
      },
      layout: "noBorders",
    },

    // Separator line
    {
      canvas: [
        {
          type: "line",
          x1: 0,
          y1: 5,
          x2: 200,
          y2: 5,
          lineWidth: 1,
          dash: { length: 2 },
        },
      ],
      margin: [0, 5, 0, 5],
    },

    // Data Client
    {
      text: "A CONSUMIDOR FINAL", // Default logic often used
      style: "text",
      alignment: "left",
    },
    // Uncomment/Implement this block if client data is strictly required/available
    /*
    {
      table: {
        widths: ["auto", "*"],
        body: [
          [{ text: "CLIENTE:", style: "label" }, { text: "CONSUMIDOR FINAL", style: "value" }],
          [{ text: "DNI/CUIT:", style: "label" }, { text: "00000000", style: "value" }],
          [{ text: "DOMICILIO:", style: "label" }, { text: "-", style: "value" }],
        ],
      },
      layout: "noBorders",
      margin: [0, 0, 0, 5],
    },
    */

    // Separator line
    {
      canvas: [
        {
          type: "line",
          x1: 0,
          y1: 5,
          x2: 200,
          y2: 5,
          lineWidth: 1,
          dash: { length: 2 },
        },
      ],
      margin: [0, 5, 0, 5],
    },

    // Data Products
    {
      margin: [0, 5, 0, 0],
      table: {
        widths: ["15%", "45%", "20%", "20%"], // Adjusted widths
        headerRows: 1,
        body: productsTableBody,
      },
      layout: "noBorders",
    },

    // Separator line
    {
      canvas: [
        {
          type: "line",
          x1: 0,
          y1: 5,
          x2: 200,
          y2: 5,
          lineWidth: 1,
          dash: { length: 2 },
        },
      ],
      margin: [0, 5, 0, 5],
    },

    // Totals
    {
      table: {
        widths: ["*", "40%"],
        body: [
          [
            { text: "SUBTOTAL", style: "tTotals", alignment: "right" },
            {
              text: currencyFormatter.format(totalAmount),
              style: "tTotals",
              alignment: "right",
            },
          ],
          [
            { text: "TOTAL", style: "tTotalsLarge", alignment: "right" },
            {
              text: currencyFormatter.format(totalAmount),
              style: "tTotalsLarge",
              alignment: "right",
            },
          ],
        ],
      },
      layout: "noBorders",
      margin: [0, 5, 0, 10],
    },

    // Footer
    {
      text: "GRACIAS POR SU COMPRA",
      style: "footer",
      margin: [0, 10, 0, 0],
    },
    {
      qr: "https://afip.gob.ar/...", // Placeholder QR
      fit: 75,
      alignment: "center",
      margin: [0, 10, 0, 0],
    },
    {
      text: "CF DGI",
      style: "footer",
      bold: true,
      margin: [0, 2, 0, 0],
    },
  ];

  // Styles Ticket
  const styles = {
    header: {
      fontSize: 12,
      bold: true,
      alignment: "center",
      margin: [0, 0, 0, 2],
    },
    subHeader: {
      fontSize: 10,
      bold: true,
      alignment: "center",
      margin: [0, 0, 0, 2],
    },
    text: {
      fontSize: 9,
      alignment: "center",
      margin: [0, 0, 0, 1],
    },
    label: {
      fontSize: 9,
      bold: true,
    },
    value: {
      fontSize: 9,
    },
    tProductsHeader: {
      fontSize: 9,
      bold: true,
      margin: [0, 2, 0, 2],
    },
    tProductsBody: {
      fontSize: 9,
      margin: [0, 1, 0, 1],
    },
    tTotals: {
      fontSize: 10,
      bold: true,
    },
    tTotalsLarge: {
      fontSize: 12,
      bold: true,
    },
    footer: {
      fontSize: 9,
      alignment: "center",
    },
  };

  const response = await CreatePdf({ content, styles }, output);

  return response;
};

export default TicketSale;
