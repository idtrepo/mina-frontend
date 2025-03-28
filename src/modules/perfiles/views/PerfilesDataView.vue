<template>
    <VDataView :peticiones="peticiones" :reiniciar-data="reiniciarDataPerfiles" :habilitar-edicion="habilitarEdicion"
        :editar-elemento="editarPerfilPermisos">
        <template #formulario>
            <PerfilesFormularioBase />
        </template>
        <template #extra>
            <section class="pt-5">
                <header>
                    <h2 class="uppercase font-bold justify-evenly">permisos</h2>
                </header>
                <section class="pt-5">
                    <NDataTable :columns="columnas" :data="dataCategorias" :max-height="350"/>
                </section>
            </section>
        </template>
    </VDataView>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { defineAsyncComponent, ref, onMounted, h, computed, toRaw } from 'vue';
import { storeToRefs } from 'pinia'
import usePerfiles from '../composables/usePerfiles';
import useCategorias from '../composables/useCategorias';
import usePermisos from '../composables/usePermisos';
import useAcciones from '../composables/useAcciones';
import { NPagination, NCheckbox, NDataTable } from 'naive-ui';
import { ICONOS } from '@/modules/global/utils/iconos';
import useUsuarioStore from '@/stores/useUsuarioStore';

// dependencias
const route = useRoute();
const usuarioStore = useUsuarioStore();
const { obtenerPerfil, reiniciarDataPerfiles, habilitarEdicion, editarPerfil, edicionHabilitada, perfil } = usePerfiles();
const { categorias, obtenerCategorias } = useCategorias();
const { permisos, obtenerPermisos } = usePermisos();
const { acciones, obtenerAcciones } = useAcciones();
const { usuarioPerfilId } = storeToRefs(usuarioStore);
//copia de acciones sin reactividad
let accionesIniciales;
// componentes
const VDataView = defineAsyncComponent(() => import('@/views/detalles/VDataView.vue'));
const PerfilesFormularioBase = defineAsyncComponent(() => import('../components/forms/PerfilesFormularioBase.vue'));

// tabla
const dataCategorias = computed(() => categorias.value.map(({ id, nombre }) => {
    const listadoAcciones = acciones.value
        .filter(({ nombre:nombreAccion }) => nombreAccion.includes(nombre))
        .map(({ id, nombre, asignar, index }) => ({ id, nombre, asignar, index }));

    return {
        id,
        categoria: nombre,
        permisos: listadoAcciones,
    }
}));

const editarPerfilPermisos = ({id}) => {
    try {
        const accionesModificadas = acciones.value.filter(({ asignar }, index) => {
        const accionInicial = accionesIniciales[index]; 
        return asignar !== accionInicial.asignar;
        }).map(({ id, asignar }) => ({ idAccion:id, estatus:asignar }));

        perfil.value["acciones"] = accionesModificadas;

        editarPerfil();
    } catch (error) {
        console.error(error);
    }
}

const columnas = ref([
    {
        title: 'categoria',
        key: 'categoria',
        resizable: true
    },
    {
        title: 'acciones',
        key: 'acciones',
        resizable: true,
        render: (row, index) => h('div', { class: ['flex', 'justify-between', 'items-center'] }, [
            h('article', { class: ['flex', 'flex-col', 'items-center'] }, [
                h('div', [
                    h('p', { class: ['uppercase', 'font-bold', 'text-xs', 'hidden', 'md:block'] }, 'ver'),
                    h('i', { class: ['uppercase', 'font-bold', 'text-xs', 'md:hidden', ...ICONOS.VER] }),
                ]),
                h(NCheckbox, { disabled: edicionHabilitada.value, checked: row.permisos?.[3]?.asignar ?? false, onUpdateChecked: v => {
                    const { permisos } = row;
                    const [,,,dataVer] = permisos;
                    const { index:indexAccion } = dataVer;

                    acciones.value[indexAccion].asignar = v;
                } })
            ]),
            h('article', { class: ['flex', 'flex-col', 'items-center'] }, [
                h('div', [
                    h('p', { class: ['uppercase', 'font-bold', 'text-xs', 'hidden', 'md:block'] }, 'crear'),
                    h('i', { class: ['uppercase', 'font-bold', 'text-xs', 'md:hidden', ...ICONOS.CREAR] }),
                ]),
                h(NCheckbox, { disabled: edicionHabilitada.value, checked: row.permisos?.[2]?.asignar ?? false, onUpdateChecked: v => {
                    const { permisos } = row;
                    const [,, dataCrear,,] = permisos;
                    const { index:indexAccion } = dataCrear;
                    acciones.value[indexAccion].asignar = v;

                    console.log('DATOS CREAR');
                    console.log(dataCrear);

                } })
            ]),
            h('article', { class: ['flex', 'flex-col', 'items-center'] }, [
                h('div', [
                    h('p', { class: ['uppercase', 'font-bold', 'text-xs', 'hidden', 'md:block'] }, 'editar'),
                    h('i', { class: ['uppercase', 'font-bold', 'text-xs', 'md:hidden', ...ICONOS.EDITAR] }),
                ]),
                h(NCheckbox, { disabled: edicionHabilitada.value, checked: row.permisos?.[1]?.asignar ?? false, onUpdateChecked: v => {
                    const { permisos } = row;
                    const [,dataEditar,,] = permisos;
                    const { index:indexAccion } = dataEditar;
                    acciones.value[indexAccion].asignar = v;

                    console.log('DATOS EDITAR');
                    console.log(dataEditar);

                } })
            ]),
            h('article', { class: ['flex', 'flex-col', 'items-center'] }, [
                h('div', [
                    h('p', { class: ['uppercase', 'font-bold', 'text-xs', 'hidden', 'md:block'] }, 'eliminar'),
                    h('i', { class: ['uppercase', 'font-bold', 'text-xs', 'md:hidden', ...ICONOS.ELIMINAR] }),
                ]),
                h(NCheckbox, { disabled: edicionHabilitada.value, checked: row.permisos?.[0]?.asignar ?? false, onUpdateChecked: v => {
                    const { permisos } = row;
                    const [dataEliminar,,,] = permisos;
                    const { index:indexAccion } = dataEliminar;
                    acciones.value[indexAccion].asignar = v;

                    console.log('DATOS ELIMINAR');
                    console.log(dataEliminar);

                } })
            ]),
        ])
    },
]);

// configuracion vista
const peticiones = ref([
    obtenerPerfil({ id: route.params.id }),
]);

// ciclo de vida
onMounted(() => {
    const obtenerRegistros = async() => {
        const { id } = route.params;

        await obtenerCategorias({ params: { listado: true } });
        await obtenerPermisos({ params: { listado: true, perfil: id } });
        await obtenerAcciones({ params: { listado: true } }, permisos);
        accionesIniciales = JSON.parse(JSON.stringify(acciones.value));
    };

    obtenerRegistros();
});
</script>