<template>
    <nav class="w-full h-full flex lg:flex-col items-center justify-between">
        <RouterLink 
            v-for="vista in rutasFiltro"
            class="lg:px-3 flex-grow h-full lg:w-full flex items-center justify-center lg:justify-normal border-t-slate-900 lg:border-r-slate-900 border-t-4 lg:border-r-4 hover:border-t-orange-600/100 lg:border-t-0 lg:hover:border-r-orange-600/100 transition-all duration-200 hover:bg-slate-800"
            :key="vista.titulo"
            :to="{ name: vista.ruta }">
            <i class="lg:mr-2" :class="vista.icono"></i>
            <span class="hidden lg:inline uppercase text-xs">{{ vista.titulo }}</span>
        </RouterLink>
    </nav>
</template>

<script setup>
import { rutas } from '@/router/routes/rutas';
import useUsuarioStore from '@/modules/auth/stores/useUsuarioStore';
import { storeToRefs } from 'pinia';

//dependencias
const usuarioStore = useUsuarioStore();
const { usuarioPerfil } = storeToRefs(usuarioStore)

//filtrando rutas
const rutasFiltro = rutas.filter((r) => r.perfil.includes(usuarioPerfil.value));
</script>

<style scoped>
.router-link-active{
    color: #f54a00;
}
</style>