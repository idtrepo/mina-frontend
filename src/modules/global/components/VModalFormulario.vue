<template>
    <NModal v-model:show="verFormulario">
        <NCard class="w-11/12 md:w-9/12 lg:w-1/3">
            <slot></slot>
        </NCard>
    </NModal>
</template>

<script setup>
import { inject, watch } from 'vue'
import { NModal, NCard } from 'naive-ui'

const { verFormulario } = inject('modales');
const { dataElemento, extra=[] } = inject('data');

const reiniciarData = () => {
    for(let clave in dataElemento.value){
        dataElemento.value[clave] = null;
    }

    if(extra.length > 0){
        for(let index=0; index < extra.length; index++){
            extra[index].value = null;
        }
    }
}

watch(verFormulario, newValue => {
    if(!newValue) reiniciarData();
})
</script>