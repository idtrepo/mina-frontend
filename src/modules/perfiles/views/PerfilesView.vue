<template>
    <BaseView :config="config">
    </BaseView>
</template>

<script setup>
import { computed } from 'vue'
import { defineAsyncComponent } from 'vue'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import usePerfilesStore from '@/modules/perfiles/stores/usePerfilesStore';
import { SIMBOLO } from '@/modules/global/utils/simbolos';
import useNotificacion from '@/modules/global/composables/useNotificacion';

//Componentes
const BaseView = defineAsyncComponent(() => import('@/modules/global/views/BaseView.vue'))


//Dependencias
const notificacion = useNotificacion();
const perfilesStore = usePerfilesStore();
const { perfiles } = storeToRefs(perfilesStore);

//Listado de modulos
const mapPerfiles = computed(() => perfiles.value.map(perfil => ({
    id: perfil.id,
    titulo: perfil.nombre,
    icono: SIMBOLO.PERFILES
})));

//Hooks
onMounted(() => {
    perfilesStore.obtenerPerfiles()
        .then(console.log)
        .catch(({ response }) => {
            const { data } = response;
            console.log(response);
            notificacion.nError({ mensaje: data.error });
        });
})

//Config vista
const config = computed(() => ({
    data: mapPerfiles.value
}))
</script>