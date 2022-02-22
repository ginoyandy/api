import { jsPDF } from 'jspdf';
import { Request } from '../model/request.model';

// Default export is a4 paper, portrait, using millimeters for units
const pdf = new jsPDF('p', 'pt', 'a4');

let yCurrent = 0;

const y = (delta: number) => yCurrent += delta;
const textWidth = (text: string) => pdf.getTextWidth(text);

export const makePdf = (request: Request) => {
  const width = pdf.internal.pageSize.getWidth();
  const marginLeft = 40;
  const marginRight = width - 40;
  pdf.setTextColor('#000000');
  pdf.setFont('helvetica', 'normal');

  // Header Region
  yCurrent = 50;

  // Left side Header
  pdf.setFontSize(11);
  pdf.text('Hugo R. Quiroga', marginLeft, yCurrent);

  pdf.setFontSize(9);
  pdf.text('Mart. Judicial M.P. 01-601', marginLeft, y(15));
  pdf.text('Mart. Publico M.P. 05-1052', marginLeft, y(10));
  pdf.text('Corr. Inmobiliario M.P. 02-917', marginLeft, y(10));
  pdf.text('Diplomado en Saneamiento de Títulos', marginLeft, y(10));
  pdf.text('Diplomado en Negocios Inmobiliarios', marginLeft, y(10));

  // PDF IMAGE

  // Right Side Header
  yCurrent = 50;
  pdf.text('Ramírez de Arellano N 1102', marginRight - textWidth('Ramírez de Arellano N 1102'), yCurrent);
  pdf.text('Bedoya 757 - PB "A"', marginRight - textWidth('Bedoya 757 - PB "A"'), y(10));
  pdf.text('Tel. Cel.: 351-7560161', marginRight - textWidth('Tel. Cel.: 351-7560161'), y(10));
  pdf.text('351-7560161', marginRight - textWidth('351-7560161'), y(10));

  yCurrent = 100;
  y(15);
  pdf.line(marginLeft, yCurrent, marginRight, yCurrent);
  // End Header

  // Email field
  pdf.text('quirogayasociados@fibertel.com.ar - hyqasociados@gmail.com', width / 2, y(15), { align: 'center' });

  y(10);
  pdf.line(marginLeft, yCurrent, marginRight, yCurrent);
  // End email field

  // Verificacion registral de inmuelbles field.
  y(12);
  pdf.line(marginLeft, yCurrent, marginRight, yCurrent);

  pdf.setFont('Helvetica', 'bold');
  pdf.text('Verificación Registral de Inmuebles', marginLeft, y(15));

  y(3);
  pdf.line(marginLeft, yCurrent, textWidth('Verificación Registral de Inmuebles') + textWidth('Inmueble'), yCurrent);

  pdf.setFont('helvetica', 'normal');
  pdf.text('Verificación Registral de Inmuebles', marginLeft, y(15));
  pdf.save('hola.pdf');
  // return pdf.output('arraybuffer');
};
