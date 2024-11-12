<template>
    <div class="pt-5 md:pt-8">
        <header class="flex items-center justify-between">
            <article class="flex items-center text-xs text-slate-200">
                <div class="w-8 h-8 mr-2 flex justify-center items-center bg-amber-700 rounded-xl">
                    <i :class="icono" class="lg:text-sm"></i>
                </div>
                <h2 class="uppercase font-bold lg:text-3xl">{{ titulo }}</h2>
            </article>
            <article class="fixed right-4 bottom-32 flex flex-col gap-4 lg:gap-2 lg:static lg:flex-row">
                <button @click="mostrarModalFormulario" class="w-16 h-16 lg:h-auto lg:w-auto lg:px-3 lg:py-3 flex items-center justify-center font-bold text-slate-200 rounded-full lg:rounded-sm bg-sky-700">
                    <i class="lg:mr-1":class="ICONOS.NUEVO"></i>
                    <span class="hidden lg:inline uppercase">agregar</span>
                </button>
                <button @click="mostrarModalBuscador" class="w-16 h-16 lg:h-auto lg:w-auto lg:px-3 lg:py-3 flex items-center justify-center font-bold text-slate-200 rounded-full lg:rounded-sm bg-amber-600">
                    <i class="lg:mr-1":class="ICONOS.BUSCAR"></i>
                    <span class="hidden lg:inline uppercase">buscar</span>
                </button>
            </article>
        </header>
        <template v-if="hayElementos">
            <section class="pt-5 md:pt-8 grid grid-cols-1 lg:grid-cols-4 gap-5">
                <VCard 
                    v-for="elemento in elementos"
                    :elemento="elemento"/>
            </section>
        </template>
        <template v-else>
            <section class="pt-20 flex justify-center items-center text-slate-600">
                <i class="text-xl mr-2" :class="ICONOS.EQUIS"></i>
                <h3 class="uppercase font-bold text-2xl">no hay elementos</h3>
            </section>
        </template>
        <footer v-if="hayElementos" class="pt-8 flex justify-center items-center">
            <NPagination 
                v-model:page="filtros.pagina" 
                :page-count="resultados"
                @update-page="obtenerElementos"/>
        </footer>
    </div>

    <slot name="formulario"></slot>
    <slot name="buscador"></slot>
</template>

<script setup>
import { ref, computed, provide, inject } from 'vue'
import { defineAsyncComponent } from 'vue'
import { NButton, NPagination } from 'naive-ui'
import { ICONOS } from '../utils/iconos';
import useTituloStore from '../stores/useTituloStore';
import { storeToRefs } from 'pinia';

// constantes
const NUM_RESULTADOS = 8;

// dependencias 
const tituloStore = useTituloStore();
const { titulo, icono } = storeToRefs(tituloStore);

// componentes
const VCard = defineAsyncComponent(() => import('@/modules/global/components/cartas/VCard.vue'));

// propiedades 
const props = defineProps({
    elementos: {
        type: Array,
        default: () => []
    }, 
    resultados: {
        type: Number,
        default: () => 1
    }
});

const elementos = computed(() => props.elementos);
const resultados = computed(() => Math.ceil(props.resultados / NUM_RESULTADOS));
const hayElementos = computed(() => props.elementos.length > 0);

// mostrar modales
const verFormulario = ref(false);
const verBuscador = ref(false);

const mostrarModalFormulario = () => {
    verFormulario.value = true;
}

const mostrarModalBuscador = () => {
    verBuscador.value = true;
}

const { filtros, obtenerElementos } = inject('filtros');
provide('modales', { verFormulario, verBuscador });
</script>