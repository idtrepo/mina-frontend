<template>
    <NDropdown trigger="click" @select="cerrarSesionHandle" :options="opciones" :show-arrow="true" size="medium">
        <article class="flex items-center transition-all duration-200 hover:cursor-pointer">
            <header class="bg-slate-800 w-9 h-9 flex justify-center items-center rounded-2xl mr-2">
                <i :class="ICONOS.USUARIOS"></i>
            </header>
            <section class="uppercase">
                <h3 class="font-bold">{{ usuarioNombreCompleto }}</h3>
                <p class="text-xs text-slate-400">{{ usuarioPerfil }}</p>
            </section>
        </article>
    </NDropdown>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { NDropdown } from 'naive-ui'
import useSesion from '@/modules/auth/composables/useSesion';
import { ICONOS } from '@/utils/iconos';
import { VISTAS } from '@/modules/global/utils/vistas';

// dependencias
const router = useRouter();
const { usuarioNombreCompleto, usuarioPerfil, cerrarSesion } = useSesion();

const opciones = ref([
    {
        label: 'CERRAR SESION',
        key: 'cerrar sesion',
    }
]);

const cerrarSesionHandle = () => {
    cerrarSesion();
    router.push({ name: VISTAS.LOGIN });
}
</script>