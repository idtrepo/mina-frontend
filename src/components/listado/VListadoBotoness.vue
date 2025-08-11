<template>
    <div>
        <article class="hidden lg:flex items-center gap-x-2">
            <NButton @click="props.mostrarModalAgregar" type="info">
                <span class="uppercase font-bold">agregar</span>
            </NButton>
            <NButton @click="props.mostrarModalBuscar" type="warning">
                <span class="uppercase font-bold">buscar</span>
            </NButton>
            <slot name="boton-extra" :mostrarModalExtra="props.mostrarModalExtra"></slot>
        </article>
        <div class="lg:hidden">
            <NFloatButton :bottom="115" :right="30" type="primary" menu-trigger="click">
                <i :class="ICONOS.MENU"></i>
                <template #menu>
                    <NFloatButton @click="props.mostrarModalAgregar">
                        <i :class="ICONOS.AGREGAR"></i>
                    </NFloatButton>
                    <NFloatButton @click="props.mostrarModalBuscar">
                        <i :class="ICONOS.BUSCAR"></i>
                    </NFloatButton>
                    <slot name="boton-extra-float" :mostrarModalExtra="props.mostrarModalExtra"></slot>
                </template>
            </NFloatButton>
        </div>
    </div>
</template>

<script setup>
import { NButton, NFloatButton } from 'naive-ui'
import { ICONOS } from '@/modules/global/utils/iconos';

// propiedades
const props = defineProps({
    mostrarModalBuscar: { type: Function, required: true },
    mostrarModalAgregar: { type: Function, required: true },
    mostrarModalExtra: { type: Function, required: false },
})
</script>