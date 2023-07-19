<!-- sheetjs (C) 2013-present  SheetJS -- https://sheetjs.com -->
<template><div>
<h2 class="text-yellow-500 font-bold">{{ data.SheetName1 }}</h2>
<p> author : {{ data.Author }} </p> 
<!-- <p>nbr colonnes : {{data.colsCount}} - nbr lignes : {{ data.rowsCount}}</p> -->
 <!-- <p>daysInfos : {{ data.daysInfos }}</p> -->

 <!-- <PrettyJSON :dataJSON="data.collectionDays"/>  -->
 <hr>
 <!-- <p>listeDays : {{ data.listeDays }}</p>  -->
 

 <div v-for="ji in data.listeDays" :keys="ji">
  <h2 class="text-yellow-500 font-bold mt-10"> {{ data.mainData[_.toNumber(ji) + 1]['jour']}} </h2>
 <p> COUNT : {{ data.mainData[_.toNumber(ji) + 1]['colsCount']}} - START : {{ data.mainData[_.toNumber(ji) + 1]['colStart']}}</p>

    <table class="">
      <thead>
        <tr class="bg-yellow-600">
          <th width="500px">Nom Prénom</th>
              <th>Age</th>
          <th v-for="title in data.wbCols[0]">{{title}}</th>
        </tr>
      </thead> 
      <tbody>
          <tr v-for="(row, index) in data.HTML_tables[_.toNumber(ji) + 1]" v-bind:key="index">
              <td v-for="(value, ind) in row" :keys="ind" class="bg-yellow-200">{{ value }}</td>
        </tr>
    </tbody>
  </table>
</div>
  </div>
</template>
  <script setup>
import _ from 'lodash'

//const firstRow = 5

// const { data } = await useFetch('/api/coligny2')

const path = ref("./assets/coligny.xlsx")

const { data, pending, error, refresh } = await useAsyncData(
  'coligny',
  () => $fetch('/api/coligny', {
    params: {
      path: "./assets/coligny.xlsx"
    }
  }
 ), {
    watch: [path]
  }
)
// const wbJsonDrop = ref(data.wbJson)
// document.getElementById("myTable").innerHTML = data.HTML_table;
</script>
<style>
            table,
            th,
            td {
                border: 1px solid black;
                border-collapse: collapse;
                min-width: 200px;
            }
        </style>