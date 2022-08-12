<script lang="ts" setup>
import Api from '../apis';
import useGlobalDataStore from '../store/globalDataStore';

const globalDataStore = useGlobalDataStore();
const preload = async () => {
  const globalData = await Api.getFullData().then((res) => res);
  if (globalData !== null && globalData !== undefined) {
    globalDataStore.setData(globalData);
  }
};

preload();
</script>
<template>
  <DailyIncreace></DailyIncreace>
</template>
