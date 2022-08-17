import axiosInstance from '../axiosInstance';
import { GlobalData } from '../types/GlobalData';

const handlerJsonp = (rawData:string) => {
  const matchData = rawData.match(/{.+}/);
  if (matchData === null) return null;
  const json = JSON.parse(matchData[0]);

  return json;
};

export default ():Promise<GlobalData|undefined> => new Promise((resolve, reject) => {
  axiosInstance.get('/dataapi/data/yqstaticdata.js?callback=callbackstaticdata').then((res) => {
    const data = res.data as string;
    const handledData = handlerJsonp(data);

    if (res !== null) {
      resolve(handledData);
    } else {
      reject(new Error('fetch err'));
      throw new Error('fetch error');
    }
  });
});
