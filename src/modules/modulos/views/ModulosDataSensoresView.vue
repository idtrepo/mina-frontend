<template>
    <div class="pt-8">
        <header class="px-6 py-5 bg-cyan-900 rounded-xl">
            <header class="mb-5 flex justify-between items-center">
                <h2 class="uppercase font-bold text-xl text-slate-200">agregar sensor</h2>
                <NButton 
                    @click="crearSensor"
                    type="info" 
                    strong>
                    Agregar
                </NButton>
            </header>
            <article>
                <p class="mb-1 uppercase">clave sensor</p>
                <NInput
                    @keydown.enter="crearSensor"
                    v-model:value="sensor.clave"/>
            </article>
        </header>
        <section class="pt-8">
            <NDataTable
                :columns="columnas"
                :data="sensoresData"/>
        </section>
    </div>
</template>

<script setup>
import { NDataTable, NInput, NButton } from 'naive-ui'
import useModulosDataSensores from '../composables/useModulosDataSensores';

//dependencias
const { 
    columnas, 
    sensoresData,
    sensor,
    crearSensor
} = useModulosDataSensores();
</script>