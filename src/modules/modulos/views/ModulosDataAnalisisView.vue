<template>
    <div class="pt-8">
        <header class="flex items-center justify-end">
            <div class="fixed right-4 bottom-32 lg:static">
                <VBoton :="configuracionBoton"/>
            </div>
        </header>
        <section class="lg:pt-8">
            <template v-if="numResultados > 0">
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
import useDataStore from '../stores/useDataStore'
import { COLORES } from '../utils/colores'

// dependencias
const route = useRoute();
const sensoresStore = useSensoresStore();
const { filtros:filtrosSensores, sensoresClave } = storeToRefs(sensoresStore);
const dataStore = useDataStore();
const { filtros:filtrosData, data:dataDatosSensores, numResultados } = storeToRefs(dataStore);

// componentes
const VBoton = defineAsyncComponent(() => import('@/modules/global/components/VBoton.vue'));
const ModulosBuscadorAnalisis = defineAsyncComponent(() => import('@/modules/modulos/components/forms/ModulosBuscadorAnalisis.vue'))

// datos sensores
const datosSensores = computed(() => sensoresClave.value.map(clave => {
    const datosSensor = dataDatosSensores.value
        .filter(({ sensor: { clave:claveSensor } }) => claveSensor === clave)
        .map(data => ({ ...data, creado: new Date(data.creado).toLocaleTimeString() }));

    return { data: datosSensor, resultados: datosSensor.length, sensor: clave };
}));

const mayorLongitud = computed(() => Math.max(
    ...datosSensores.value.map(({ resultados }) => resultados)
));

const etiquetasSensores = computed(() => {
    const [ dataSensor ] = datosSensores.value
        .filter(({ resultados }) => resultados === mayorLongitud.value);
    const data = dataSensor?.data ?? []
    return data?.map(({ creado }) => creado)?.toReversed();
});

const dataSensores = computed(() => datosSensores.value.map(({ data, sensor }) => {
    if(data.length === 0) return {
        label: sensor,
        data
    }

    return { 
        label: sensor, 
        data: data.map(({ valor }) => valor).toReversed(), 
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
    filtrosSensores.value.modulo = id;
    filtrosData.value.modulo = id;

    sensoresStore.obtenerSensores()
        .then(console.log)
        .catch(console.log)
});

onUnmounted(() => {
    dataStore.reiniciarFiltros();
    dataDatosSensores.value = [];
    numResultados.value = 0;
});
</script>