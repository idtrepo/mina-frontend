<template>
    <section>
        <header class="mb-6">
            <header class="flex items-center justify-between mb-5">
                <h2 class="text-2xl">Informacion del modulo: <span class="uppercase">{{ modulo.mac }}</span></h2>
                <section>
                    <NButton class="mr-3" secondary type="warning">Editar</NButton>
                    <NButton secondary type="error">Eliminar</NButton>
                </section>
            </header>
            <footer class="grid grid-cols-4 gap-5">
                <article>
                    <p class="uppercase">mac</p>
                    <NInput v-model:value="modulo.mac"/>
                </article>
                <article>
                    <p class="uppercase">cliente</p>
                    <NSelect
                        v-model:value="modulo.idCliente"/>
                </article>
                <article>
                    <p class="uppercase">sucursal</p>
                    <NSelect
                        v-model:value="modulo.idSucursal"/>
                </article>
                <article>
                    <p class="uppercase">area</p>
                    <NSelect
                        v-model:value="modulo.idArea"/>
                </article>
            </footer>
        </header>
        <section>
             <LineChart v-bind:="lineChartProps"/>
        </section>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { DoughnutChart, useDoughnutChart, LineChart, useLineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import useModulosStore from '@/modules/modulos/stores/useModulosStore'
import { NInput, NButton, NSelect } from 'naive-ui'


//Dependencias
const route = useRoute();
const modulosStore = useModulosStore();

//Info modulo
const modulo = ref({
    mac: null,
    idCliente: null,
    idSucursal: null,
    idArea: null,
});

const obtenerModulo = async() => {
    const { id } = route.params;

    try{
        const res = await modulosStore.obtenerModulo({ id });
        asignarDataModulo(res);

        console.log(res);
    }catch({ response: { data: { error:mensaje } } }){
        console.error(mensaje);
    }
}

const asignarDataModulo = ({ data }) => {
    modulo.value = {
        mac: data.mac,
        mina: data.mina,
        area: data.area,
    }
}

//Hooks
onMounted(() => {
    obtenerModulo();
});

Chart.register(...registerables);

const dataValues = ref([30, 40, 60, 70, 5]);
const dataLabels = ref(["Enero", "Febrero", "Marzo", "Abril", "Mayo"]);
const toggleLegend = ref(true);
const testData = computed(() => ({
    labels: dataLabels.value,
    datasets: [
    {
        data: dataValues.value,
        backgroundColor: [
        "#77CEFF",
        "#0079AF",
        "#123E6B",
        "#97B0C4",
        "#A5C8ED",
        ],
    },
    ]
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
</script>