<template>
    <section>
        <article class="mb-4">
            <p class="mb-1 uppercase">nombre</p>
            <NInput v-model:value="filtros.nombre"/>
        </article>
        <article class="mb-4">
            <p class="mb-1 uppercase">fecha</p>
            <NDatePicker
                v-model:value="filtros.fecha"
                clearable/>
        </article>
        <article class="mb-4">
            <p class="mb-1 uppercase">estatus</p>
            <NSwitch
                v-model:value="filtros.estatus"/>
        </article>
    </section>
</template>

<script setup>
import { NDatePicker, NSwitch, NSelect, NInput } from 'naive-ui'
import usePerfiles from '../../composables/usePerfiles';

// dependencias
const { filtros } = usePerfiles();
</script>