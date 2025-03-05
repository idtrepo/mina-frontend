<template>
    <div>
        <article class="hidden md:block">
            <NButton 
                @click="props.mostrarModalFormulario"
                type="info">
                <template #icon>
                    <i :class="ICONOS.AGREGAR"></i>
                </template>
                <span class="uppercase font-bold">agregar</span>
            </NButton>
            <NButton 
                @click="props.mostrarModalBuscador"
                type="warning"
                class="ml-2">
                <template #icon>
                    <i :class="ICONOS.BUSCAR"></i>
                </template>
                <span class="uppercase font-bold">buscar</span>
            </NButton>
        </article>
        <article class="md:hidden">
            <NFloatButton :bottom="115" :right="30" type="primary" menu-trigger="click">
                <i :class="ICONOS.MENU"></i>
                <template #menu>
                    <NFloatButton @click="props.mostrarModalFormulario">
                        <i :class="ICONOS.AGREGAR"></i> 
                    </NFloatButton>
                    <NFloatButton @click="props.mostrarModalBuscador">
                        <i :class="ICONOS.BUSCAR"></i>
                    </NFloatButton>
                </template>
            </NFloatButton>
        </article>
    </div>
</template>

<script setup>
import { NButton, NFloatButton } from 'naive-ui'
import { ICONOS } from '@/modules/global/utils/iconos';

// propiedades
const props = defineProps({
    mostrarModalFormulario: {
        type: Function,
        default: () => {}
    },
    mostrarModalBuscador: {
        type: Function,
        default: () => {}
    },
})
</script>