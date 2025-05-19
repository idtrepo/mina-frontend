<template>
    <section class="w-full h-full">
        <div class="grid grid-cols-12 gap-5">
            <header class="p-5 col-span-full lg:col-span-4 bg-slate-900 rounded-md">
                <article>
                    <header class="mb-5">
                        <h3 class="uppercase font-bold">agregar sensor</h3>
                    </header>
                    <section class="mb-5">
                        <article class="mb-4">
                            <p class="mb-1 uppercase text-xs">clave sensor</p>
                            <NInput v-model:value="sensor.clave" clearable />
                        </article>
                    </section>
                    <footer>
                        <NButton @click="crearSensor" class="w-full" type="info">
                            <span class="uppercase font-bold">crear</span>
                        </NButton>
                    </footer>
                </article>
            </header>
            <section class="p-5 col-span-full lg:col-span-8 bg-slate-900 rounded-md">
                <header class="mb-5">
                    <h3 class="uppercase font-bold">listado de sensores</h3>
                </header>
                <NDataTable :columns="columnasTabla" :data="dataTabla" />
            </section>
        </div>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { NDataTable, NInput, NButton } from 'naive-ui'
import useSensores from '../composables/useSensores';

//dependencias
const route = useRoute();
const { sensor, sensores, obtenerSensores, crearSensor } = useSensores();

// listado de sensores
const dataTabla = computed(() => sensores.value.map(({ id, clave, data, infoEstatus }) => ({
    id,
    sensor: clave,
    desgaste: data && data[0] ? `${data[0].valor}%` : null,
    bateria: infoEstatus && infoEstatus[0] ? `${infoEstatus[0].bateria}%` : null,
})));
const columnasTabla = ref([
    {
        title: 'sensor',
        key: 'sensor',
    },
    {
        title: 'desgaste',
        key: 'desgaste',
    },
    {
        title: 'bateria',
        key: 'bateria',
    }
]);

// ciclo de vida
onMounted(() => {
    const { id:idModulo } = route.params;
    sensor.value.idModulo = parseInt(idModulo);

    obtenerSensores({ params: { modulo: idModulo } })
        .then(console.log)
        .catch(console.log);
});
</script>