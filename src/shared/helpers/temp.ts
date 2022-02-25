import path from 'path';
import fs from 'fs';
import { log } from '../../helpers/logger';

export const tempCleaner = () => {
  fs.readdir('temp/', (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      fs.unlink(path.join('temp/', file), () => {
        if (err) throw err;
      });
    });
    log.info('temp/ cleaned');
  });
};

export const tempChecker = async () => {
  if (!fs.existsSync('temp')) fs.mkdirSync('temp');
};
