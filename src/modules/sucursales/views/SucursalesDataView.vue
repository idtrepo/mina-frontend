<template>
    <VDataView
        :elemento="sucursal"
        :editar-elemento="sucursalesStore.editarSucursal"
        :obtener-elemento="sucursalesStore.obtenerSucursal"
        @reiniciar-elemento="reinciarDataSucursal">
        <template #contenido="{ editar }">
            <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-5">
                <article class="mb-4">
                    <p class="uppercase mb-1">nombre</p>
                    <NInput
                        v-model:value="sucursal.nombre"
                        :disabled="!editar"/>
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">cliente</p>
                    <NSelect
                        v-model:value="sucursal.idCliente"
                        :options="clientesOpciones"
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
import useSucursalesStore from '@/modules/sucursales/stores/useSucursalesStore';
import useClientesStore from '@/modules/clientes/stores/useClientesStore'

// dependencias
const route = useRoute();
const clientesStore = useClientesStore();
const sucursalesStore = useSucursalesStore();
const { clientesOpciones } = storeToRefs(clientesStore);

// componentes
const VDataView = defineAsyncComponent(() => import('@/modules/global/views/VDataView.vue')); 

//sucursal
const sucursal = ref({
    id: null,
    nombre: null,
    idCliente: null
});

const reinciarDataSucursal = (data) => {
    sucursal.value = { ...data };
}

const asignarDataSucursal = ({ data }) => {
    const { id, nombre, cliente } = data;
    sucursal.value.id = id;
    sucursal.value.nombre = nombre;
    sucursal.value.idCliente = cliente.id;
}

// lifcycle
onMounted(() => {
    const { id } = route.params;

    Promise.allSettled([
        sucursalesStore.obtenerSucursal({ id }),
        clientesStore.obtenerClientes(),
    ])
        .then((res) => {
            const [dataSucursal] = res;

            asignarDataSucursal(dataSucursal.value);
        })
        .catch(console.log);
});
</script>