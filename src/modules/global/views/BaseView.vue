<template>
    <section>
        <header class="mb-5 flex justify-end items-center">
            <section>
                <NButton @click="mostrarBuscador" type="warning" class="mr-1">
                    Busqueda
                </NButton>
                <NButton @click="mostrarFormulario" type="info">
                    Nuevo
                </NButton>
            </section>
        </header>
        <section class="grid grid-cols-4 gap-5 h-full">
            <template v-if="hayData">
                <BaseCarta
                    v-for="idata in data"
                    :data="idata"/>
            </template>
            <template v-else>  
                <section class="h-full flex justify-center items-center col-start-1 col-end-5">
                    <h2 class="uppercase font-bold text-3xl">{{ MENSAJE_INTERFAZ.NO_INFO }}</h2>
                </section> 
            </template>
        </section>
    </section>

    <slot name="modal-form"></slot>
    <slot name="modal-busqueda"></slot>
</template>

<script setup>
import { toRefs, ref, computed, provide, defineAsyncComponent } from 'vue'
import { NButton } from 'naive-ui'
import { MENSAJE_INTERFAZ } from '../utils/mensajes';

//Props
const props = defineProps({
    config: {
        type: Object,
        default: () => ({})
    }
});
const { config } = toRefs(props);

//Data
const hayData = computed(() => config.value?.data?.length ?? null);
const data = computed(() => config.value?.data ?? []);

//Componentes
const BaseCarta = defineAsyncComponent(() => import('@/modules/global/components/cartas/BaseCarta.vue'));

//Mostrar formulario
const verFormulario = ref(false);

const mostrarFormulario = () => {
    verFormulario.value = true;
}

provide('verFormulario', { verFormulario });

//Mostrar buscador
const verBuscador = ref(false);

const mostrarBuscador = () => {
    verBuscador.value = true;
}

provide('verBuscador', { verBuscador })
</script>