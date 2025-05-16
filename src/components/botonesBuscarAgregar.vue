<template>
    <NModal v-model:show="verModalAgregar">
        <NCard class="w-3/4 md:w-1/3">
            <slot name="formulario-agregar"></slot>
        </NCard>
    </NModal>
    <NModal v-model:show="verModalBuscar">
        <NCard class="w-3/4 md:w-1/3">
            <slot name="formulario-buscar"></slot>
        </NCard>
    </NModal>
</template>
<script setup>
import { NModal, NCard } from 'naive-ui'
import {inject} from 'vue'

const verModalAgregar = inject('verModalAgregar')
const verModalBuscar = inject('verModalBuscar')
</script>