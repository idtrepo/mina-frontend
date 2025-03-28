<template>
    <MenuView :listado="listado"/>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import { VISTAS } from '@/modules/global/utils/vistas';
import { ICONOS } from '@/modules/global/utils/iconos';
 
// dependencias
const router = useRouter();

// componentes
const MenuView = defineAsyncComponent(() => import('./MenuView.vue'));

// listado elementos
const listado = ref([
    {
        icono: ICONOS.PERFILES,
        titulo: 'perfiles',
        accion: () => router.push({ name: VISTAS.PERFILES })
    },
    {
        icono: ICONOS.PERMISOS,
        titulo: 'operaciones',
        accion: () => router.push({ name: VISTAS.PERFILES_OPERACIONES })
    },
    {
        icono: ICONOS.CATEGORIAS,
        titulo: 'categorias',
        accion: () => router.push({ name: VISTAS.PERFILES_CATEGORIAS })
    },
    {
        icono: ICONOS.ACCIONES,
        titulo: 'acciones',
        accion: () => router.push({ name: VISTAS.PERFILES_ACCIONES })
    },
]);
</script>