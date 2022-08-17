<script lang="ts" setup>
import * as echarts from 'echarts';
import useGlobalDataStore from '@/store/globalDataStore';

const globalDataStore = useGlobalDataStore();
const globalData = computed(() => globalDataStore.data);
let chartInstance: echarts.ECharts | null = null;

const dataHandlerConfig = {
  year: '2022年',
  dateNumber: 15,
};
/**
 * 获取每日新增对应的时间
 */
const getDate = () => {
  const dateList = globalData.value.incTrend.map((item) => item.day);
  return dateList.splice(
    dateList.length - dataHandlerConfig.dateNumber,
    dataHandlerConfig.dateNumber,
  );
};
/**
 * 处理每日新增
 */
const getDayInput = () => {
  const dayInputList = globalData.value.incTrend.map((item) => item.sure_cnt);
  return dayInputList.splice(
    dayInputList.length - dataHandlerConfig.dateNumber - 1,
    dataHandlerConfig.dateNumber,
  );
};

/**
 * 设置数据
 */
const setData = () => {
  if (chartInstance === null) return;
  chartInstance.setOption({
    grid: {
      left: '15%',
    },
    xAxis: {
      data: getDate(),
      axisTick: {
        inside: true,
      },
      axisLabel: {
        formatter(value:string) {
          return value;
        },
        showMaxLabel: true,
      },
      boundaryGap: false,
    },
    yAxis: {
    },
    series: [
      {
        name: '每日新增',
        type: 'line',
        data: getDayInput(),
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      padding: [25, 5, 5, 5],
      formatter: `${dataHandlerConfig.year}部分 {name}`,
      selectedMode: false,
    },
  });
};

const init = () => {
  chartInstance = echarts.init(document.getElementById('increace') as HTMLDivElement);
  setData();
};

onMounted(() => {
  globalDataStore.setCallBack(init);
});
</script>
<template>
	<div id="increace" class="increace"></div>
</template>

<style scoped>
.increace {
	height: 25rem;
	width: 25rem;
}
</style>
