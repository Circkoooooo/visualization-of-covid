<script lang="ts" setup>
import './HomePage.css';
import Api from '@/apis';
import useGlobalDataStore from '@/store/globalDataStore';

const globalDataStore = useGlobalDataStore();
const preload = async () => {
  const globalData = await Api.getFullData().then((res) => res);
  if (globalData !== null && globalData !== undefined) {
    globalDataStore.setData(globalData);
  } else {
    throw new Error('cannot get global data');
  }
};
preload();
</script>
<template>
  <div class="homepage">
    <div class="left_block">
      <DailyIncreace></DailyIncreace>
    </div>
    <div class="center_block">
      <CityDayInputMap></CityDayInputMap>
    </div>
    <div class="right_block">

    </div>
  </div>
</template>
