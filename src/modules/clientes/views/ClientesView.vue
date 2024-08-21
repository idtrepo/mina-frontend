<template>
    <BaseView :config="config"></BaseView>
</template>

<script setup>
import { onMounted } from 'vue'
import { computed } from 'vue'
import { defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import useClientesStore from '@/modules/clientes/stores/useClientesStore';
import { SIMBOLO } from '@/modules/global/utils/simbolos';
import useNotificacion from '@/modules/global/composables/useNotificacion';

//Componentes
const BaseView = defineAsyncComponent(() => import('@/modules/global/views/BaseView.vue'))

//Dependencias
const notificacion = useNotificacion();
const clientesStore = useClientesStore();
const { clientes } = storeToRefs(clientesStore);

//Listado de modulos
const mapClientes = computed(() => clientes.value.map(cliente => ({
    id: cliente.id,
    titulo: cliente.nombre,
    icono: SIMBOLO.CLIENTES
})));

//Hooks
onMounted(() => {
    clientesStore.obtenerClientes()
        .then(console.log)
        .catch(({ response }) => {
            const { data } = response;
            console.log(response);
            notificacion.nError({ mensaje: data.error });
        });
})

//Config vista
const config = computed(() => ({
    data: mapClientes.value
}))
</script>