<template>
    <VDataView
        :elemento="cliente"
        :editar-elemento="clientesStore.editarCliente"
        :obtener-elemento="clientesStore.obtenerCliente"
        @reiniciar-elemento="reiniciarDataCliente">
        <template #contenido="{ editar }">
            <div class="grid grid-cols-1 lg:gap-5">
                <article class="mb-4">
                    <p class="uppercase mb-1">nombre</p>
                    <NInput
                        v-model:value="cliente.nombre"
                        :disabled="!editar"/>
                </article>
            </div>
        </template>    
    </VDataView>
</template>

<script setup>
import { ref } from 'vue'
import { defineAsyncComponent } from 'vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { NInput } from 'naive-ui'
import useClientesStore from '../stores/useClientesStore'

// dependencias
const route = useRoute();
const clientesStore = useClientesStore();

// componentes
const VDataView = defineAsyncComponent(() => import('@/modules/global/views/VDataView.vue')); 

//cliente
const cliente = ref({
    id: null,
    nombre: null,
});

const reiniciarDataCliente = (data) => {
    console.log('REINICIAR DATA CLIENTE', data);
    cliente.value = { ...data };
}

const asignarDataCliente = ({ data }) => {
    console.log('ASIGNANDO DATOS DEL ELEMENTO');

    const { id, nombre } = data;
    cliente.value.id = id;
    cliente.value.nombre = nombre;
}

// lifcycle
onMounted(() => {
    const { id } = route.params;

    console.log('ID DEL CLIENTE: ', id);

    Promise.allSettled([
        clientesStore.obtenerCliente({ id }),
    ])
        .then((res) => {
            const [dataCliente] = res;

            asignarDataCliente(dataCliente.value);
        })
        .catch(console.log);
});
</script>