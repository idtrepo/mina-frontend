<template>
    <section class="w-full h-full">
        <div class="grid grid-cols-12">
            <header class="mb-5 flex items-center justify-end col-span-full">
                <NButton @click="mostrarModalBuscador" type="warning">
                    <span class="uppercase font-bold">buscar</span>
                </NButton>
            </header>
            <section class="p-5 col-span-full rounded-md overflow-y-auto" :class="{ 'bg-slate-900': hayElementos }">
                <template v-if="(hayElementos || hayDatosFechas)">
                    <div class="p-5 w-full bg-slate-200 rounded-md grid grid-cols-12 h-full gap-5">
                        <template v-if="hayElementos">
                            <BarChart :="barChartProps"  class="col-span-12 md:col-span-10"/>
                            <section v-if="sensoresSuperanUmbral.length" class="md:block hidden my-4 p-4 bg-red-100 rounded col-span-2 h-1/2">
                                <h2 class="text-red-700 font-bold mb-2">Sensores con desgaste superior al umbral</h2>
                                <ul class="gap-y-2 flex flex-col">
                                    <li v-for="sensor in sensoresSuperanUmbral" :key="sensor.sensor.id"
                                        class="text-red-700 bg-red-400 p-1 rounded font-bold">
                                        {{ sensor.sensor.clave }}: {{ sensor.valor }}%
                                    </li>
                                </ul>
                            </section>
                        </template>
                        <template v-else>
                            <LineChart v-if="hayDatosFechas" :="lineChartProps" class="col-span-full h-full" />
                            <article v-else class="flex items-center justify-center text-3xl">
                                <i :class="ICONOS.EQUIS" class="text-sm md:text-xl mr-2"></i>
                                <p class="uppercase font-bold text-sm md:text-3xl">no hay datos encontrados</p>
                            </article>
                        </template>
                        <section v-if="sensoresSuperanUmbral.length" class="md:hidden my-4 p-4 bg-red-100 rounded col-span-12 h-1/2">
                                <h2 class="text-red-700 font-bold mb-2">Sensores con desgaste superior al umbral</h2>
                                <ul class="flex flex-col">
                                    <li v-for="sensor in sensoresSuperanUmbral" :key="sensor.sensor.id"
                                        class="text-red-700 bg-red-400 p-1 mt-2 rounded font-bold">
                                        {{ sensor.sensor.clave }}: {{ sensor.valor }}%
                                    </li>
                                </ul>
                            </section>
                    </div>
                </template>
                <template v-else>
                    <div class="w-full pt-12">
                        <article class="flex items-center justify-center text-3xl">
                            <i :class="ICONOS.EQUIS" class="text-sm md:text-xl mr-2"></i>
                            <p class="uppercase font-bold text-sm md:text-3xl">no hay datos encontrados</p>
                        </article>
                    </div>
                </template>
            </section>
        </div>
    </section>

    <NModal v-model:show="verModalBuscar">
        <NCard class="w-11/12 md:w-1/3">
            <section>
                <article>
                    <p class="mb-1 uppercase">fecha</p>
                    <NDatePicker v-model:value="filtros.fecha" :clearable="true" />
                </article>
            </section>
            <footer class="flex gap-x-5 pt-5">
                <NButton @click="obtenerDatosFecha" class="flex-grow" type="info">
                    <span class="uppercase font-bold">buscar</span>
                </NButton>
                <NButton @click="reiniciarDatosConstantes" v-if="filtrosActivos" class="flex-grow" type="warning">
                    <span class="uppercase font-bold">reiniciar</span>
                </NButton>
            </footer>
        </NCard>
    </NModal>
</template>

