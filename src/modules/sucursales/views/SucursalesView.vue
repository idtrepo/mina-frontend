<template>
    <BaseView :config="config">
        <template #modal-form>
            <SucursalesForm/>
        </template>
    </BaseView>
</template>

<script setup>
import { computed } from 'vue'
import { defineAsyncComponent } from 'vue'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import useSucursalesStore from '@/modules/sucursales/stores/useSucursalesStore';
import { SIMBOLO } from '@/modules/global/utils/simbolos';
import useNotificacion from '@/modules/global/composables/useNotificacion';

//Componentes
const BaseView = defineAsyncComponent(() => import('@/modules/global/views/BaseView.vue'))
const SucursalesForm = defineAsyncComponent(() => import('../components/forms/SucursalesForm.vue'))


//Dependencias
const notificacion = useNotificacion();
const sucursalesStore = useSucursalesStore();
const { sucursales } = storeToRefs(sucursalesStore);

//Listado de modulos
const mapSucursales = computed(() => sucursales.value.map(sucursal => ({
    id: sucursal.id,
    titulo: sucursal.nombre,
    icono: SIMBOLO.SUCURSALES
})));

//Hooks
onMounted(() => {
    sucursalesStore.obtenerSucursales()
        .then(console.log)
        .catch(({ response }) => {
            const { data } = response;
            console.log(response);
            notificacion.nError({ mensaje: data.error });
        });
})

//Config vista
const config = computed(() => ({
    data: mapSucursales.value
}))
</script>