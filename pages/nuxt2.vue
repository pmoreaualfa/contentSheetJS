<!-- sheetjs (C) 2013-present  SheetJS -- https://sheetjs.com -->
<template><div>

   <div>data : {{data}}</div>
   <div> <button @click="getData">getData</button></div>

<!-- 
    <div v-for="item in data.data" v-bind:key="item.name">
      <h2 class="text-yellow-500 font-bold">{{ item.name }}</h2>
      <table class="">
        <thead><tr class="bg-yellow-300">
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>4</th>
          <th>5</th>
          <th>6</th>
          <th>7</th>
          <th>8</th>
          <th>9</th>
          <th>10</th>
        </tr></thead> 
        <tbody>
            <tr v-for="(row, index) in item.data" v-bind:key="index">
            <td class="p-4 text-yellow-500">{{ row.ALFA3A }}</td>
            <td class="bg-yellow-200">{{ row.__EMPTY }}</td>
            <td>{{ row.__EMPTY_1 }}</td>
            <td>{{ row.__EMPTY_2 }}</td>
            <td>{{ row.__EMPTY_3 }}</td>
            <td>{{ row.__EMPTY_4 }}</td>
            <td>{{ row.__EMPTY_5 }}</td>
            <td>{{ row.__EMPTY_6 }}</td>
            <td>{{ row.__EMPTY_7 }}</td>
            <td>{{ row.__EMPTY_8 }}</td>
            <td>{{ row.__EMPTY_9 }}</td>
            <td>{{ row.__EMPTY_10 }}</td>
          </tr>
  
      </tbody>
    </table>
    </div> -->
  </div></template>
  
  <script setup>
// const { data } = await useAsyncData( 'coligny', () => queryContent('/assets/coligny.xlsx').find());
/* const getData =    async () => {
  const { data } = await useAsyncData( 'coligny', () => queryContent('/assets/coligny.xlsx').find());
  console.log('data : ', data)
return data
} */;  

</script>

