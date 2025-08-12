<template>
    <div class="pt-5 md:pt-8">
        <HeaderTitulo/>
    <div class="flex justify-start flex-col md:flex-row gap-5 mt-5">
        <VCard :elemento ="areasElemento" class="md:w-1/4" />
        <VCard :elemento= "usuariosElemento" class="md:w-1/4" />
        <VCard :elemento="infoElemento" class="md:w-1/4" />
    </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { defineAsyncComponent } from 'vue';
import useTituloStore from '@/stores/useTituloStore';
import { ICONOS } from '@/modules/global/utils/iconos';

const tituloStore = useTituloStore();
tituloStore.asignarDataTitulo({
    nuevoTitulo: 'Información de Sucursal',
    nuevoIcono: ICONOS.SUCURSALES,
});

const VCard = defineAsyncComponent(() => import('@/modules/global/components/cartas/VCard.vue'));
const HeaderTitulo = defineAsyncComponent(() => import('@/components/header/VHeaderTitulo.vue'));
const route = useRoute();
const id = route.params.id;

const areasElemento= {
    id:id,
    vista:"areas-listado-nest",
    primario:"areas",
    icono:ICONOS.AREAS,
    query: { sucursal: id }
};
const usuariosElemento = {
    vista:"usuarios-listado",
    primario:"usuarios",
    icono: ICONOS.USUARIOS,
    query: { sucursal: id }
}

const infoElemento = {
    vista: "sucursales-data",
    primario: "Informacion de sucursal",
    icono: ICONOS.SUCURSALES
}
</script>