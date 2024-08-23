<template>
    <BaseView :config="config">
        <template #modal-form>
            <ModulosForm/>
        </template>
    </BaseView>

</template>

<script setup>
import { onMounted } from 'vue'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { defineAsyncComponent } from 'vue'
import useModulosStore from '@/modules/modulos/stores/useModulosStore';
import { SIMBOLO } from '@/modules/global/utils/simbolos'
import { VISTA } from '@/modules/global/utils/vistas';

//Componentes
const BaseView = defineAsyncComponent(() => import('@/modules/global/views/BaseView.vue'));
const ModulosForm = defineAsyncComponent(() => import('../components/forms/ModulosForm.vue'))

//Dependencias
const modulosStore = useModulosStore();
const { modulos } = storeToRefs(modulosStore);

//Listado de modulos
const mapModulos = computed(() => modulos.value.map(({ id, mac, cliente, area }) => ({
    id,
    titulo: mac,
    secundario: cliente?.nombre ?? '',
    terceario: area?.nombre ?? '',
    icono: SIMBOLO.MODULOS,
    vista: VISTA.MODULOS_DATA
})));

//Hooks
onMounted(() => {
    modulosStore.obtenerModulos()
        .then(console.log)
        .catch(({ response }) => {
            const { data } = response;
            console.log(response);
            notificacion.nError({ mensaje: data.error });
        });
})

//Config vista
const config = computed(() => ({
    data: mapModulos.value
}))
</script>