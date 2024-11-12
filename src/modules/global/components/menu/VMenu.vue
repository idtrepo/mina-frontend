<template>
    <nav class="fixed bottom-0 left-0 right-0 flex items-center justify-between bg-cyan-800/60 rounded-t-3xl lg:rounded-t-none border-b-0 border-cyan-900/100 lg:static lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-13 lg:flex lg:flex-col lg:border-r-2 lg:border-cyan-500/30">
        <VMenuItem 
            v-for="ruta in rutas" 
            :item="ruta"/>
        <VMenuItemSalida/>
    </nav>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import { rutas } from '@/router/routes/rutas';

// componentes
const VMenuItem = defineAsyncComponent(() => import('./VMenuItem.vue'));
const VMenuItemSalida = defineAsyncComponent(() => import('./VMenuItemSalida.vue'));
</script>