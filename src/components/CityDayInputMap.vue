<script lang="ts" setup>
import * as echarts from 'echarts';
import useGlobalDataStore from '@/store/globalDataStore';
import chinaMap from '@/static/china.json';
import { GeoConfigType } from '@/types/MapChart/GeoConfigType';
import { ProvinceData } from '@/types/GlobalData';

const globalDataStore = useGlobalDataStore();
const cityDayInputMap = ref<HTMLElement | null>(null);
const mapGeoConfigs:GeoConfigType[] = [];
let chartInstance: echarts.ECharts | null = null;

const setData = () => {
  echarts.registerMap('china', chinaMap as any);
  if (chartInstance === null) return;
  chartInstance.setOption({
    title: {
      text: '中国疫情地图',
      left: 'center',
      padding: [25, 5, 5, 5],
    },
    geo: [{
      map: 'china',
      roam: true,
      label: {
        show: true,
        formatter: ((param:{name:string, status:string}) => {
          const { name } = param;
          const keys = ['市', '省', '回族自治区', '维吾尔自治区', '壮族自治区', '特别行政区', '自治区'];
          const key = keys.find((item) => name.includes(item)) as string;
          return name.replace(key, '');
        }),
      },
      regions: mapGeoConfigs,
    }],
    scaleLimit: {
      min: 1,
      max: 3,
    },
    tooltip: {
      trigger: 'axis',
    },
  });
};
/**
 *
 */
const setMapGeoRegionConfigs = () => {
  const list:GeoConfigType[] = [];
  const nameList:GeoConfigType[] = chinaMap.features.map((item) => ({
    name: item.properties.name,
    itemStyle: {
      areaColor: '#fff',
      color: '#fff',
    },
  }));
  list.push(...nameList);
  mapGeoConfigs.splice(0);
  mapGeoConfigs.push(...list);
};

/**
 * 根据感染程度设置颜色
 */
const setAreaStyle = () => {
  let compareName = '';
  /**
   * 获取对应地区在配置中的索引
   * @param item
   */
  const findTargetIndex = (item:ProvinceData) => {
    if (item.childStatistic.startsWith('中国')) {
      compareName = item.childStatistic.substring(2);
    }
    const index = mapGeoConfigs.findIndex((config) => config.name.includes(compareName));
    return index;
  };

  globalDataStore.data.provinceArray.forEach((item) => { // 中国台湾
    compareName = item.childStatistic;
    const index = findTargetIndex(item);
    if (index !== -1) {
      const currentNumber = parseInt(item.currentConfirm, 10);
      if (currentNumber >= 500) {
        mapGeoConfigs[index].itemStyle.areaColor = '#ff0000';
      } else if (currentNumber >= 100) {
        mapGeoConfigs[index].itemStyle.areaColor = '#e55a4e';
      } else if (currentNumber >= 10) {
        mapGeoConfigs[index].itemStyle.areaColor = '#f59e83';
      } else if (currentNumber >= 1) {
        mapGeoConfigs[index].itemStyle.areaColor = '#fdebcf';
      } else {
        mapGeoConfigs[index].itemStyle.areaColor = '#e9f0f7';
      }
    }
  });
};

const init = async () => {
  if (cityDayInputMap.value !== null) {
    chartInstance = echarts.init(cityDayInputMap.value);
    setMapGeoRegionConfigs();
    setAreaStyle();
    setData();
  }
};

onMounted(() => {
  globalDataStore.setCallBack(init);
});
</script>

<template>
  <div class="city_dayinput_map"
      ref="cityDayInputMap"></div>
</template>

<style  scoped>
.city_dayinput_map {
  height: 40rem;
  width: 40rem;
}
</style>
