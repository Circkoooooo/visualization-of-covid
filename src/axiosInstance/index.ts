import axios from 'axios';

const axiosInstance = axios.create({});
axiosInstance.interceptors.request.use((config) => config);

export default {
  get(url:string, paramObj?:Record<string, string>, headers?:Record<string, string>) {
    return axios.get(url, {
      params: paramObj,
      headers,
    });
  },
};
