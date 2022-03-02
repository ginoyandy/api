import { jsPDF } from 'jspdf';
import { readFileSync } from 'fs';
import { Order } from '../data/models/Order';
import { Owner } from '../data/models/Owner';

export class PDF {
  private order: Order;
  private pdfName: string;

  constructor() {
    this.pdfName = `${new Date().toISOString().split('.')[0]}.pdf`;
  }

  // Helper function
  private base64Encode = (file: string): any => `data:image/gif;base64,${readFileSync(file, 'base64')}`;

  private renderPdf = () => {
    // Default export is a4 paper, portrait, using millimeters for units
    const pdf = new jsPDF('p', 'pt', 'a4');
    const base64Image = this.base64Encode('src/assets/logoWhite.png');

    let yCurrent = 0;

    const y = (delta: number) => (yCurrent += delta);
    const textWidth = (text: string) => pdf.getTextWidth(text);

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
    pdf.addImage(base64Image, 'PNG', width / 2 - 60, 15, 100, 100);

    // Right Side Header
    yCurrent = 50;
    pdf.text(
      'Ramírez de Arellano N 1102',
      marginRight - textWidth('Ramírez de Arellano N 1102'),
      yCurrent,
    );
    pdf.text(
      'Bedoya 757 - PB "A"',
      marginRight - textWidth('Bedoya 757 - PB "A"'),
      y(10),
    );
    pdf.text(
      'Tel. Cel.: 351-7560161',
      marginRight - textWidth('Tel. Cel.: 351-7560161'),
      y(10),
    );
    pdf.text('351-7560161', marginRight - textWidth('351-7560161'), y(10));

    yCurrent = 100;
    y(15);
    pdf.line(marginLeft, yCurrent, marginRight, yCurrent);
    // End Header

    // Email field
    pdf.text(
      'informescomercialeshq@gmail.com - hqyasociados@gmail.com',
      width / 2,
      y(15),
      { align: 'center' },
    );

    y(10);
    pdf.line(marginLeft, yCurrent, marginRight, yCurrent);
    // End email field

    // Verificación registrar de inmuelbles field.
    y(12);

    // Cuadrado 1
    pdf.line(marginLeft, yCurrent, marginRight, yCurrent);
    pdf.line(marginLeft, yCurrent, marginLeft, yCurrent + 78);
    pdf.line(marginRight, yCurrent, marginRight, yCurrent + 78);

    pdf.setFont('Helvetica', 'bold');
    pdf.text(
      'Verificación Registral de Inmuebles',
      rectanglesMarginLeft,
      y(15),
    );

    y(3);
    pdf.line(
      rectanglesMarginLeft,
      yCurrent,
      textWidth('Verificación Registral de Inmuebles')
        + textWidth('Inmueble')
        + 10,
      yCurrent,
    );

    pdf.setFont('helvetica', 'normal');
    pdf.text('Fecha de solicitud: ', rectanglesMarginLeft, y(15));
    pdf.text(this.order.orderedDate ? this.order.orderedDate.toISOString().split('T')[0] : '-', rectanglesMarginLeft + textWidth('Fecha de solicitud: ') + 10, yCurrent);

    pdf.text(
      'Nro. Solicitud: ',
      rectanglesMarginRight
        - textWidth('Nro. Solicitud: ')
        - textWidth(this.order.orderNumber ?? '-'),
      yCurrent,
    );
    pdf.text(
      this.order.orderNumber ?? '-',
      rectanglesMarginRight - textWidth(this.order.orderNumber ?? '-'),
      yCurrent,
    );

    pdf.text(this.order.bankName ?? '-', rectanglesMarginLeft, y(15));
    pdf.text('Sucursal: ', rectanglesMarginLeft, y(15));
    pdf.text(
      this.order.office ?? '-',
      rectanglesMarginLeft + textWidth('Sucursal: ') + 10,
      yCurrent,
    );

    y(15);
    pdf.line(marginLeft, yCurrent, marginRight, yCurrent);
    // End Cuadrado 1

    y(12);

    // Cuadrado 2
    const rectangle2Height = yCurrent + 150;
    pdf.line(marginLeft, yCurrent, marginRight, yCurrent);
    pdf.line(marginLeft, yCurrent, marginLeft, rectangle2Height);
    pdf.line(marginRight, yCurrent, marginRight, rectangle2Height);

    pdf.setFont('Helvetica', 'bold');
    pdf.text('TITULAR / ES: ', rectanglesMarginLeft, y(15));

    pdf.setFont('helvetica', 'normal');

    pdf.text(
      this.order.ownersObservations ?? '-',
      rectanglesMarginLeft + 20 + textWidth('TITULAR / ES: '),
      yCurrent,
      { maxWidth: 300 },
    );

    pdf.text('DNI / CUIT: ', rectanglesMarginRight - 75, yCurrent);

    y(3);
    pdf.line(
      rectanglesMarginLeft,
      yCurrent,
      textWidth('TITULAR / ES: ') + textWidth('TITULAR /'),
      yCurrent,
    );

    y(35);
    // For each owner, create a line.
    this.order.owners.forEach((owner: Owner) => {
      pdf.text(
        owner.ownership ?? '-',
        rectanglesMarginLeft + textWidth(owner.ownership ?? '-'),
        yCurrent,
      );

      pdf.text(
        owner.firstName ?? '-',
        rectanglesMarginLeft
          + textWidth('TITULAR / ES: ')
          + textWidth(owner.ownership ?? '-'),
        yCurrent,
      );
      pdf.text(
        owner.lastName ?? '-',
        rectanglesMarginLeft
          + textWidth(owner.ownership ?? '-')
          + textWidth(`${owner.firstName ?? '-'} `)
          + textWidth('TITULAR / ES: '),
        yCurrent,
      );

      pdf.text(owner.dni ?? '-', rectanglesMarginRight - 75, yCurrent);
      y(15);
    });

    y(15);
    pdf.line(marginLeft, rectangle2Height, marginRight, rectangle2Height);
    yCurrent = rectangle2Height;
    // End Cuadrado 2

    // Cuadrado 3
    y(12);
    const rectangle3Height = yCurrent + 60;

    pdf.line(marginLeft, yCurrent, marginRight, yCurrent);
    pdf.line(marginLeft, yCurrent, marginLeft, rectangle3Height);
    pdf.line(marginRight, yCurrent, marginRight, rectangle3Height);

    y(15);
    const rectangle3Beggining = yCurrent;

    // Left side data.
    pdf.text('Domicilio: ', rectanglesMarginLeft, yCurrent);
    pdf.text(
      this.order.adress ?? '-',
      rectanglesMarginLeft + textWidth('Domicilio: ') + 10,
      yCurrent,
    );

    pdf.text('Localidad: ', rectanglesMarginLeft, y(15));
    pdf.text(
      this.order.city ?? '-',
      rectanglesMarginLeft + textWidth('Localidad: ') + 10,
      yCurrent,
    );

    pdf.text('Sup. Total: ', rectanglesMarginLeft, y(15));
    pdf.text(this.order.totalArea ? this.order.totalArea.toString() : '-', rectanglesMarginLeft + textWidth('Sup. Total: ') + 10, yCurrent);

    // Right side data.
    pdf.text(
      'Depto.: ',
      rectanglesMarginRight
        - textWidth('Depto.: ')
        - textWidth(this.order.department ?? '-'),
      rectangle3Beggining,
    );
    pdf.text(
      this.order.department ?? '-',
      rectanglesMarginRight - textWidth(this.order.department ?? '-'),
      rectangle3Beggining,
    );

    pdf.text(
      'Pcia.: ',
      rectanglesMarginRight
        - textWidth('Pcia.: ')
        - textWidth(this.order.state ?? '-'),
      rectangle3Beggining + 15,
    );
    pdf.text(
      this.order.state ?? '-',
      rectanglesMarginRight - textWidth(this.order.state ?? '-'),
      rectangle3Beggining + 15,
    );

    pdf.line(marginLeft, rectangle3Height, marginRight, rectangle3Height);
    yCurrent = rectangle3Height;
    // End Cuadrado 3

    // Cuadrado 4
    y(12);
    const rectangle4Height = yCurrent + 60;

    pdf.line(marginLeft, yCurrent, marginRight, yCurrent);
    pdf.line(marginLeft, yCurrent, marginLeft, rectangle4Height);
    pdf.line(marginRight, yCurrent, marginRight, rectangle4Height);

    pdf.setFont('Helvetica', 'bold');
    pdf.text('Informe del Dominio:', rectanglesMarginLeft, y(15));

    y(3);
    pdf.line(
      rectanglesMarginLeft,
      yCurrent,
      textWidth('Informe del Dominio:') + textWidth('Informe del'),
      yCurrent,
    );

    pdf.setFont('helvetica', 'normal');

    pdf.text('MATRICULA: ', rectanglesMarginLeft, y(15));
    pdf.text(this.order.enrollmentNumber ? this.order.enrollmentNumber.toString() : '-', rectanglesMarginLeft + textWidth('MATRICULA: ') + 30, yCurrent);

    pdf.text('FOLIO: ', rectanglesMarginLeft, y(15));
    pdf.text(this.order.folioNumber ? this.order.folioNumber.toString() : '-', rectanglesMarginLeft + textWidth('MATRICULA: ') + 30, yCurrent);

    pdf.text('TOMO: ', rectanglesMarginLeft + textWidth('MATRICULA: ') + 150, yCurrent);
    pdf.text(this.order.volumeNumber ? this.order.volumeNumber.toString() : '-', rectanglesMarginLeft + textWidth('MATRICULA: ') + 160 + textWidth('TOMO: '), yCurrent);

    pdf.text('AÑO: ', rectanglesMarginLeft + textWidth('MATRICULA: ') + 350, yCurrent);
    pdf.text(this.order.yearNumber ? this.order.yearNumber.toString() : '-', rectanglesMarginLeft + textWidth('MATRICULA: ') + 360 + textWidth('AÑO: '), yCurrent);

    pdf.line(marginLeft, rectangle4Height, marginRight, rectangle4Height);
    yCurrent = rectangle4Height;
    // End Cuadrado 4

    // Cuadrado 5
    y(12);
    const rectangle5Height = yCurrent + 200;

    pdf.line(marginLeft, yCurrent, marginRight, yCurrent);
    pdf.line(marginLeft, yCurrent, marginLeft, rectangle5Height);
    pdf.line(marginRight, yCurrent, marginRight, rectangle5Height);

    pdf.setFont('Helvetica', 'bold');
    pdf.text('Observaciones: ', rectanglesMarginLeft, y(15));

    y(3);
    pdf.line(
      rectanglesMarginLeft,
      yCurrent,
      textWidth('Observaciones: ') + textWidth('Observac'),
      yCurrent,
    );
    pdf.setFont('helvetica', 'normal');

    pdf.text(this.order.observations ?? '-', rectanglesMarginLeft, y(15), {
      maxWidth: rectanglesMarginRight - 55,
    });

    pdf.line(marginLeft, rectangle5Height, marginRight, rectangle5Height);
    yCurrent = rectangle5Height;
    // End Cuadrado 5

    pdf.text('COSTO DEL INFORME: $ ', rectanglesMarginLeft, y(25));
    pdf.text(this.order.orderAmmount ? this.order.orderAmmount.toString() : '-', rectanglesMarginLeft + textWidth('COSTO DEL INFORME: $ '), yCurrent);

    pdf.text('VERIFICADOR: ', width / 2, y(15));

    pdf.text('INFORMADO EL DÍA: ', rectanglesMarginLeft, y(15));
    pdf.text(this.order.informedDate ? this.order.informedDate.toISOString().split('T')[0] : '-', rectanglesMarginLeft + textWidth('INFORMADO EL DÍA: '), yCurrent);

    pdf.save(`temp/${this.pdfName}`);
  };

  public makePdf = (order: Order): string => {
    this.order = order;
    this.renderPdf();
    return this.pdfName;
  }
}
