<template>
<VListadoView
        :elementos="sensoresListado"
        :numElementos="numeroElementos"
        :obtenerListado="obtenerSensores"
        :reiniciarData="reiniciarDataCreacion">
        <template #formulario-buscar>
            <SensoresBuscador/>
        </template>
        <template #formulario-agregar>
            <SensoresFormulario/>
        </template>
    </VListadoView>
    <div >
        <!--formulario para editar el sensor seleccionado-->
        <NModal v-model:show="verModal">
            <NCard title="Editar Sensor" :style="{ width: '600px' }">
                <SensoresFormularioBase :sensor="sensor" :editarSensor="editarSensor"/>
                <div  class="flex justify-between">
                    <NButton type="warning" @click="reiniciarData">Cancelar</NButton>
                    <NButton type="primary" @click="editarSensor">Guardar</NButton>
                </div>
            </NCard>
        </NModal>
    </div>
</template>
<script setup>
import { ref, computed, defineAsyncComponent, onDeactivated, onMounted} from 'vue'
import { useRoute } from 'vue-router'
import useSensores from '../composables/useSensores'
import useTituloStore from '@/stores/useTituloStore';
import { ICONOS } from '@/modules/global/utils/iconos';
import { NCard, NModal, NButton } from 'naive-ui';

//dependencias
const route = useRoute();
const tituloStore = useTituloStore();
const {obtenerSensores, reiniciarDatasensores, numeroElementos, sensoresListado, reiniciarDataCreacion, filtros, sensor, editarSensor, verModal } = useSensores();
const reiniciarData = () => {
    verModal.value = false;
};

//componentes
const VListadoView = defineAsyncComponent(() => import('@/views/listado/VListadoView.vue'))
const SensoresBuscador = defineAsyncComponent(() => import('../components/forms/SensoresBuscador.vue'))
const SensoresFormulario = defineAsyncComponent(() => import('../components/forms/SensoresFormulario.vue'))
const SensoresFormularioBase = defineAsyncComponent(() => import('../components/forms/SensoresFormularioBase.vue'))

onMounted(() => {
    filtros.value.modulo = route.params.id;
    tituloStore.asignarDataTitulo({
        nuevoTitulo: 'Sensores',
        nuevoIcono: ICONOS.SENSORES,
    });
});

onDeactivated(() => {
    reiniciarDatasensores();
});
</script>