<template>
    <section>
        <article class="mb-4">
            <p class="mb-1 uppercase">clave</p>
            <NInput v-model:value="filtros.clave"/>
        </article>
        <article class="mb-4">
            <p class="mb-1 uppercase">identificador</p>
            <NInput
                v-model:value="filtros.identificador"
                clearable/>
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
import { NDatePicker, NSwitch, NInput } from 'naive-ui'
import useSensores from '../../composables/useSensores';

//dependencias
const { filtros } = useSensores();
</script>