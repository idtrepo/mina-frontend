<template>
    <VDataView
        :elemento="area"
        :editar-elemento="areasStore.editarArea"
        :obtener-elemento="areasStore.obtenerArea"
        @reiniciar-elemento="reinciarDataArea">
        <template #contenido="{ editar }">
            <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-5">
                <article class="mb-4">
                    <p class="uppercase mb-1">nombre</p>
                    <NInput
                        v-model:value="area.nombre"
                        :disabled="!editar"/>
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">sucursal</p>
                    <NSelect
                        v-model:value="area.idSucursal"
                        :options="sucursalesOpciones"
                        :disabled="!editar"/>
                </article>
            </div>
        </template>    
    </VDataView>
</template>

<script setup>
import { ref, computed } from 'vue'
import { defineAsyncComponent } from 'vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { NInput, NSelect } from 'naive-ui'
import useAreasStore from '../stores/useAreasStore';
import useSucursalesStore from '@/modules/sucursales/stores/useSucursalesStore';

// dependencias
const route = useRoute();
const areasStore = useAreasStore();
const sucursalesStore = useSucursalesStore();
const { sucursalesOpciones } = storeToRefs(sucursalesStore);

// componentes
const VDataView = defineAsyncComponent(() => import('@/modules/global/views/VDataView.vue')); 

//area
const area = ref({
    id: null,
    nombre: null,
    idSucursal: null
});

const reinciarDataArea = (data) => {
    console.log('REINICIAR DATA AREA', data);
    area.value = { ...data };
}

const asignarDataArea = ({ data }) => {
    console.log('ASIGNANDO DATOS DEL ELEMENTO');

    const { id, nombre, sucursal } = data;
    area.value.id = id;
    area.value.idSucursal = sucursal.id;
    area.value.nombre = nombre;

    console.log(area.value);
}

// lifcycle
onMounted(() => {
    const { id } = route.params;

    Promise.allSettled([
        areasStore.obtenerArea({ id }),
        sucursalesStore.obtenerSucursales(),
    ])
        .then((res) => {
            const [dataArea] = res;

            asignarDataArea(dataArea.value);
        })
        .catch(console.log);
});
</script>