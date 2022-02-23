// import { Dropbox, Error, files } from 'dropbox';

// const dbx = new Dropbox({ accessToken: process.env.TOKEN });

// // This uploads basic.js to the root of your dropbox
// dbx
//   .filesUpload({ path: '/basic.js', 'yarn.lock' })
//   .then((response: any) => {
//     console.log(response);
//   })
//   .catch((uploadErr: Error<files.UploadError>) => {
//     console.log(uploadErr);
//   });

import { Dropbox, Error, files } from 'dropbox';
import fs = require('fs');
import path = require('path');
import { makePdf } from './pdf.service';

const dbx = new Dropbox({ accessToken: process.env.TOKEN });

// export const upload = () => {
//   fs.readFile(path.join(__dirname, '/user.service.ts'), 'utf8', (err, contents) => {
//     if (err) {
//       console.log('Error: ', err);
//     }

//     // This uploads basic.js to the root of your dropbox
//     dbx.filesUpload({ path: '/hola/carpeta/user.service.ts', contents })
//       .then((response: any) => {
//         console.log(response);
//       })
//       .catch((uploadErr: Error<files.UploadError>) => {
//         console.log(uploadErr);
//       });
//   });
// };

// export const upload = () => {
//   // This uploads basic.js to the root of your dropbox
//   const pdf: any = makePdf();
//   dbx.filesUpload({ path: '/hola/carpeta/ghola.pdf', contents: pdf })
//     .then((response: any) => {
//       console.log(response);
//     })
//     .catch((uploadErr: Error<files.UploadError>) => {
//       console.log(uploadErr);
//     });
// };

const XLSX = require('xlsx');

export const upload = () => {
  const workBook = XLSX.readFile('/Users/ginomassei/dev/abogada_api/02_12_2021-Quiroga.xlsx');
  console.log(workBook);
  XLSX.writeFile(workBook, 'hola.csv', { bookType: 'csv' });
};
