<template>
    <VDataView
        :elemento="usuario"
        :editar-elemento="usuariosStore.editarUsuario"
        :obtener-elemento="usuariosStore.obtenerUsuario"
        @reiniciar-elemento="reinciarDataUsuario">
        <template #contenido="{ editar }">
            <section>
                <section>
                    <header class="mb-3">
                        <h3 class="uppercase font-bold">Datos principales</h3>
                    </header>
                    <section class="grid grid-cols-2 lg:grid-cols-4 gap-x-5">
                        <article class="mb-4">
                            <p class="uppercase mb-1">nombre</p>
                            <NInput
                                v-model:value="usuario.nombre"
                                :disabled="!editar"/>
                        </article>
                        <article class="mb-4">
                            <p class="uppercase mb-1">apellido</p>
                            <NInput
                                v-model:value="usuario.apellido"
                                :disabled="!editar"/>
                        </article>
                        <article class="mb-4">
                            <p class="uppercase mb-1">correo</p>
                            <NInput
                                v-model:value="usuario.correo"
                                :disabled="!editar"/>
                        </article>
                        <article class="mb-4">
                            <p class="uppercase mb-1">perfil</p>
                            <NSelect
                                v-model:value="usuario.idPerfil"
                                :options="perfilesOpciones"
                                :disabled="!editar"/>
                        </article>
                    </section>
                </section>

                <section v-if="esAdministrador || esSupervisor || esOperador">
                    <header class="mb-3">
                        <h3 class="uppercase font-bold">Datos especificos del puesto</h3>
                    </header>
                    <section class="grid grid-cols-2 lg:grid-cols-4 gap-x-5">
                        <article v-if="esOperador || esSupervisor || esAdministrador" class="mb-4">
                            <p class="uppercase mb-1">clientes</p>
                            <NSelect
                                v-model:value="usuario.idCliente"
                                :options="clientesOpciones"
                                :disabled="!editar"/>
                        </article>
                        <article v-if="esOperador || esSupervisor" class="mb-4">
                            <p class="uppercase mb-1">sucursales</p>
                            <NSelect
                                v-model:value="usuario.idSucursal"
                                :options="sucursalesOpciones"
                                :disabled="!editar"/>
                        </article>
                        <article v-if="esOperador" class="mb-4">
                            <p class="uppercase mb-1">areas</p>
                            <NSelect
                                v-model:value="usuario.idArea"
                                :options="areasOpciones"
                                :disabled="!editar"/>
                        </article>
                    </section>
                </section>

                <section>
                    <header class="flex items-center gap-x-5 mb-3">
                        <h3 class="uppercase font-bold">Cambiar password</h3>
                        <NSwitch :disabled="!editar" :round="false" v-model:value="editarPassword"/>
                    </header>
                    <section v-if="editarPassword"class="grid grid-cols-2 gap-x-5">
                        <article class="mb-4">
                            <p class="uppercase mb-1">password</p>
                            <NInput
                                v-model:value="usuario.password"
                                :disabled="!editar"/>
                        </article>
                        <article class="mb-4">
                            <p class="uppercase mb-1">verificar password</p>
                            <NInput
                                v-model:value="verificarPassword"
                                :disabled="!editar"/>
                        </article>
                    </section>
                </section>
            </section>
        </template>    
    </VDataView>
</template>

<script setup>
import { ref, computed } from 'vue'
import { defineAsyncComponent } from 'vue'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { NInput, NSelect, NSwitch } from 'naive-ui'
import useUsuariosStore from '../stores/useUsuariosStore'
import usePerfilesStore from '@/modules/perfiles/stores/usePerfilesStore'
import useClientesStore from '@/modules/clientes/stores/useClientesStore'
import useAreasStore from '@/modules/areas/stores/useAreasStore'
import useSucursalesStore from '@/modules/sucursales/stores/useSucursalesStore';
import { PERFILES } from '../utils/perfiles'

// dependencias
const route = useRoute();
const usuariosStore = useUsuariosStore();
const perfilesStore = usePerfilesStore();
const clientesStore = useClientesStore();
const areasStore = useAreasStore();
const sucursalesStore = useSucursalesStore();
const { perfilesOpciones } = storeToRefs(perfilesStore);
const { clientesOpciones } = storeToRefs(clientesStore);
const { areasOpciones } = storeToRefs(areasStore);
const { sucursalesOpciones } = storeToRefs(sucursalesStore);

// componentes
const VDataView = defineAsyncComponent(() => import('@/modules/global/views/VDataView.vue')); 

//usuario
const usuario = ref({
    id: null,
    correo: null,
    password: null,
    nombre: null,
    apellido: null,
    idPerfil: null,
    idCliente: null,
    idSucursal: null,
    idArea: null,
});
const editarPassword = ref(false);
const verificarPassword = ref(null);
const esSuperUsuario = computed(() => usuario.value.idPerfil === PERFILES.SUPERUSUARIO);
const esAdministrador = computed(() => usuario.value.idPerfil === PERFILES.ADMINISTRADOR);
const esSupervisor = computed(() => usuario.value.idPerfil === PERFILES.SUPERVISOR);
const esOperador = computed(() => usuario.value.idPerfil === PERFILES.OPERADOR);

const reinciarDataUsuario = (data) => {
    usuario.value = { ...data };
}

const asignarDataUsuario = ({ data }) => {
    console.log('ASIGNAR DATA USUARIO');
    console.log(data);
    
    const { id, correo, nombre, apellido, area, cliente, sucursal, perfil } = data;
    
    usuario.value.id = id;
    usuario.value.correo = correo;
    usuario.value.nombre = nombre;
    usuario.value.apellido = apellido;
    usuario.value.idArea = area?.id;
    usuario.value.idCliente = cliente?.id;
    usuario.value.idSucursal = sucursal?.id;
    usuario.value.idPerfil = perfil?.id;
}

// lifcycle
onMounted(() => {
    const { id } = route.params;

    Promise.allSettled([
        usuariosStore.obtenerUsuario({ id }),
        areasStore.obtenerAreas(),
        clientesStore.obtenerClientes(),
        sucursalesStore.obtenerSucursales(),
        perfilesStore.obtenerPerfiles(),
    ])
        .then((res) => {
            const [dataUsuario] = res;

            asignarDataUsuario(dataUsuario.value);
        })
        .catch(console.log);
});
</script>