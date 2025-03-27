<template>
    <section>
        <article class="mb-4">
            <p class="mb-1 uppercase">nombre</p>
            <NInput 
                v-model:value="operacion.nombre"
                clearable
                :disabled="edicionHabilitada"/>
        </article>
    </section>
</template>

<script setup>
import { NInput } from 'naive-ui'
import useOperaciones from '../../../composables/useOperaciones';

//dependencias
const { operacion, edicionHabilitada } = useOperaciones();
</script>