<template>
    <div>
<p>{{ showJSON}}</p> 
    </div>
</template>

<script setup>
const showJSON = ref('def showJSON')
const props = defineProps({
  dataJSON: {
    type: Object,
    default() {
      return {
        props : 'vide'
      }
    }
  }
})
console.log( 'pretty : ', JSON.stringify(props.dataJSON, null, 4))
showJSON.value = JSON.stringify(props.dataJSON, null,4)

</script>

<style lang="scss" scoped>

</style>