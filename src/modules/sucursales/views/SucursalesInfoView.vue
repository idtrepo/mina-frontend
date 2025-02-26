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
        <VCard :elemento= "usuariosElemento" class="w-1/5"> </VCard>
    </div>
    </div>
</template>

<script setup>
import { rutas } from '@/router/routes/rutas';
import { useRoute } from 'vue-router';
import { defineAsyncComponent } from 'vue';
import useUsuariosStore from "@/modules/usuarios/stores/useUsuariosStore";
import useAreasStore from "@/modules/areas/stores/useAreasStore";
import {storeToRefs} from "pinia";
import { ICONOS } from '@/modules/global/utils/iconos';
import useTituloStore from '@/modules/global/stores/useTituloStore';

const tituloStore = useTituloStore();
const { titulo, icono } = storeToRefs(tituloStore);
const usuariosStore = useUsuariosStore();
const areasStore = useAreasStore();
const {filtros:filtrosUsuarios, usuarios} = storeToRefs(usuariosStore);
const {filtros:filtrosAreas} = storeToRefs(areasStore);

const VCard = defineAsyncComponent(() => import('@/modules/global/components/cartas/VCard.vue'));

const route = useRoute();
const {id} = route.params;
filtrosUsuarios.value.sucursal = id;
filtrosAreas.value.sucursal = id;
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