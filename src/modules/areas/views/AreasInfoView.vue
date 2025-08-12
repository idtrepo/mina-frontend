<template>
		<div class="pt-5 md:pt-8">
				<HeaderTitulo/>
				<div class="flex justify-start flex-col md:flex-row gap-5 mt-5">
						<VCard :elemento="modulosElemento" class="md:w-1/4" />
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
tituloStore.asignarDataTitulo({
	nuevoTitulo: 'Información de Área',
	nuevoIcono: ICONOS.AREAS,
});

const filtrosStore = useFiltrosStore();
const { filtros } = storeToRefs(filtrosStore);

const VCard = defineAsyncComponent(() => import('@/modules/global/components/cartas/VCard.vue'));
const HeaderTitulo = defineAsyncComponent(() => import('@/components/header/VHeaderTitulo.vue'));

const route = useRoute();
const id = route.params.id;

const modulosElemento = {
	id: id,
	vista: 'modulos-listado-nest',
	primario: 'módulos',
	icono: ICONOS.MODULOS,
	query: { area: id }
};

const usuariosElemento = {
	vista: 'usuarios-listado',
	primario: 'usuarios',
	icono: ICONOS.USUARIOS,
	query: { area: id }
};

const infoElemento = {
	vista: 'areas-data',
	primario: 'Información de área',
	icono: ICONOS.AREAS,
};
</script>