<script setup>
import { watch, ref, computed, defineAsyncComponent, onMounted, onUnmounted, onUpdated } from 'vue'
import { useRoute } from 'vue-router'
import { LineChart, useLineChart, BarChart, useBarChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { ICONOS } from '@/modules/global/utils/iconos'
import useModulos from '../composables/useModulos'
import useData from '../composables/useData'
import useSensores from '../composables/useSensores'
import { NModal, NCard, NButton, NDatePicker } from 'naive-ui'
import useModales from '@/composables/modales/useModales';
import { formatearFecha, formatearHora } from '@/utils/fechas'

// dependencias
const route = useRoute();
const { id: idModulo } = route.params
const { reiniciarDataModulos } = useModulos();
const { numeroElementos, obtenerData, obtenerDataUnica, datos, filtrosActivos, filtros } = useData();
const { obtenerSensores, sensores } = useSensores();

const { verModal: verModalBuscar, mostrarModal: mostrarModalBuscador } = useModales();

// componentes
const DataBuscador = defineAsyncComponent(() => import('../components/forms/DataBuscador.vue'))

// graficas
Chart.register(...registerables);

// obtener data constante
const refDataConstante = ref(null);
const listadoDataSensores = ref([]);
const hayElementos = computed(() => listadoDataSensores.value.length > 0);
const etiquetaTiempoSensores = computed(() => [formatearHora(listadoDataSensores.value?.[0]?.creado)]);
const sensoresSuperanUmbral = computed(() => {
    return listadoDataSensores.value.filter(({ valor, sensor }) => valor < sensor.umbral);
})
const dataSensores = computed(() => {  
    if(!hayElementos.value) return [];

    return listadoDataSensores.value.map(({ valor, sensor }) => ({
        label: sensor.clave,
        data: [valor],
        backgroundColor: valor > sensor.umbral
            ? '#7ccf00'
            : '#fb2c36'
    }));
})
const dataBarras = computed(() => ({
    labels: etiquetaTiempoSensores.value,
    datasets: dataSensores.value
}))

const { barChartProps } = useBarChart({
    chartData: dataBarras,
    options: {
        aspectRatio: 1,
        responsive: true,
        scales: {
            y: {
                min: 0,
                max: 100
            }
        }
    }
})

const asignarDataSensores = (data) => {
    const dataTransformada = data
        .filter(result => result.status === 'fulfilled')
        .map(({ value }) => value?.data[0])
        .filter(datos => !!datos);

    if (dataTransformada.length === 0) return;

    listadoDataSensores.value = dataTransformada;
}

const obtenerDatosConstantes = async () => {
    try {
        const res = await Promise.allSettled(sensores.value.map(({ id }) => obtenerData({
            params: {
                sensor: id, elementos: 1, fecha: formatearFecha(new Date()),
            }
        })));
        asignarDataSensores(res);
    } catch (err) {
        console.log(err);
    }
}

const obtenerDatosIniciales = async () => {
    try {
        console.log("obteniendo sensores");
        await obtenerSensores({ params: { modulo: idModulo } });
    } catch (err) {
        console.log(err);
    }

    try {
        await obtenerDatosConstantes();
    } catch (err) {
        console.log(err);
    }

    refDataConstante.value = setInterval(() => {
        obtenerDatosConstantes();
    }, 5_000);
}

// obtener data filtrada
const listadoDataFechas = ref([]);
const hayDatosFechas = computed(() => listadoDataFechas.value.length > 0);
const hayElementosExistentes = computed(() => listadoDataFechas.value.every(data => data.length > 0))
const etiquetaTiempoSensoresFecha = computed(() => (listadoDataFechas.value?.map(({ creado }) => formatearHora(creado))) ?? []);
const dataSensoresFecha = computed(() => {
    if (!hayDatosFechas.value) return [];

    return listadoDataFechas.value
        .filter(data => Array.isArray(data) && data.length > 0 && data.at(-1)) // Filtra vacíos o nulos
        .map(data => {
            const { sensor, valor } = data.at(-1);

            return {
                label: sensor.clave,
                data: data.map(({ valor }) => valor),
                borderColor: valor > 50
                    ? '#7ccf00'
                    : '#fb2c36'
            }
        });
})
const dataLineas = computed(() => ({
    labels: etiquetaTiempoSensoresFecha.value,
    datasets: dataSensoresFecha.value
}))

const { lineChartProps } = useLineChart({
    chartData: dataLineas,
    options: {
        aspectRatio: 1,
        responsive: true,
        scales: {
            y: {
                min: 0,
                max: 100
            }
        }
    }
})

const asignarDataFechas = (data) => {
    listadoDataFechas.value = data.map(({ value }) => value.data.reverse());
}

const obtenerDatosFecha = async () => {
    listadoDataSensores.value = []

    try {
        const res = await Promise.allSettled(sensores.value.map(({ id }) => obtenerData({
            params: {
                sensor: id, listado: true,
            }
        })));

        asignarDataFechas(res);
    } catch (err) {
        console.log(err);
    }
}

const reiniciarDatosConstantes = async () => {
    filtros.value.fecha = null;
    listadoDataFechas.value = [];

    obtenerDatosConstantes();
}

watch(filtrosActivos, async (newValue) => {
    console.log(newValue);
    if (newValue) {
        clearInterval(refDataConstante.value);
    } else {
        obtenerDatosConstantes();
        refDataConstante.value = setInterval(() => {
            obtenerDatosConstantes();
        }, 10_000);
    }
})

// ciclo de vida
onMounted(() => {
    obtenerDatosIniciales();
});

onUnmounted(() => {
    clearInterval(refDataConstante.value);
    reiniciarDataModulos();
});
</script>