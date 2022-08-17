import { defineStore } from 'pinia';
import { GlobalData } from '@/types/GlobalData';

const useGlobalDataStore = defineStore('global', {
  state: () => ({
    data: {} as GlobalData,
    callBackFunc: [] as Function[],
  }),
  actions: {
    setData(data:GlobalData) {
      this.data = data;
      this.callBackFunc.forEach((item) => item());
    },
    setCallBack(func: Function) {
      this.callBackFunc.push(func);
    },
  },
});

export default useGlobalDataStore;
