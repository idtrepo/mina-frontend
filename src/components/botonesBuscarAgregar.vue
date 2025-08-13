<template>
    <NModal v-model:show="verModalAgregar">
        <section class="md:w-1/2 w-3/4">
            <NCard>
                <slot name="formulario-agregar"></slot>
            </NCard>
        </section>
    </NModal>
    <NModal v-model:show="verModalBuscar">
        <section class="md:w-1/2 w-3/4">
            <NCard>
                <slot name="formulario-buscar"></slot>
            </NCard>
        </section>
    </NModal>
</template>
<script setup>
import { NModal, NCard } from 'naive-ui'
import { inject } from 'vue'

const verModalAgregar = inject('verModalAgregar')
const verModalBuscar = inject('verModalBuscar')
</script>