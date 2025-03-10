<template>
    <div class="pt-5 md:pt-8">
        <article class="flex items-center text-xs text-slate-200">
                <div class="w-8 h-8 mr-2 flex justify-center items-center bg-amber-700 rounded-xl">
                    <i :class="icono" class="lg:text-sm"></i>
                </div>
                <h2 class="uppercase font-bold lg:text-3xl">{{ titulo }}: {{  }}</h2>
    </article>
    <div class="flex justify-start gap-5 mt-5">
        <VCard :elemento ="areasElemento" class="w-1/5"></VCard>
        <VCard v-if="usuarioPerfil!='operador'" :elemento= "usuariosElemento" class="w-1/5"> </VCard>
    </div>
    <div v-if="usuarioPerfil!='operador' && usuarioPerfil!='supervisor'" class="mt-5">
        <VSucursalesData></VSucursalesData>
    </div>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { defineAsyncComponent } from 'vue';
import useTituloStore from '@/modules/global/stores/useTituloStore';
import useUsuarioStore from "@/modules/auth/stores/useUsuarioStore"
import useFiltrosStore from '@/stores/useFiltrosStore';
import {storeToRefs} from "pinia";
import { ICONOS } from '@/modules/global/utils/iconos';

const tituloStore = useTituloStore();
const { titulo, icono } = storeToRefs(tituloStore);
const usuarioStore = useUsuarioStore();
const {usuarioPerfil} = storeToRefs(usuarioStore)

const filtrosStore = useFiltrosStore();
const {filtros} = storeToRefs(filtrosStore);

const VCard = defineAsyncComponent(() => import('@/modules/global/components/cartas/VCard.vue'));
const VSucursalesData = defineAsyncComponent(() => import('@/modules/sucursales/views/SucursalesDataView.vue'));

const route = useRoute();
const id = route.params.id;

filtros.value = { ...filtros.value, sucursal: id };
const areasElemento= {
    id:id,
    vista:"areas-listado",
    primario:"areas",
    icono:ICONOS.AREAS
};
const usuariosElemento = {
    vista:"usuarios-listado",
    primario:"usuario",
    icono: ICONOS.USUARIOS
}


</script>