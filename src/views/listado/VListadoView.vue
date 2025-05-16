<template>
    <section class="w-full h-full">
        <header class="flex items-center justify-between gap-x-2">
            <VHeaderTitulo />
            <VListadoBotones v-if="verBotones" :mostrar-modal-agregar="mostrarModalAgregar" :mostrar-modal-buscar="mostrarModalBuscar" :mostrar-modal-extra="mostrarModalExtra" 
            >
            <template #boton-extra="{ mostrarModalExtra }">
                <slot name="boton-extra" :mostrar-modal-extra="mostrarModalExtra"></slot>
            </template>
        </VListadoBotones>
        </header>
        <template v-if="hayElementos">
            <section class="pt-8 lg:pt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4 rounded-md">
                <VListadoElemento v-for="elemento in elementos" :key="elemento.id" :="elemento" />
            </section>
        </template>
        <template v-else>
            <section class="pt-28 w-full flex justify-center items-center">
                <p class="uppercase font-bold text-slate-500 text-xl lg:text-3xl">sin elementos</p>
            </section>
        </template>
        <footer v-if="verPaginacion && hayElementos" class="pt-5 flex justify-center items-center">
            <NPagination :page-slot="3" v-model:page="pagina" :page-count="numPaginas" @update:page="cambioPagina" />
        </footer>
        <aside>
            <slot name="aside"></slot>
        </aside>

        <template v-if="verBotones">
            <botonesBuscarAgregar>
                <template #formulario-agregar >
                    <slot name="formulario-agregar" ></slot>
                </template>
                <template #formulario-buscar >
                    <slot name="formulario-buscar" />
                </template>
            </botonesBuscarAgregar>
            
            <NModal v-model:show="verModalExtra">
                <slot name="formulario-extra"></slot>
            </NModal>
        </template>
    </section>
</template>

<script setup>
import { ref, computed, toRefs, watch } from 'vue';
import { NPagination, NModal, NCard } from 'naive-ui'
import { onMounted, defineAsyncComponent } from 'vue'
import useModales from '@/composables/modales/useModales';
import {provide} from 'vue'

// dependencias
const { verModal: verModalBuscar, mostrarModal: mostrarModalBuscar } = useModales();
const { verModal: verModalAgregar, mostrarModal: mostrarModalAgregar } = useModales();
const { verModal:verModalExtra, mostrarModal:mostrarModalExtra } = useModales();
// proveemos los modales
provide('verModalAgregar', verModalAgregar)
provide('verModalBuscar', verModalBuscar)

// props
const props = defineProps({
    verBotones: { type: Boolean, default: true },
    verPaginacion: { type: Boolean, default: true },
    numElementosPagina: { type: Number, default: 8 },
    numElementos: { type: Number, default: 1 },
    elementos: { type: Array, required: true },
    obtenerListado: { type: Function, default: () => {} },
    reiniciarData: { type: Function, default: () => {} },
});
const { numElementos, elementos, numElementosPagina, verBotones, verPaginacion } = toRefs(props);

// componentes
const VListadoElemento = defineAsyncComponent(() => import('@/components/listado/VListadoElemento.vue'));
const VListadoBotones = defineAsyncComponent(() => import('@/components/listado/VListadoBotoness.vue'));
const VHeaderTitulo = defineAsyncComponent(()  => import('@/components/header/VHeaderTitulo.vue') )
const botonesBuscarAgregar = defineAsyncComponent(() => import('@/components/botonesBuscarAgregar.vue'));

// listado de listos
const hayElementos = computed(() => elementos.value.length > 0);

watch(verModalAgregar, (newValue) => {
    if(!newValue) props.reiniciarData();
})

// paginacion
const pagina = ref(1);
const numPaginas = computed(() => Math.ceil(numElementos.value / numElementosPagina.value));

const cambioPagina = async (paginaSeleccionada) => {
    await props.obtenerListado({
        params: { pagina: paginaSeleccionada }
    });
}

// ciclo de vida
onMounted(() => {
    if(verPaginacion.value){
        props.obtenerListado({ params: { pagina: pagina.value } })
            .then(console.log)
            .catch(console.log)
    }
})
</script>