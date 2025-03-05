<template>
    <nav class="fixed bottom-0 left-0 right-0 flex items-center justify-between bg-gray-900 rounded-t-3xl lg:rounded-t-none border-b-0 border-cyan-900/100 lg:static lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-13 lg:flex lg:flex-col lg:border-r-2 lg:border-slate-500/30">
        <div class="flex lg:flex-col lg:w-full w-3/4">
            <VMenuItem 
            v-for="ruta in rutasFiltro" 
            :item="ruta"/>
        </div>
        <VMenuItemSalida/>
    </nav>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import { rutas } from '@/router/routes/rutas';
import useUsuarioStore from "@/modules/auth/stores/useUsuarioStore"
import {storeToRefs} from 'pinia'

//dependencias
const usuarioStore = useUsuarioStore();
const {usuarioPerfil} = storeToRefs(usuarioStore)

//filtrar las rutas que incluyan el perfil de usuario
const rutasFiltro = rutas.filter((r) => r.perfil.includes(usuarioPerfil.value));

// componentes
const VMenuItem = defineAsyncComponent(() => import('./VMenuItem.vue'));
const VMenuItemSalida = defineAsyncComponent(() => import('./VMenuItemSalida.vue'));
</script>