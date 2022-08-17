<script lang="ts" setup>
import * as echarts from 'echarts';
import useGlobalDataStore from '@/store/globalDataStore';
import chinaMap from '@/static/china.json';

const globalDataStore = useGlobalDataStore();
const cityDayInputMap = ref<HTMLElement | null>(null);
let chartInstance :echarts.ECharts |null = null;

const setData = () => {
  echarts.registerMap('china', chinaMap as any);
  if (chartInstance === null) return;
  chartInstance.setOption({
    title: {
      text: '中国地图',
    },
    series: [{
      type: 'map',
      mapType: 'china',
      zoom: 0.5,
      roam: true,
    }],
  });
};

const init = async () => {
  if (cityDayInputMap.value !== null) {
    chartInstance = echarts.init(cityDayInputMap.value);
    setData();
  }
};

onMounted(() => {
  globalDataStore.setCallBack(init);
});
</script>

<template>
	<div class="city_dayinput_map" ref="cityDayInputMap"></div>
</template>

<style  scoped>
.city_dayinput_map {
	height: 40rem;
	width: 40rem;
}
</style>
