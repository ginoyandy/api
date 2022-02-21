import { Blob } from 'buffer';
import { jsPDF } from 'jspdf';

// Default export is a4 paper, portrait, using millimeters for units
const doc = new jsPDF('p', 'pt', 'a4');

export const makePdf = () => {
  doc.text('Hello world!', 10, 10);
  return new Blob([ doc.output('blob') ], { type: 'blob' });
};
