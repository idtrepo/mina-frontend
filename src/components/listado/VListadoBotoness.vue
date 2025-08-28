<template>
    <div>
        <article class="hidden lg:flex items-center gap-x-2">
            <NButton v-if="permisoAgregar || PermisoAgregarSensores" @click="props.mostrarModalAgregar" type="info">
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
                    <NFloatButton v-if="permisoAgregar || PermisoAgregarSensores" @click="props.mostrarModalAgregar">
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
import useUsuarioStore from '@/stores/useUsuarioStore';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

//dependencias
const usuarioStore = useUsuarioStore();
const {usuarioPermisos } = storeToRefs(usuarioStore);
const route = useRoute();

// propiedades
const props = defineProps({
    mostrarModalBuscar: { type: Function, required: true },
    mostrarModalAgregar: { type: Function, required: true },
    mostrarModalExtra: { type: Function, required: false },
})

const permisoAgregar = computed(() => usuarioPermisos.value?.[route.name.split('-')[0]]?.includes('crear') || false);
const PermisoAgregarSensores = computed(() => {
    if (route.name == 'modulos-data'){
        return usuarioPermisos.value.sensores?.includes('crear') || false;
    }
    return false;
})
</script>