<template>
    <section>
        <article class="mb-4">
            <p class="mb-1 uppercase">fecha</p>
            <NDatePicker
                v-model:value="filtros.fecha"
                clearable/>
        </article>
    </section>
</template>

<script setup>
import { NDatePicker } from 'naive-ui'
import useData from '../../composables/useData';

// dependencias
const { filtros } = useData();
</script>