<template>
    <section>
        <article class="mb-4">
            <p class="mb-1 uppercase">nombre</p>
            <NInput 
                v-model:value="perfil.nombre"
                clearable
                :disabled="edicionHabilitada"/>
        </article>
    </section>
</template>

<script setup>
import { NInput } from 'naive-ui'
import usePerfiles from '../../composables/usePerfiles';

//dependencias
const { perfil, edicionHabilitada } = usePerfiles();
</script>