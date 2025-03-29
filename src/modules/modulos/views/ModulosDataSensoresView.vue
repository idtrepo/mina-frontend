<template>
    <div class="pt-8 lg:grid lg:grid-cols-12 gap-5 bg-slate-900 rounded-xl min-h-64">
        <header class="flex flex-col px-6 py-5 bg-slate-950 rounded-xl lg:h-48 lg:col-span-4 lg:ml-2">
            <header class="mb-5 flex justify-between items-center">
                <h2 class="uppercase font-bold text-lg text-slate-200">agregar sensor</h2>
            </header>
            <article>
                <p class="mb-1 uppercase">clave sensor</p>
                <NInput
                    @keydown.enter="crearSensor"
                    v-model:value="sensor.clave"/>
            </article>
            <div class="mt-2">
                <NButton 
                    class="w-full"
                    @click="crearSensor"
                    type="info" 
                    strong>
                    Agregar
                </NButton>
            </div>
        </header>
        <section class="pt-6 lg:pt-0 lg:col-span-8 lg:mr-2">
            <NDataTable
                :columns="columnas"
                :data="sensoresData"
                :pagination="{ pageSize: 5 }"
                />
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