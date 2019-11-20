import * as exif from 'exif';
import logger from './logger';


const readExif = (filePath: string) => {
  return new Promise<exif.ExifData>((resolve, reject) => {
    new exif.ExifImage(filePath, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}


const photosort = async (filepaths: string[], destination: string) => {
  for (let i = 0; i < filepaths.length; i++) {
    const path = filepaths[i];
    try {
      const { exif } = await readExif(path);
      console.log(exif.CreateDate);
    } catch (err) {
      logger.warn(`could not read exif of ${path}`);
    }
  }
}

export default photosort;
