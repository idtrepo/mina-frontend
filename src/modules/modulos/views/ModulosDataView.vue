<template>
    <section class="w-full h-full">
        <header class="flex gap-x-3 items-center justify-between">
            <ModulosBoton 
                v-for="boton in listadoBotones"
                :key="boton.titulo"
                :="boton"/>
        </header>
        <section class="pt-5">
            <component :is="componenteSeleccionado"/>
        </section>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { defineAsyncComponent } from 'vue'

// componentes
const ModulosBoton = defineAsyncComponent(() => import('../components/botones/ModulosBoton.vue'));
const ModulosDataAnalisisView = defineAsyncComponent(() => import('./ModulosDataAnalisisView.vue'));
const ModulosDataInfoView = defineAsyncComponent(() => import('./ModulosDataInfoView.vue'));
const ModulosDataSensoresView = defineAsyncComponent(() => import('./ModulosDataSensoresView.vue'));

// logica para seleccionar componentesiiiiiiii
const componentes = {
    ModulosDataInfoView,
    ModulosDataAnalisisView,
    ModulosDataSensoresView,
}
const componente = ref('ModulosDataInfoView');
const componenteSeleccionado = computed(() => componentes[componente.value]);
const listadoBotones = ref([
    {
        titulo: 'modulo',
        accion: () => seleccionarComponente('ModulosDataInfoView')
    },
    {
        titulo: 'analisis',
        accion: () => seleccionarComponente('ModulosDataAnalisisView')
    },
    {
        titulo: 'sensores',
        accion: () => seleccionarComponente('ModulosDataSensoresView')
    },
]);

const seleccionarComponente = nombreComponente => componente.value = nombreComponente;
</script>