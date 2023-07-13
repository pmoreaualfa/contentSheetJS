<!-- sheetjs (C) 2013-present  SheetJS -- https://sheetjs.com -->
<template><div>
<h2 class="text-yellow-500 font-bold">{{ data.SheetName1 }}</h2>
<p> author : {{ data.Author }} </p> 
<p>nbr colonnes : {{_.size(data.wbCols[0])}} - nbr lignes : {{ data.rowsCount}}</p>
 <!-- <p>daysInfos : {{ data.daysInfos }}</p>  -->
<p>mainData : {{ data.mainData[1]['rows'][2] }}</p>
<!-- <input
        type="file"
        onChange={e => {
          const file = e.target.files[0]
          readExcel(file)
        }}
/> -->


    <table class="">
      <thead>
        <tr class="bg-yellow-300">
          <th width="500px">Nom Prénom</th>
              <th>Age</th>
          <th v-for="title in data.wbCols[0]">{{title}}</th>
        </tr>
      </thead> 
      <tbody>
        <tr class="bg-yellow-600">
          <td> - </td>
          <td v-for="col in _.size(data.wbCols[0])">
            {{data.wbDays[0][`__EMPTY_${col}`]}}
          </td>

        </tr>
        <!-- <tr v-for="(row, index) in _.drop(data.wbJson, firstRow)" v-bind:key="index"></tr> -->
          <tr v-for="(row, index) in data.rowsJson" v-bind:key="index">
              <td class="bg-yellow-200">{{ row.__EMPTY }}</td>
              <td v-for="col in _.size(data.wbCols[0])">{{ row[`__EMPTY_${col}`]}}</td>
        </tr>

    </tbody>
  </table>
  </div>
</template>
  <script setup>
import _ from 'lodash'

//const firstRow = 5

// const { data } = await useFetch('/api/coligny2')

const path = ref("./assets/coligny.xlsx")

const { data, pending, error, refresh } = await useAsyncData(
  'coligny2',
  () => $fetch('/api/coligny2', {
    params: {
      path: "./assets/coligny.xlsx"
    }
  }
 ), {
    watch: [path]
  }
)
// const wbJsonDrop = ref(data.wbJson)

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