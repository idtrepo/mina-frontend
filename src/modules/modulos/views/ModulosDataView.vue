<template>
    <div>
        <header class="pt-8 flex justify-between gap-3 items-center">
            <button 
                class="py-1 px-8 flex-grow border-2 border-amber-600 uppercase font-bold text-slate-200" 
                @click="() => seleccionarVista(NOMBRE_VISTA.INFO)">
                modulo
            </button>
            <button 
                class="py-1 px-8 flex-grow border-2 border-amber-600 uppercase font-bold text-slate-200" 
                @click="() => seleccionarVista(NOMBRE_VISTA.SENSORES)">
                sensores
            </button>
            <button 
                class="py-1 px-8 flex-grow border-2 border-amber-600 uppercase font-bold text-slate-200"
                @click="() => seleccionarVista(NOMBRE_VISTA.ANALISIS)">
                analisis
            </button>
        </header>
        <section>
            <component :is="vista"/>
        </section>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { defineAsyncComponent } from 'vue'

// componentes
const ModulosDataInfo = defineAsyncComponent(() => import('@/modules/modulos/views/ModulosDataInfoView.vue'));
const ModulosDataSensores = defineAsyncComponent(() => import('@/modules/modulos/views/ModulosDataSensoresView.vue'));
const ModulosDataAnalisis = defineAsyncComponent(() => import('@/modules/modulos/views/ModulosDataAnalisisView.vue'));

// elegir vista
const NOMBRE_VISTA = {
    INFO: 'ModulosDataInfo',
    SENSORES: 'ModulosDataSensores',
    ANALISIS: 'ModulosDataAnalisis',
}

const vistaSeleccionada = ref(NOMBRE_VISTA.INFO);
const vista = computed(() => {
    if(vistaSeleccionada.value === NOMBRE_VISTA.INFO)
        return ModulosDataInfo;

    if(vistaSeleccionada.value === NOMBRE_VISTA.SENSORES)
        return ModulosDataSensores;

    if(vistaSeleccionada.value === NOMBRE_VISTA.ANALISIS)
        return ModulosDataAnalisis;

    return ModulosDataInfo;
})

const seleccionarVista = (nombreVista) => {
    vistaSeleccionada.value = nombreVista;
}
</script>