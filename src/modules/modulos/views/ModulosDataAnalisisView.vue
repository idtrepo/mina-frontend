<template>
    <div >
        <header class="flex items-center justify-end">
            <div class="fixed right-4 bottom-32 lg:static">
                <VBoton :="configuracionBoton"/>
            </div>
        </header>
        <section class="pt-2">
            <template v-if="numeroElementos > 0">
                <div class="p-3 bg-slate-200 rounded-md">
                    <LineChart :key="dataModulo.datasets.length" :="lineChartProps"/>
                </div>
            </template>
            <template v-else>
                <div class="w-full flex justify-center">
                    <article class="flex items-center text-3xl">
                        <i :class="ICONOS.EQUIS" class="text-xl mr-2"></i>
                        <p class="uppercase font-bold text-3xl">no hay datos encontrados</p>
                    </article>
                </div>
            </template>
        </section>
    </div>

    <NModal v-model:show="verModalBuscar" preset="card" title="Buscar Datos">
        <ModulosBuscadorAnalisis @close="verBuscador = false"/>
    </NModal>
</template>

<script setup>
import { ref, defineAsyncComponent, onMounted, onUnmounted, onUpdated } from 'vue'
import { useRoute } from 'vue-router'
import { LineChart, useLineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { ICONOS } from '@/modules/global/utils/iconos'
import useSensoresStore from '../stores/useSensoresStore'
import useFiltrosStore from '@/stores/useFiltrosStore'
import useModulos from '../composables/useModulos'
import useData from '../composables/useData'
import {NModal} from 'naive-ui'
import useModales from '@/composables/modales/useModales';

// dependencias
const route = useRoute();
const sensoresStore = useSensoresStore();
const {filtros} = useFiltrosStore();
const { reiniciarDataModulos} = useModulos();
const { obtenerDataModulo, dataModulo, numeroElementos } = useData();
let intervalId;
const { id } = route.params;
filtros.modulo = id;
obtenerDataModulo();

const { verModal: verModalBuscar, mostrarModal: mostrarModalBuscar } = useModales();

// componentes
const VBoton = defineAsyncComponent(() => import('@/modules/global/components/VBoton.vue'));
const ModulosBuscadorAnalisis = defineAsyncComponent(() => import('@/modules/modulos/components/forms/ModulosBuscadorAnalisis.vue'))

// graficas
Chart.register(...registerables);

const { lineChartProps } = useLineChart({
    chartData: dataModulo,
    options: {
        responsive: true,
        scales: {
            y: { min: 0, max: 100 }
        }
    }
})

//configuracion
const configuracionBoton = ref({
    titulo: 'buscar',
    icono: ICONOS.BUSCAR,
    tipo: 'advertencia',
    funcionAccion: mostrarModalBuscar,
});

// lifecycle 
onMounted(() => {
    filtros.modulo = id
    sensoresStore.obtenerSensores()
        .then(console.log)
        .catch(console.log)
});

onUpdated(() => {
    filtros.modulo = id;
})

onUnmounted(() => {
    numeroElementos.value = 0;
    clearInterval(intervalId);
    reiniciarDataModulos();
});
</script>