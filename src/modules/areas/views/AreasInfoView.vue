<template>

</template>

<script setup>
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import useFiltrosStore from '@/stores/useFiltrosStore';
import { storeToRefs } from 'pinia'
const route = useRoute();
const router = useRouter();

const {id} = route.params;
const filtrosStore = useFiltrosStore()
const {filtros} = storeToRefs(filtrosStore);
filtros.value = { ...filtros.value, area: id };
console.log(filtros.value.area)
router.push({ name: 'modulos-listado'})
</script>