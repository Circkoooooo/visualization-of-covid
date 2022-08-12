import axiosInstance from '../axiosInstance';
import { GlobalData } from '../types/GlobalData';

export default ():Promise<GlobalData|undefined> => new Promise((resolve, reject) => {
  axiosInstance.get('/dataapi/ug/api/wuhan/app/data/list-total').then((res) => {
    if (res.data.code === 10000 && res.data.msg === '成功') {
      resolve(res.data.data);
    } else {
      reject(new Error('fetch err'));
      throw new Error('fetch error');
    }
  });
});
