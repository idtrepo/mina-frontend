<template>
<div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-5">
    <article class="mb-4">
        <p class="uppercase mb-1">nombre</p>
        <NInput
            v-model:value="area.nombre"
            :disabled="edicionHabilitada"/>
    </article>
    <article class="mb-4">
        <p class="uppercase mb-1">sucursal</p>
        <NSelect
            v-model:value="area.idSucursal"
            :options="sucursalesOpciones"
            :disabled="edicionHabilitada"/>
    </article>
</div>
</template>

<script setup>
import { NInput, NSelect } from 'naive-ui'
import useAreas from '@/modules/areas/composables/useAreas'
import useSucursales from '@/modules/sucursales/composables/useSucursales'

const { area, edicionHabilitada } = useAreas();
const {sucursalesOpciones} = useSucursales();

</script>