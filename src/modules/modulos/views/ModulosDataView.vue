<template>
    <section class="w-full h-full">
        <header class="flex gap-x-3 items-center justify-between">
            <button @click="() => seleccionarComponente('ModulosDataInfoView')" class="p-3 flex-grow transition-all duration-200 bg-orange-800/85 hover:cursor-pointer hover:bg-orange-600">
                <span class="text-slate-100 uppercase font-bold">modulo</span>
            </button>
            <button @click="() => seleccionarComponente('ModulosDataAnalisisView')" class="p-3 flex-grow transition-all duration-200 bg-orange-800/85 hover:cursor-pointer hover:bg-orange-600">
                <span class="text-slate-100 uppercase font-bold">analisis</span>
            </button>
            <button @click="() => seleccionarComponente('ModulosDataSensoresView')" class="p-3 flex-grow transition-all duration-200 bg-orange-800/85 hover:cursor-pointer hover:bg-orange-600">
                <span class="text-slate-100 uppercase font-bold">sensores</span>
            </button>
        </header>
        <section class="pt-8">
            <component :is="componenteSeleccionado"/>
        </section>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { defineAsyncComponent } from 'vue'

// componentes
const ModulosDataAnalisisView = defineAsyncComponent(() => import('./ModulosDataAnalisisView.vue'));
const ModulosDataInfoView = defineAsyncComponent(() => import('./ModulosDataInfoView.vue'));
const ModulosDataSensoresView = defineAsyncComponent(() => import('./ModulosDataSensoresView.vue'));

const componentes = {
    ModulosDataInfoView,
    ModulosDataAnalisisView,
    ModulosDataSensoresView,
}
const componente = ref('ModulosDataInfoView');
const componenteSeleccionado = computed(() => componentes[componente.value]);

const seleccionarComponente = nombreComponente => componente.value = nombreComponente;
</script>