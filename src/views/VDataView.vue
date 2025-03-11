<template>
    <VBaseView>
        <template #header>
            <div class="flex items-center justify-end">
                <VBotonesData
                    :id-elemento="idElemento"
                    :editar-elemento="props.editarElemento"
                    :cb-cancelar-edicion="props.cbCancelarEdicion"
                    @editar-elemento="editarElemento"/>
            </div>
        </template>
        <template #contenido-header>
            <slot name="contenido-header" :editar="editar"></slot>
        </template>
        <template #contenido>
            <slot name="contenido" :editar="editar"></slot>
        </template>
    </VBaseView>
</template>

<script setup>
import { ref, computed, toRefs, toValue } from 'vue'
import { defineAsyncComponent, onMounted, onUnmounted } from 'vue'

const props = defineProps({
    idElemento: {
        type: String,
        default: null,
    },
    editarElemento: {
        type: Function,
        default: () => {},
    },
    cbCancelarEdicion: {
        type: Function,
        default: () => {},
    },
    obtenerData: {
        type: Array,
        default: [],
    },
    reiniciarData: {
        type: Array,
        default: [],
    }
});

const { idElemento } = toRefs(props);

// componentes
const VBaseView = defineAsyncComponent(() => import('./VBaseView.vue'));
const VBotonesData = defineAsyncComponent(() => import('@/components/botones/VBotonesData.vue'));

// editar elemento
const editar = ref(false);

const editarElemento = (valorEditar) => {
    editar.value = valorEditar;
}

// ciclo de vida
onMounted(() => {
    Promise.allSettled(props.obtenerData)
        .then(console.log)
        .catch(console.log)
});

onUnmounted(() => {
    for(let reiniciarElemento of props.reiniciarData){
        reiniciarElemento();
    }
});
</script>