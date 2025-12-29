import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import printJS from "print-js";

// Asignar fuentes vfs verficando distintas estructuras de importación
const vfs =
  pdfFonts.pdfMake?.vfs || pdfFonts.vfs || pdfFonts.default?.pdfMake?.vfs;
if (vfs) pdfMake.vfs = vfs;

const CreatePdf = async (props, output = "print") => {
  return new Promise((resolve, reject) => {
    try {
      const {
        pageSize = {
          width: 226.77,
          height: 841.88,
        },
        pageMargins = [5.66, 5.66, 5.66, 5.66],
        info = {},
        styles = {},
        content = {},
      } = props;

      const docDefinition = {
        pageSize,
        pageMargins,
        info,
        styles,
        content,
      };

      if (output === "b64") {
        const pdfMakeCreatePdf = pdfMake.createPdf(docDefinition);
        pdfMakeCreatePdf.getBase64((data) => {
          resolve({
            success: true,
            content: data,
            message: "Archivo generado correctamente.",
          });
        });
        return;
      } else if (output === "print") {
        const pdfMakeCreatePdf = pdfMake.createPdf(docDefinition);
        pdfMakeCreatePdf.getBase64((data) => {
          printJS({
            printable: data,
            type: "pdf",
            base64: true,
          });
          resolve({
            success: true,
            content: null,
            message: "Archivo impreso correctamente.",
          });
        });
        return;
      } else {
        reject({
          success: false,
          content: null,
          message: "Debes enviar un tipo de salida válido.",
        });
      }
    } catch (error) {
      console.log(error);
      reject({
        success: false,
        content: null,
        message: error?.message ?? "Error al generar el PDF.",
      });
    }
  });
};

export default CreatePdf;
