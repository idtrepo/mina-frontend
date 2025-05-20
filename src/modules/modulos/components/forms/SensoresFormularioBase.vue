<template>
    <section>
        <article class="mb-4">
            <p class="mb-1 uppercase">clave</p>
            <NInput v-model:value="sensor.clave" :disabled="edicionHabilitada"/>
        </article>
        <article class="mb-4">
            <p class="mb-1 uppercase">umbral</p>
            <NInput v-model:value="sensor.umbral" type="number" clearable @update:value="val => sensor.umbral = parseInt(val)" :disabled="edicionHabilitada"/>
        </article>
        <article class="mb-4">
            <p class="mb-1 uppercase">identificador</p>
            <NInput v-model:value="sensor.identificador" :disabled="edicionHabilitada"/>
        </article>
    </section>
</template>
<script setup>
import { NInput } from 'naive-ui';
import useSensores from '../../composables/useSensores';
//dependencias
const { sensor, edicionHabilitada } = useSensores();
</script>