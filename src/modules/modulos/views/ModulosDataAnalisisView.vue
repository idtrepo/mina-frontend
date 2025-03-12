<template>
    <div class="pt-8">
        <header class="flex items-center justify-end lg:fixed lg:top-32">
            <div class="fixed right-4 bottom-32 lg:static lg:mb-4">
                <VBoton :="configuracionBoton"/>
            </div>
        </header>
        <section class="lg:pt-8">
            <template v-if="numeroElementos > 0">
                <div class="p-3 bg-slate-200 rounded-md">
                    <LineChart :="lineChartProps"/>
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

    <ModulosBuscadorAnalisis/>
</template>

<script setup>
import { ref, provide, computed } from 'vue'
import { useRoute } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'
import { LineChart, useLineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { ICONOS } from '@/modules/global/utils/iconos'
import useSensoresStore from '../stores/useSensoresStore'
import { COLORES } from '../utils/colores';
import useFiltrosStore from '@/stores/useFiltrosStore'
import useModulos from '../composables/useModulos'
import useDataStore from '../stores/useDataStore'

// dependencias
const route = useRoute();
const sensoresStore = useSensoresStore();
const {filtros} = useFiltrosStore();
const {obtenerDataModulo, reiniciarDataModulos} = useModulos();
const datos2 = useDataStore()
const {datos, numeroElementos} = storeToRefs(datos2);
let intervalId

// componentes
const VBoton = defineAsyncComponent(() => import('@/modules/global/components/VBoton.vue'));
const ModulosBuscadorAnalisis = defineAsyncComponent(() => import('@/modules/modulos/components/forms/ModulosBuscadorAnalisis.vue'))

// datos sensores
console.log(datos.value)
const datosSensores = computed(() => datos.value.sensores);

const mayorLongitud = computed(() => Math.max(
    ...datosSensores.value.map(({ data }) => data.length)
));

const etiquetasSensores = computed(() => {
    const [ dataSensor ] = datosSensores.value
        .filter(({ data }) => data.length === mayorLongitud.value);
    const data = dataSensor?.data ?? []
    return data?.map(({ creado }) => creado)?.reverse();
});

const dataSensores = computed(() => datosSensores.value.map(({ data, clave }) => {
    if(data.length === 0) return {
        label: clave,
        data
    }

    return { 
        label: clave, 
        data: data.map(({ valor }) => valor).reverse(), 
        backgroundColor: COLORES,
    };
}));

// graficas
Chart.register(...registerables);

const dataModulo = computed(() => ({
    labels: etiquetasSensores.value,
    datasets: dataSensores.value
}));

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
    funcionAccion: mostrarBuscador,
});

const verBuscador = ref(false);

function mostrarBuscador(){
    verBuscador.value = true;
}

provide('modales', { verBuscador });

//lifecycle 
onMounted(() => {
    const { id } = route.params;

    obtenerDataModulo({id})
            .then(console.log)
            .catch(console.log)
    intervalId = setInterval(() => { 
        obtenerDataModulo({id})
            .then(console.log)
            .catch(console.log)
    }, 5000)
    
    filtros.modulo = id

    sensoresStore.obtenerSensores()
        .then(console.log)
        .catch(console.log)
});

onUnmounted(() => {
    numeroElementos.value = 0;
    clearInterval(intervalId);
    reiniciarDataModulos();
});
</script>