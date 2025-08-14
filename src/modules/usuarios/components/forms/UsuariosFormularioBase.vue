<template>
    <section>
        <article class="mb-4">
            <p class="mb-1 uppercase">perfil</p>
            <NSelect 
                v-model:value="usuario.idPerfil"
                clearable
                :options="perfilesOpciones"
                :disabled="edicionHabilitada"/>
        </article>
        <article class="mb-4">
            <p class="mb-1 uppercase">nombre</p>
            <NInput 
                v-model:value="usuario.nombre"
                clearable
                :disabled="edicionHabilitada"/>
        </article>
        <article class="mb-4">
            <p class="mb-1 uppercase">apellido</p>
            <NInput 
                v-model:value="usuario.apellido"
                clearable
                :disabled="edicionHabilitada"/>
        </article>
        <article class="mb-4">
            <p class="mb-1 uppercase">correo</p>
            <NInput 
                v-model:value="usuario.correo"
                clearable
                :disabled="edicionHabilitada"/>
        </article>
        <article class="mb-4">
            <p class="mb-1 uppercase">password</p>
            <NInput 
                v-model:value="usuario.password"
                clearable
                :disabled="edicionHabilitada"/>
        </article>
        <article v-if="usuarioPerfilId < 2 " class="mb-4">
            <p class="mb-1 uppercase">cliente</p>
            <NSelect 
                v-model:value="usuario.idCliente"
                clearable
                :options="clientesOpciones"
                :disabled="edicionHabilitada"/>
        </article>
        <article v-if="esSupervisor && usuarioPerfilId < 3" class="mb-4">
            <p class="mb-1 uppercase">sucursal</p>
            <NSelect 
                v-model:value="usuario.idSucursal"
                clearable
                :options="sucursalesOpciones"
                :disabled="edicionHabilitada"/>
        </article>
        <article v-if="esOperador" class="mb-4">
            <p class="mb-1 uppercase">area</p>
                <NSelect 
                    v-model:value="usuario.idArea"
                    clearable
                    :options="areasOpciones"
                    :disabled="!usuario.idSucursal || edicionHabilitada"/>
        </article>
    </section>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue'
import { NInput, NSelect } from 'naive-ui'
import useUsuarios from '../../composables/useUsuarios';
import usePerfiles from '@/modules/perfiles/composables/usePerfiles';
import useClientes from '@/modules/clientes/composables/useClientes';
import useSucursales from '@/modules/sucursales/composables/useSucursales';
import useAreas from '@/modules/areas/composables/useAreas';
import useUsuarioStore from '@/stores/useUsuarioStore';
import { PERFILES_ID } from '@/utils/perfiles';
import { storeToRefs } from 'pinia';


//dependencias
const { usuario, edicionHabilitada } = useUsuarios();
const usuarioStore = useUsuarioStore();
const { perfilesOpciones } = usePerfiles();
const { clientesOpciones } = useClientes();
const { sucursalesOpciones } = useSucursales();
const { areasOpciones, obtenerAreas} = useAreas();
const {usuarioPerfilId, usuarioCliente } = storeToRefs(usuarioStore);

// logica perfiles
const esSuperUsuario = computed(() => usuario.value.idPerfil === PERFILES_ID.SUPERUSUARIO);
const esAdmin = computed(() => usuario.value.idPerfil === PERFILES_ID.ADMINISTRADOR);
const esSupervisor = computed(() => usuario.value.idPerfil === PERFILES_ID.SUPERVISOR);
const esOperador = computed(() => usuario.value.idPerfil === PERFILES_ID.OPERADOR);

// Autoasignar cliente cuando no es superusuario
const autoAsignarCliente = () => {
    if ((!usuarioPerfilId.value < 2) && usuarioCliente.value && usuario.value) {
        usuario.value.idCliente = usuarioCliente.value;
    }
};
const autoAsignarSucursal = () => {
    if ((!usuarioPerfilId.value < 3) && usuarioStore.usuarioSucursal && usuario.value) {
        usuario.value.idSucursal = usuarioStore.usuarioSucursal;
    }
};
onMounted(() => {
    console.log("perfil", usuarioCliente);
    autoAsignarCliente();
    autoAsignarSucursal();
    obtenerAreas({params: { sucursal: usuario.value.idSucursal }});
});
watch(() => usuario.value.idPerfil, () => autoAsignarCliente());
</script>