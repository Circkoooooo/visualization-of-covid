import axiosInstance from '../axiosInstance';

export default () => new Promise((resolve, reject) => {
  axiosInstance.get('https://interface.sina.cn/news/wap/fymap2020_data.d.json').then((res) => {
    if (res.data.data_title === 'fymap') {
      resolve(res.data);
    } else {
      reject(res.data);
      throw new Error('a wrong response data_title');
    }
  });
});
