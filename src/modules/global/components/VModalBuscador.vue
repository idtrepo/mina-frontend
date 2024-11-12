<template>
    <NModal v-model:show="verBuscador">
        <NCard class="w-11/12 md:w-9/12 lg:w-1/3">
            <slot></slot>
        </NCard>
    </NModal>
</template>

<script setup>
import { inject, watch } from 'vue'
import { NModal, NCard } from 'naive-ui'

const { verBuscador } = inject('modales');
const { filtros } = inject('filtros');

const reiniciarFiltros = () => {
    for(let clave in filtros.value){
        filtros.value[clave] = null;
    }

    filtros.value.pagina = 1;
    filtros.value.estatus = true;
}

// watch(verBuscador, newValue => {
//     if(!newValue) reiniciarFiltros();
// })
</script>