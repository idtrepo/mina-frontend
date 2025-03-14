<template>
    <section>
        <article class="mb-4">
            <p class="mb-1 uppercase">mac</p>
            <NInput v-model:value="filtros.mac"/>
        </article>
        <article class="mb-4">
            <p class="mb-1 uppercase">area</p>
            <NSelect 
                v-model:value="filtros.area"
                disabled/>
        </article>
        <article class="mb-4">
            <p class="mb-1 uppercase">cliente</p>
            <NSelect 
                v-model:value="filtros.cliente"
                disabled/>
        </article>
        <article class="mb-4">
            <p class="mb-1 uppercase">sucursal</p>
            <NSelect 
                v-model:value="filtros.sucursal"
                disabled/>
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
import useModulos from '../../composables/useModulos';

//dependencias
const { filtros } = useModulos();
</script>