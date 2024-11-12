<template>
    <NModal v-model:show="verBuscador">
        <NCard class="w-11/12 md:w-9/12 lg:w-1/3">
            <article>
                <header>
                    <h2 class="uppercase font-bold">buscar datos</h2>
                </header>
                <section class="pt-3">
                    <article class="mb-4">
                        <p class="uppercase mb-1">fecha</p>
                        <NDatePicker clearable v-model:value="filtros.fecha"/>
                    </article>
                </section>
                <footer class="pt-5 flex justify-between items-center gap-5">
                    <NButton v-if="filtroActivo" @click="reiniciar" type="warning" class="flex-grow">
                        <span class="uppercase font-bold">reiniciar</span>
                    </NButton>
                    <NButton @click="obtenerDatos" type="warning" class="flex-grow">
                        <span class="uppercase font-bold">buscar</span>
                    </NButton>
                </footer>
            </article>
        </NCard>
    </NModal>
</template>

<script setup>
import { inject } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import useDataStore from '../../stores/useDataStore';
import { NModal, NCard, NButton, NDatePicker, } from 'naive-ui'
import useNotificacion from '@/modules/global/composables/useNotificacion';
import { MENSAJE_ERROR, MENSAJE_EXITO } from '@/modules/global/utils/mensajes';

// dependencias
const route = useRoute();
const dataStore = useDataStore();
const notifiacion = useNotificacion();
const { filtros, filtroActivo, data } = storeToRefs(dataStore);

//inyeccion
const { verBuscador } = inject('modales')

const reiniciar = async() => {
    const { id } = route.params;

    dataStore.reiniciarFiltros();
    filtros.value.modulo = id;
    data.value = []

}

// data sensores
const obtenerDatos = async() => {
    filtros.value.listado = true;

    try{
        const res = await dataStore.obtenerData();
        notifiacion.nExito({ mensaje: MENSAJE_EXITO.LISTADO });
    }catch(err){
        notifiacion.nError({ mensaje: MENSAJE_ERROR.LISTADO });
    }finally{
        filtros.value.listado = false;
    }

}
</script>