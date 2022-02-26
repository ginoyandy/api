import { Dropbox } from 'dropbox';
import { log } from '../shared/helpers/logger';

export const uploadFile = async (file: any, fileName: string, isPDF: boolean) => {
  try {
    const dbx = new Dropbox({ accessToken: process.env.TOKEN });
    const filePath = (isPDF) ? '/pdfs' : '/excels';
    return await dbx.filesUpload({ path: `${filePath}/${fileName}`, contents: file });
  } catch (uploadErr) {
    log.error(uploadErr);
    throw Error(uploadErr);
  }
};
