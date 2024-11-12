<template>
    <VDataView
        :elemento="modulo"
        :editar-elemento="modulosStore.editarModulo"
        :obtener-elemento="modulosStore.obtenerModulo"
        @reiniciar-elemento="reiniciarDataModulo">
        <template #contenido="{ editar }">
            <section class="w-full grid grid-cols-2 lg:grid-cols-4 gap-x-5 lg:gap-5">
                <article class="mb-4">
                    <p class="uppercase mb-1">nombre</p>
                    <NInput
                        v-model:value="modulo.mac"
                        :disabled="!editar"/>
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">cliente</p>
                    <NSelect
                        v-model:value="modulo.idCliente"
                        :options="clientesOpciones"
                        :disabled="!editar"/>
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">sucursal</p>
                    <NSelect
                        v-model:value="modulo.idSucursal"
                        :options="sucursalesOpciones"
                        :disabled="!editar"/>
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">area</p>
                    <NSelect
                        v-model:value="modulo.idArea"
                        :options="areasOpciones"
                        :disabled="!editar"/>
                </article>
            </section>
        </template>
        <template #extra>
            <div class="p-3 bg-slate-200 rounded-md">
                <LineChart :="lineChartProps"/>
            </div>
        </template>    
    </VDataView>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onMounted, onUnmounted, defineAsyncComponent, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router';
import { NSelect, NInput } from 'naive-ui'
import useModulosStore from '../stores/useModulosStore';
import useAreasStore from '@/modules/areas/stores/useAreasStore';
import useClientesStore from '@/modules/clientes/stores/useClientesStore';
import useSucursalesStore from '@/modules/sucursales/stores/useSucursalesStore';
import useDataStore from '../stores/useDataStore';
import { storeToRefs } from 'pinia';
import { ICONOS } from '@/modules/global/utils/iconos';
import { LineChart, useLineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

// dependencias
const route = useRoute();
const modulosStore = useModulosStore();
const areasStore = useAreasStore();
const clientesStore = useClientesStore();
const sucursalesStore = useSucursalesStore();
const dataStore = useDataStore();
const { areasOpciones } = storeToRefs(areasStore);
const { clientesOpciones } = storeToRefs(clientesStore);
const { sucursalesOpciones } = storeToRefs(sucursalesStore);
const { filtros: filtrosData } = storeToRefs(dataStore);

// componentes
const VDataView = defineAsyncComponent(() => import('@/modules/global/views/VDataView.vue'));

//asignar data
const refModulo = ref(null);
const sensores = ref([]);
const modulo = ref({
    id: null,
    mac: null,
    idSucursal: null,
    idCliente: null,
    idArea: null,
})

const reiniciarDatosVista = () => {
    refModulo.value = null;
    sensores.value = [];

    for(let clave in modulo.value){
        modulo.value[clave] = null
    }
}

const reiniciarDataModulo = (data) => {
    modulo.value = { ...data };
}

const asignarDataModulo = ({ data }) => {
    const { id, area, cliente, mac, sucursal } = data;

    modulo.value.id = id;
    modulo.value.idArea = area.id;
    modulo.value.idCliente = cliente.id;
    modulo.value.idSucursal = sucursal.id;
    modulo.value.mac = mac;
}

const asignarDataModuloSensores = ({ data }) => {
    const { sensores:sensoresData } = data;
    sensores.value = sensoresData;

}

// graficas
Chart.register(...registerables);

const sensoresMayorMenor = computed(() => sensores.value.toSorted(ordenarData));
const sensoresDataMayor = computed(() => sensoresMayorMenor.value?.[0]);
const sensoresEtiquetas = computed(() => !sensoresDataMayor.value 
    ? []
    : sensoresDataMayor.value.data
        .map(({ creado }) => new Date(creado).toLocaleTimeString())
        .toReversed()
)
const sensoresData = computed(() => sensores.value.map(({ clave, data:dataSensor }) => {
    const dataReversa = dataSensor
        .toReversed()
        .map(({ valor }) => valor)
    
    return { 
        label: clave, 
        data: dataReversa,
        backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
    }
}))
const dataModulo = computed(() => ({
    labels: sensoresEtiquetas.value,
    datasets: sensoresData.value
}))

const { lineChartProps } = useLineChart({
    chartData: dataModulo,
    options: {
        responsive: true,
        scales: {
            y: { min: 0, max: 100 }
        }
    }
})

function ordenarData({ data:dataA }, { data:dataB }) {
    if(dataA.length > dataB.length) return -1;
    if(dataA.length < dataB.length) return 1;

    return 0;
}

// obtener datos del modulo
const obtenerDatosModulo = async(id) => {
    try{
        const res = await modulosStore.obtenerModulo({ id });
        asignarDataModulo(res);
        console.log(res);
    }catch(err){
        console.error(err);
    }
}

const obtenerDatosSensoresModulo = async(id) => {
    try{
        const res = await modulosStore.obtenerDataModulo({ id });
        asignarDataModuloSensores(res);
        console.log(res);
    }catch(err){
        console.error(err);
    }
}

//lifecycle
const TIEMPO_OBTENCION_DATOS = 5_000;

onMounted(() => {
    const { id } = route.params;
    refModulo.value = setInterval(() => {
        obtenerDatosSensoresModulo(id);
    }, TIEMPO_OBTENCION_DATOS);

    Promise.allSettled([
        obtenerDatosModulo(id),
        obtenerDatosSensoresModulo(id),
        areasStore.obtenerAreas(),
        clientesStore.obtenerClientes(),
        sucursalesStore.obtenerSucursales(),
    ])
        .then(console.log)
        .catch(console.log);
});

onUnmounted(() => {
    clearInterval(refModulo.value);
    reiniciarDatosVista();
});
</script>