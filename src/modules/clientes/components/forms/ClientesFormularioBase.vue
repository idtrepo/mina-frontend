<template>
    <section>
        <article class="mb-4">
            <p class="mb-1 uppercase">nombre</p>
            <NInput 
                v-model:value="cliente.nombre"
                clearable
                :disabled="edicionHabilitada"/>
        </article>
    </section>
</template>

<script setup>
import { NInput, NSelect } from 'naive-ui'
import useClientes from '../../composables/useClientes';

//dependencias
const { cliente, edicionHabilitada } = useClientes();
</script>