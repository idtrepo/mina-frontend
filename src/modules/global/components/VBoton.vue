<template>
    <button @click="funcionAccion" :class="colorBoton" class="w-16 h-16 lg:h-auto lg:w-full lg:px-3 lg:py-3 flex items-center justify-center font-bold text-slate-200 rounded-full lg:rounded-sm transition-all duration-200">
        <i class="lg:mr-1":class="icono"></i>
        <span class="hidden lg:inline uppercase">{{ titulo }}</span>
    </button>
</template>

<script setup>
import { computed } from 'vue'
import { ICONOS } from '../utils/iconos';
import { COLORES } from '../utils/colores';

// propiedades
const { funcionAccion, titulo, icono, tipo } = defineProps({
    funcionAccion: {
        type: Function,
        default: () => { console.log('hola') }
    },
    titulo: {
        type: String,
        default: () => 'boton'
    },
    icono: {
        type: Array,
        default: () => ICONOS.EQUIS
    },
    tipo:{
        type: String,
        default: () => 'neutro',
        validate: (value) => {
            return ['exito', 'advertencia', 'peligro', 'neutro', 'info'].includes(value)
        }
    }
})

const colorBoton = computed(() => COLORES[tipo]);
</script>