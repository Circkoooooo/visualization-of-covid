import { defineStore } from 'pinia';
import { GlobalData } from '../types/GlobalData';

const useGlobalDataStore = defineStore('global', {
  state: () => ({
    data: {} as GlobalData,
  }),
  actions: {
    setData(data:GlobalData) {
      this.data = data;
    },
  },
  getters: {
    getChinaTotal: (state:{data:GlobalData|null}) => {
      if (state.data !== null) {
        return state.data.chinaTotal;
      }
      return null;
    },
  },
});

export default useGlobalDataStore;
