<template>
    <section>
        <article class="mb-4">
            <p class="mb-1 uppercase">nombre</p>
            <NInput 
                v-model:value="categoria.nombre"
                clearable
                :disabled="edicionHabilitada"/>
        </article>
    </section>
</template>

<script setup>
import { NInput } from 'naive-ui'
import useCategorias from '../../../composables/useCategorias';

//dependencias
const { categoria, edicionHabilitada } = useCategorias();
</script>