<template>
    <section>
        <article class="mb-4">
            <p class="mb-1 uppercase">nombre</p>
            <NInput 
                v-model:value="area.nombre"
                clearable
                :disabled="edicionHabilitada"/>
        </article>
        <article class="mb-1 uppercase">
            <p>sucursal</p>
            <NSelect 
                v-model:value="area.idSucursal"
                clearable
                :options="sucursalesOpciones"
                :disabled="edicionHabilitada"/>
        </article>
    </section>
</template>

<script setup>
import { NInput, NSelect } from 'naive-ui'
import useAreas from '../../composables/useAreas';
import useSucursales from '@/modules/sucursales/composables/useSucursales';

//dependencias
const { area, edicionHabilitada } = useAreas();
const { sucursalesOpciones } = useSucursales();
</script>