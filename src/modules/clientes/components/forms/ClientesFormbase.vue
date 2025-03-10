<template>
    <div class="grid grid-cols-1 lg:gap-5">
        <article class="mb-4">
            <p class="uppercase mb-1">nombre</p>
                <NInput
                    v-model:value="cliente.nombre"
                    :disabled="edicionHabilitada"/>
        </article>
    </div>
</template>

<script setup>
import { NInput } from 'naive-ui'
import useClientes from '@/modules/clientes/composables/useClientes'

const {cliente, edicionHabilitada} = useClientes();
</script>