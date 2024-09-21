<template>
    <BaseView :config="config">
        <template #modal-form>
            <AreasForm/>
        </template>
    </BaseView>
</template>

<script setup>
import { onMounted } from 'vue'
import { computed } from 'vue'
import { defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import useAreasStore from '@/modules/areas/stores/useAreasStore';
import { SIMBOLO } from '@/modules/global/utils/simbolos';
import useNotificacion from '@/modules/global/composables/useNotificacion';


//Componentes
const BaseView = defineAsyncComponent(() => import('@/modules/global/views/BaseView.vue'));
const AreasForm = defineAsyncComponent(() => import('../components/forms/AreasForm.vue'));


//Dependencias
const notificacion = useNotificacion();
const areasStore = useAreasStore();
const { areas } = storeToRefs(areasStore);

//Listado de modulos
const mapAreas = computed(() => areas.value.map(area => ({
    id: area.id,
    titulo: area.nombre,
    icono: SIMBOLO.AREAS
})));

//Hooks
onMounted(() => {
    areasStore.obtenerAreas()
        .then(console.log)
        .catch(({ response }) => {
            const { data } = response;
            console.log(response);
            notificacion.nError({ mensaje: data.error });
        });
})

//Config vista
const config = computed(() => ({
    data: mapAreas.value
}))
</script>