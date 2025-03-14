<template>
    <section>
        <article class="mb-4">
            <p class="mb-1 uppercase">mac</p>
            <NInput 
                v-model:value="modulo.mac"
                clearable
                :disabled="edicionHabilitada"/>
        </article>
        <article class="mb-4">
            <p class="mb-1 uppercase">area</p>
            <NSelect 
                v-model:value="modulo.idArea"
                clearable
                :disabled="edicionHabilitada"/>
        </article>
        <article class="mb-4">
            <p class="mb-1 uppercase">cliente</p>
            <NSelect 
                v-model:value="modulo.idCliente"
                clearable
                :disabled="edicionHabilitada"/>
        </article>
        <article class="mb-4">
            <p class="mb-1 uppercase">sucursal</p>
            <NSelect 
                v-model:value="modulo.idSucursal"
                clearable
                :disabled="edicionHabilitada"/>
        </article>
    </section>
</template>

<script setup>
import { NInput, NSelect } from 'naive-ui'
import useModulos from '../../composables/useModulos';

//dependencias
const { modulo, edicionHabilitada } = useModulos();
</script>