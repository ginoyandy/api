import { jsPDF } from 'jspdf';
import { readFileSync } from 'fs';
import { Order } from '../model/order.model';
import { Owner } from '../model/owner.model';

// Helper function
function base64Encode(file: string): any {
  return `data:image/gif;base64,${readFileSync(file, 'base64')}`;
}

// Default export is a4 paper, portrait, using millimeters for units
const pdf = new jsPDF('p', 'pt', 'a4');
const base64Image = base64Encode('src/assets/logoWhite.png');

let yCurrent = 0;

const y = (delta: number) => yCurrent += delta;
const textWidth = (text: string) => pdf.getTextWidth(text);

export const makePdf = (order: Order) => {
  // Utils region
  const width = pdf.internal.pageSize.getWidth();
  const marginLeft = 40;
  const rectanglesMarginLeft = 50;
  const marginRight = width - 40;
  const rectanglesMarginRight = width - 50;
  pdf.setTextColor('#000000');
  pdf.setFont('helvetica', 'normal');

  // Header Region
  yCurrent = 50;

  // Left side Header
  pdf.setFontSize(11);
  pdf.text('Hugo R. Quiroga', marginLeft, yCurrent);

  pdf.setFontSize(10);
  pdf.text('Mart. Judicial M.P. 01-601', marginLeft, y(15));
  pdf.text('Mart. Publico M.P. 05-1052', marginLeft, y(10));
  pdf.text('Corr. Inmobiliario M.P. 02-917', marginLeft, y(10));
  pdf.text('Diplomado en Saneamiento de Títulos', marginLeft, y(10));
  pdf.text('Diplomado en Negocios Inmobiliarios', marginLeft, y(10));

  // PDF IMAGE
  pdf.addImage(base64Image, 'PNG', (width / 2) - 60, 15, 100, 100);

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

  // Verificación registrar de inmuelbles field.
  y(12);

  // Cuadrado
  pdf.line(marginLeft, yCurrent, marginRight, yCurrent);
  pdf.line(marginLeft, yCurrent, marginLeft, yCurrent + 78);
  pdf.line(marginRight, yCurrent, marginRight, yCurrent + 78);

  pdf.setFont('Helvetica', 'bold');
  pdf.text('Verificación Registral de Inmuebles', rectanglesMarginLeft, y(15));

  y(3);
  pdf.line(rectanglesMarginLeft, yCurrent, textWidth('Verificación Registral de Inmuebles') + textWidth('Inmueble') + 10, yCurrent);

  pdf.setFont('helvetica', 'normal');
  pdf.text('Fecha de solicitud: ', rectanglesMarginLeft, y(15));
  pdf.text(order.orderedDate ? order.orderedDate : '-', rectanglesMarginLeft + textWidth('Fecha de solicitud: ') + 10, yCurrent);

  pdf.text('Nro. Solicitud: ', rectanglesMarginRight - textWidth('Nro. Solicitud: ') - textWidth(order.number ? order.number : '-'), yCurrent);
  pdf.text(order.number ? order.number : '-', rectanglesMarginRight - textWidth(order.number ? order.number : '-'), yCurrent);

  pdf.text('BANCO MACRO S.A', rectanglesMarginLeft, y(15));
  pdf.text('Sucursal: 300 - ALVEAR', rectanglesMarginLeft, y(15));

  y(15);
  pdf.line(marginLeft, yCurrent, marginRight, yCurrent);
  // End Cuadrado

  y(12);

  // Cuadrado
  const rectangle2Height = yCurrent + 150;
  pdf.line(marginLeft, yCurrent, marginRight, yCurrent);
  pdf.line(marginLeft, yCurrent, marginLeft, rectangle2Height);
  pdf.line(marginRight, yCurrent, marginRight, rectangle2Height);

  pdf.setFont('Helvetica', 'bold');
  pdf.text('TITULAR / ES: ', rectanglesMarginLeft, y(15));

  pdf.setFont('helvetica', 'normal');
  pdf.text('DNI / CUIT: ', rectanglesMarginRight - 75, yCurrent);

  y(3);
  pdf.line(rectanglesMarginLeft, yCurrent, textWidth('TITULAR / ES: ') + textWidth('TITULAR /'), yCurrent);

  y(20);
  order.owners.forEach((owner: Owner) => {
    pdf.text(owner.firstName, rectanglesMarginLeft + textWidth('TITULAR / ES: '), yCurrent);
    pdf.text(owner.lastName, rectanglesMarginLeft + textWidth(`${owner.firstName} `) + textWidth('TITULAR / ES: '), yCurrent);

    pdf.text(owner.dni, rectanglesMarginRight - 75, yCurrent);
    y(15);
  });

  y(15);
  pdf.line(marginLeft, rectangle2Height, marginRight, rectangle2Height);
  // End Cuadrado

  // Cuadrado
  yCurrent = rectangle2Height;
  y(12);

  const rectangle3Height = yCurrent + 60;

  pdf.line(marginLeft, yCurrent, marginRight, yCurrent);
  pdf.line(marginLeft, yCurrent, marginLeft, rectangle3Height);
  pdf.line(marginRight, yCurrent, marginRight, rectangle3Height);

  y(15);
  const rectangle3Beggining = yCurrent;

  // Left side data.
  pdf.text('Domicilio: ', rectanglesMarginLeft, yCurrent);
  pdf.text(order.adress ? order.adress : '-', rectanglesMarginLeft + textWidth('Domicilio: ') + 10, yCurrent);

  pdf.text('Localidad: ', rectanglesMarginLeft, y(15));
  pdf.text(order.city ? order.city : '-', rectanglesMarginLeft + textWidth('Localidad: ') + 10, yCurrent);

  pdf.text('Sup. Total: ', rectanglesMarginLeft, y(15));
  pdf.text(order.totalArea ? order.totalArea.toString() : '-', rectanglesMarginLeft + textWidth('Sup. Total: ') + 10, yCurrent);

  // Right side data.
  pdf.text('Depto.: ', rectanglesMarginRight - textWidth('Depto.: ') - textWidth(order.department ? order.department : '-'), rectangle3Beggining);
  pdf.text(order.department ? order.department : '-', rectanglesMarginRight - textWidth(order.department ? order.department : '-'), rectangle3Beggining);

  pdf.text('Pcia.: ', rectanglesMarginRight - textWidth('Pcia.: ') - textWidth(order.state ? order.state : '-'), rectangle3Beggining + 15);
  pdf.text(order.state ? order.state : '-', rectanglesMarginRight - textWidth(order.state ? order.state : '-'), rectangle3Beggining + 15);

  pdf.line(marginLeft, rectangle3Height, marginRight, rectangle3Height);
  // End Cuadrado

  pdf.save('hola.pdf');
  // return pdf.output('arraybuffer');
};
