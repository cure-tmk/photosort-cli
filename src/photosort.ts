import * as path from 'path';
import * as exif from 'exif';
import * as moment from 'moment';
import * as mv from 'move-file';
import * as mkdir from 'make-dir';
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

const padZero = (num: number, length: number = 2) => {
  return ('0000000000' + num).slice(-length);
}

const generateDestFile = (dest: string, dateTimeString: string): string => {
  const date = moment(dateTimeString, 'YYYY:MM:DD hh:mm:ss');
  if (!date.isValid()) {
    throw new Error('invalid date error');
  }
  const year = date.year()
  const month = [year, padZero(date.month() + 1)].join('_');
  const day = [month, padZero(date.date())].join('_');
  return `${dest}/${year}/${month}/${day}/`
}

const photosort = async (filepaths: string[], destination: string) => {
  const dest = destination[destination.length - 1] === '/' ? destination.slice(0, -1) : destination;
  for (let i = 0; i < filepaths.length; i++) {
    const filepath = filepaths[i];
    const filename = path.basename(filepath);
    try {
      const { exif } = await readExif(filepath);
      const destPath = generateDestFile(dest, exif.CreateDate);
      await mkdir(destPath);
      await mv(filepath, `${destPath}/${filename}`);
      logger.default(`successfully sorted photos! > ${filepath}`)
    } catch (err) {
      logger.error(`failed to sort ${filepath}`);
      console.warn(err)
    }
  }
}

export default photosort;
