<template>
    <nav class="flex items-center justify-between lg:flex-col h-full">
        <VMenuItem 
            v-for="ruta in rutas"
            :key="ruta.titulo"
            :="ruta"/>
    </nav>
</template>

<script setup>
import { ref } from 'vue'
import { defineAsyncComponent } from 'vue';
import { VISTAS } from '@/modules/global/utils/vistas';
import { ICONOS } from '@/utils/iconos';
import { TITULOS } from '@/utils/titulos';

// componentes
const VMenuItem = defineAsyncComponent(() => import('./VMenuItem.vue'));

//rutas
const rutas = ref([
    {
        titulo: TITULOS.VEHICULOS,
        vista: VISTAS.VEHICULOS,
        icono: ICONOS.VEHICULOS,
    },
    {
        titulo: TITULOS.USUARIOS,
        vista: VISTAS.USUARIOS,
        icono: ICONOS.USUARIOS,
    },
    {
        titulo: TITULOS.TANQUES,
        vista: VISTAS.TANQUES,
        icono: ICONOS.TANQUES,
    },
    {
        titulo: TITULOS.SUCURSALES,
        vista: VISTAS.SUCURSALES,
        icono: ICONOS.SUCURSALES,
    },
    {
        titulo: TITULOS.CLIENTES,
        vista: VISTAS.CLIENTES,
        icono: ICONOS.CLIENTES,
    },
    {
        titulo: TITULOS.DISPOSITIVOS,
        vista: VISTAS.DISPOSITIVOS,
        icono: ICONOS.DISPOSITIVOS,
    },
    {
        titulo: TITULOS.PERFILES,
        vista: VISTAS.PERFILES_MENU,
        icono: ICONOS.PERFILES,
    },
    {
        titulo: TITULOS.TAGS,
        vista: VISTAS.TAGS,
        icono: ICONOS.TAGS,
    },
])
</script>