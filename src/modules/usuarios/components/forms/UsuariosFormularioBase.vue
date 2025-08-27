<template>
    <section>
        <article class="mb-4">
            <p class="mb-1 uppercase">perfil</p>
            <NSelect v-model:value="usuario.idPerfil" clearable :options="perfilesOpciones"
                :disabled="edicionHabilitada" />
        </article>
        <article class="mb-4">
            <p class="mb-1 uppercase">nombre</p>
            <NInput v-model:value="usuario.nombre" clearable :disabled="edicionHabilitada" />
        </article>
        <article class="mb-4">
            <p class="mb-1 uppercase">apellido</p>
            <NInput v-model:value="usuario.apellido" clearable :disabled="edicionHabilitada" />
        </article>
        <article class="mb-4">
            <p class="mb-1 uppercase">correo</p>
            <NInput v-model:value="usuario.correo" clearable :disabled="edicionHabilitada" />
        </article>
        <article class="mb-4">
            <p class="mb-1 uppercase">password</p>
            <NInput v-model:value="usuario.password" clearable :disabled="edicionHabilitada" />
        </article>
        <article v-if="!usuarioCliente" class="mb-4">
            <p class="mb-1 uppercase">cliente</p>
            <NSelect v-model:value="usuario.idCliente" clearable :options="clientesOpciones"
                :disabled="edicionHabilitada" />
        </article>
        <article v-if="!usuarioSucursal" class="mb-4">
            <p class="mb-1 uppercase">sucursal</p>
            <NSelect v-model:value="usuario.idSucursal" clearable :options="sucursalesOpciones"
                :disabled="edicionHabilitada" />
        </article>
        <article v-if="esOperador" class="mb-4">
            <p class="mb-1 uppercase">area</p>
            <NSelect v-model:value="usuario.idArea" clearable :options="areasOpciones"
                :disabled="!usuario.idSucursal || edicionHabilitada" />
        </article>
    </section>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { NInput, NSelect } from 'naive-ui'
import useUsuarios from '../../composables/useUsuarios';
import usePerfiles from '@/modules/perfiles/composables/usePerfiles';
import useClientes from '@/modules/clientes/composables/useClientes';
import useSucursales from '@/modules/sucursales/composables/useSucursales';
import useAreas from '@/modules/areas/composables/useAreas';
import { PERFILES_ID } from '@/utils/perfiles';
import useAutenticacion from '@/modules/auth/composables/useAutenticacion';
import { useRoute } from 'vue-router';


//dependencias
const { usuario, edicionHabilitada } = useUsuarios();
const { perfilesOpciones } = usePerfiles();
const { clientesOpciones } = useClientes();
const { sucursalesOpciones } = useSucursales();
const { areasOpciones, obtenerAreas } = useAreas();
const { usuarioCliente, usuarioSucursal, usuarioArea } = useAutenticacion();
const route = useRoute();

// logica perfiles
const esSuperUsuario = computed(() => usuario.value.idPerfil === PERFILES_ID.SUPERUSUARIO);
const esAdmin = computed(() => usuario.value.idPerfil === PERFILES_ID.ADMINISTRADOR);
const esSupervisor = computed(() => usuario.value.idPerfil === PERFILES_ID.SUPERVISOR);
const esOperador = computed(() => usuario.value.idPerfil === PERFILES_ID.OPERADOR);

onMounted(() => {
    if (route.params) {
        route.params.sucursal ? usuario.value.idSucursal = parseInt(route.params.sucursal) : usuario.value.idSucursal = null;
        route.params.area ? usuario.value.idArea = parseInt(route.params.area) : usuario.value.idArea = null;
        route.params.cliente ? usuario.value.idCliente = parseInt(route.params.cliente) : usuario.value.idCliente = null;
    } else {
        usuarioSucursal.value ? usuario.value.idSucursal = usuarioSucursal.value : usuario.value.idSucursal = null;
        usuarioCliente.value ? usuario.value.idCliente = usuarioCliente.value : usuario.value.idCliente = null;
        usuarioArea.value ? usuario.value.idArea = usuarioArea.value : usuario.value.idArea = null;
    }
    obtenerAreas({ params: { sucursal: usuario.value.idSucursal } });
});

//watch para obtener las areas de la sucursal seleccionada
watch(() => usuario.value.idSucursal, (nuevaSucursal) => {
    obtenerAreas({ params: { sucursal: nuevaSucursal } });
});
</script>