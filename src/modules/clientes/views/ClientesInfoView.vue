<template>
  <div class="pt-5 md:pt-8">
    <HeaderTitulo />
    <div class="flex justify-start flex-col md:flex-row gap-5 mt-5">
      <VCard :elemento="sucursalesElemento" class="md:w-1/4" />
      <VCard :elemento="usuariosElemento" class="md:w-1/4" />
      <VCard :elemento="infoElemento" class="md:w-1/4" />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { defineAsyncComponent } from 'vue';
import useTituloStore from '@/stores/useTituloStore';
import useFiltrosStore from '@/stores/useFiltrosStore';
import { storeToRefs } from 'pinia';
import { ICONOS } from '@/modules/global/utils/iconos';

const tituloStore = useTituloStore();
// Título para cliente
tituloStore.asignarDataTitulo({
  nuevoTitulo: 'Información de Cliente',
  nuevoIcono: ICONOS.CLIENTES,
});

const filtrosStore = useFiltrosStore();
const { filtros } = storeToRefs(filtrosStore);

const VCard = defineAsyncComponent(() => import('@/modules/global/components/cartas/VCard.vue'));
const HeaderTitulo = defineAsyncComponent(() => import('@/components/header/VHeaderTitulo.vue'));

const route = useRoute();
const id = route.params.id; // ID cliente

// Aplicar filtro cliente y limpiar otros relacionados
filtros.value = { ...filtros.value, cliente: id, sucursal: undefined, area: undefined };

const sucursalesElemento = {
  vista: 'sucursales-listado',
  primario: 'sucursales',
  icono: ICONOS.SUCURSALES,
  query: { cliente: id }
};

const usuariosElemento = {
  vista: 'usuarios-listado',
  primario: 'usuarios',
  icono: ICONOS.USUARIOS,
  query: { cliente: id }
};

const infoElemento = {
  vista: 'clientes-data',
  primario: 'Información de cliente',
  icono: ICONOS.CLIENTES,
};
</script>
