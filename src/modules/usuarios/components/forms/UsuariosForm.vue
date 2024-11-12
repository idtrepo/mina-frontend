<template>
    <VModalFormulario>
        <article>
            <header>
                <h2 class="uppercase font-bold">crear usuario</h2>
            </header>
            <section class="pt-3 grid grid-cols-2 gap-x-5">
                <article class="mb-4">
                    <p class="uppercase mb-1">nombre</p>
                    <NInput clearable v-model:value="usuario.nombre"/>
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">apellido</p>
                    <NInput clearable v-model:value="usuario.apellido"/>
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">perfil</p>
                    <NSelect :options="perfilesOpciones" clearable v-model:value="usuario.idPerfil"/>
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">correo</p>
                    <NInput clearable v-model:value="usuario.correo"/>
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">password</p>
                    <NInput type="password" clearable v-model:value="usuario.password"/>
                </article>
                <article class="mb-4">
                    <p class="uppercase mb-1">verificar password</p>
                    <NInput type="password" clearable v-model:value="verificarPassword"/>
                </article>
                <template v-if="esAdministrador">
                    <article class="mb-4 col-span-2">
                        <p class="uppercase mb-1">cliente</p>
                        <NSelect clearable v-model:value="usuario.idCliente" :options="clientesOpciones"/>
                    </article>
                </template>
                <template v-if="esSupervisor">
                    <article class="mb-4 col-span-2">
                        <p class="uppercase mb-1">cliente</p>
                        <NSelect clearable v-model:value="usuario.idCliente" :options="clientesOpciones"/>
                    </article>
                    <article class="mb-4 col-span-2">
                        <p class="uppercase mb-1">sucursal</p>
                        <NSelect clearable v-model:value="usuario.idSucursal" :options="sucursalesOpciones"/>
                    </article>
                </template>
                <template v-if="esOperador">
                    <article class="mb-4 col-span-2">
                        <p class="uppercase mb-1">cliente</p>
                        <NSelect clearable v-model:value="usuario.idCliente" :options="clientesOpciones"/>
                    </article>
                    <article class="mb-4 col-span-2">
                        <p class="uppercase mb-1">sucursal</p>
                        <NSelect clearable v-model:value="usuario.idSucursal" :options="sucursalesOpciones"/>
                    </article>
                    <article class="mb-4 col-span-2">
                        <p class="uppercase mb-1">area</p>
                        <NSelect clearable v-model:value="usuario.idArea" :options="areasOpciones"/>
                    </article>
                </template>
            </section>
            <footer class="pt-5">
                <NButton :disabled="cargando" @click="crearUsuario" type="warning" class="w-full">
                    <span class="uppercase font-bold">crear</span>
                </NButton>
            </footer>
        </article>
    </VModalFormulario>
</template>

<script setup>
import { ref, provide, computed } from 'vue'
import { onMounted } from 'vue'
import { defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { NButton, NInput, NSelect } from 'naive-ui'
import useRequest from '@/modules/global/composables/request/useRequest';
import useNotificacion from '@/modules/global/composables/useNotificacion';
import { MENSAJE_EXITO, MENSAJE_ERROR } from '@/modules/global/utils/mensajes';
import useUsuariosStore from '../../stores/useUsuariosStore';
import usePerfilesStore from '@/modules/perfiles/stores/usePerfilesStore';
import { PERFILES } from '../../utils/perfiles'
import useClientesStore from '@/modules/clientes/stores/useClientesStore'
import useSucursalesStore from '@/modules/sucursales/stores/useSucursalesStore'
import useAreasStore from '@/modules/areas/stores/useAreasStore'

// dependencias
const clientesStore = useClientesStore();
const sucursalesStore = useSucursalesStore();
const areasStore = useAreasStore();
const usuariosStore = useUsuariosStore();
const notificacion = useNotificacion();
const perfilesStore = usePerfilesStore();
const { cargando } = useRequest();
const { perfilesOpciones } = storeToRefs(perfilesStore);
const { clientesOpciones } = storeToRefs(clientesStore);
const { sucursalesOpciones } = storeToRefs(sucursalesStore);
const { areasOpciones } = storeToRefs(areasStore);

// componentes
const VModalFormulario = defineAsyncComponent(() => import('@/modules/global/components/VModalFormulario.vue'));

// crear usuario
const usuario = ref({
    nombre: null,
    apellido: null,
    correo: null,
    password: null,
    idPerfil: null,
    idCliente: null,
    idSucursal: null,
    idArea: null,
});
const verificarPassword = ref(null);
const esSuperUsuario = computed(() => usuario.value.idPerfil === PERFILES.SUPERUSUARIO);
const esAdministrador = computed(() => usuario.value.idPerfil === PERFILES.ADMINISTRADOR);
const esSupervisor = computed(() => usuario.value.idPerfil === PERFILES.SUPERVISOR);
const esOperador = computed(() => usuario.value.idPerfil === PERFILES.OPERADOR);


provide('data', { dataElemento: usuario, extra: [verificarPassword] });

const reiniciarData = () => {
    for(let clave in usuario.value){
        usuario.value[clave] = null;
    }

    verificarPassword.value = null;
}

const crearUsuario = async() => {
    try{
        const res = await usuariosStore.crearUsuario({ data: usuario });
        await usuariosStore.obtenerUsuarios();
        reiniciarData();
        notificacion.nExito({ mensaje: MENSAJE_EXITO.CREACION });
        console.log(res);
    }catch(err){
        notificacion.nError({ mensaje: MENSAJE_ERROR.CREACION });
        console.log(err);
    }
}

// lifecycle
onMounted(() => {
    perfilesStore.obtenerPerfiles()
        .then(console.log)
        .catch(console.log);
});
</script>