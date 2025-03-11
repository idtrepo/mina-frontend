<template>

</template>

<script setup>
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import useModulosStore from '@/modules/modulos/stores/useModulosStore'
import {storeToRefs} from "pinia";

const route = useRoute();
const router = useRouter();

const {id} = route.params;
const moduloStore = useModulosStore();
const {filtros} = storeToRefs(moduloStore)
filtros.value.area = id;
console.log(filtros.value.area)
router.push({ name: 'modulos-listado'})
</script>