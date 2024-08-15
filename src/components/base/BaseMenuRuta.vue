<template>
    <article @click="rutaMetodo" class="mb-4 flex flex-col items-center text-slate-300 transition-all duration-150 hover:text-slate-100 hover:cursor-pointer">
        <i class="text-2xl" :class="rutaIcono"></i>
        <p>{{ rutaNombre }}</p>
    </article>
</template>

<script setup>
import { toRefs, computed } from 'vue'

//Propiedades
const props = defineProps({
    ruta: {
        type: Object,
        default: () => ({})
    }
});
const { ruta } = toRefs(props);

//Info ruta
const rutaNombre = computed(() => ruta.value?.nombre ?? '');
const rutaIcono = computed(() => ruta.value?.icono ?? []);
const rutaMetodo = computed(() => ruta.value?.metodo ?? metodoDefecto);

const metodoDefecto = () => {
    console.log('Hola desde la ruta');
}
</script>