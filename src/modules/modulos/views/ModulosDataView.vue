<template>
    <BaseDataView :config="config">
        <template #contenido="{ editar }">
            <article>
                <p class="uppercase mb-1">mac</p>
                <NInput 
                    v-model:value="modulo.mac"
                    :disabled="!editar"/>
            </article>
            <article>
                <p class="uppercase mb-1">cliente</p>
                <NSelect
                    :options="opcionesClientes"
                    v-model:value="modulo.idCliente"
                    :disabled="!editar"/>
            </article>
            <article>
                <p class="uppercase mb-1">sucursal</p>
                <NSelect
                    :options="opcionesSucursales"
                    v-model:value="modulo.idSucursal"
                    :disabled="!editar"/>
            </article>
            <article>
                <p class="uppercase mb-1">area</p>
                <NSelect
                    :options="opcionesAreas"
                    v-model:value="modulo.idArea"
                    :disabled="!editar"/>
            </article>
        </template>
        <template #graficos>
            <LineChart :chart-data="testData"/>
        </template>
    </BaseDataView>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { ref, computed, provide } from 'vue'
import { defineAsyncComponent } from 'vue' 
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { DoughnutChart, useDoughnutChart, LineChart, useLineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import useModulosStore from '@/modules/modulos/stores/useModulosStore'
import useClientesStore from '@/modules/clientes/stores/useClientesStore'
import useSucursalesStore from '@/modules/sucursales/stores/useSucursalesStore'
import useAreasStore from '@/modules/areas/stores/useAreasStore'
import { NInput, NButton, NSelect } from 'naive-ui'


//Dependencias
const route = useRoute();
const modulosStore = useModulosStore();
const clientesStore = useClientesStore();
const sucursalesStore = useSucursalesStore();
const areasStore = useAreasStore();
const { opcionesClientes } = storeToRefs(clientesStore);
const { opcionesSucursales } = storeToRefs(sucursalesStore);
const { opcionesAreas } = storeToRefs(areasStore);


//Componentes
const BaseDataView = defineAsyncComponent(() => import('@/modules/global/views/BaseDataView.vue'));

//Info modulo
const modulo = ref({
    id: null,
    mac: null,
    idCliente: null,
    idSucursal: null,
    idArea: null,
    sensores: []
});
const listadoData = computed(() => modulo.value.sensores.map(({ data, clave }) => {
    return {
        label: clave,
        data: data.map(({ valor }) => valor)
    }
}))
const etiquetasFechas = computed(() => {
    if(!modulo.value.sensores.length) return [];
    return modulo.value.sensores[0].data.map(({ creado }) => (new Date(creado)).toLocaleString()); 
})

const asignarDataModulo = ({ data }) => {
    const { id, mac, cliente, sucursal, area, sensores } = data;
    modulo.value = {
        id,
        mac,
        idArea: area.id,
        idCliente: cliente.id,
        idSucursal: sucursal.id,
        sensores: sensores?.map(({ clave, data:dataSensor }) => ({
            clave,
            data:dataSensor?.reverse() ?? dataSensor
        })) ?? sensores,
    }

    console.log(modulo.value.sensores);
}

//Obtener data periodicamente
const TIEMPO_REFRESH_DATA = 10_000;
const refDataInterval = ref(null);

//Hooks
onMounted(() => {
    const { params } = route;

    refDataInterval.value = setInterval(() => {
        modulosStore.obtenerModulo({ id: params.id })
        .then(res => {
            console.log('DATOS NUEVOS');
            asignarDataModulo(res);
        })
        .catch(console.log);
    }, TIEMPO_REFRESH_DATA);

    modulosStore.obtenerModulo({ id: params.id })
        .then(res => {
            console.log(res);
            asignarDataModulo(res);
        })
        .catch(console.log);

    clientesStore.obtenerClientes()
        .then(console.log)
        .catch(console.log);

    sucursalesStore.obtenerSucursales()
        .then(console.log)
        .catch(console.log)

    areasStore.obtenerAreas()
        .then(console.log)
        .catch(console.log)
});

onUnmounted(() => {
    clearInterval(refDataInterval.value);
})

Chart.register(...registerables);

const toggleLegend = ref(true);
const testData = computed(() => ({
    labels: etiquetasFechas.value,
    datasets: listadoData.value
}))
const options = computed(() => ({
      scales: {
        myScale: {
          type: "logarithmic",
          position: toggleLegend.value ? "left" : "right",
        },
      },
      plugins: {
        legend: {
          position: toggleLegend.value ? "top" : "bottom",
        },
        title: {
          display: true,
          text: "Niveles de desgaste",
        },
      },
    }));

    const { lineChartProps } = useLineChart({
        chartData: testData,
        options
    })

    const { doughnutChartProps, doughnutChartRef } = useDoughnutChart({
      chartData: testData,
      options,
    });

//Config vista
const config = ref({
    tituloVista: 'datos del modulo',
    editarElemento: null,
    cancelarEdicion: null,
});

provide('elemento', { elemento:modulo });
</script>