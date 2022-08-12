<script lang="ts" setup>
import * as echarts from 'echarts';
import useGlobalDataStore from '../store/globalDataStore';

const globalDataStore = useGlobalDataStore();
const chinaDayList = computed(() => globalDataStore.data);

/**
 * 监听到chinaDayList数据后渲染数据
 * 深度监听chinaDayList数据变化后，重新赋值数据实现动态式。
 */
let increaceMap:echarts.ECharts|null = null;
const renderLineMap = () => {
  increaceMap = echarts.init(document.getElementById('increace') as HTMLDivElement);
  increaceMap.dispatchAction({
    type: 'highlight',
    seriesIndex: 0,
    dataIndex: 0,
  });
};
/**
 * 设置数据
 */
const setData = () => {
  if (increaceMap === null) return;
  increaceMap.setOption({
    xAxis: {
      data: chinaDayList.value.chinaDayList.map((item) => item.date),
    },
    yAxis: {},
    series: [
      {
        name: '每日新增',
        type: 'line',
        data: chinaDayList.value.chinaDayList.map((item) => item.today.input),
      },
    ],
  });
};

watch(chinaDayList, (newVal) => {
  if (newVal !== undefined && increaceMap === null) {
    renderLineMap();
    setData();
  } else {
    setData();
  }
}, {
  deep: true,
});
</script>
<template>
	<div id="increace"></div>
</template>
<style scoped>
#increace {
	height: 600px;
	width: 100%;
}
</style>
