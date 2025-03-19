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
        <article v-if="esAdmin || esSupervisor || esOperador" class="mb-4">
            <p class="mb-1 uppercase">cliente</p>
            <NSelect 
                v-model:value="usuario.idCliente"
                clearable
                :options="clientesOpciones"
                :disabled="edicionHabilitada"/>
        </article>
        <article v-if="esSupervisor || esOperador" class="mb-4">
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
                :disabled="edicionHabilitada"/>
        </article>
    </section>
</template>

<script setup>
import { computed } from 'vue'
import { NInput, NSelect } from 'naive-ui'
import useUsuarios from '../../composables/useUsuarios';
import usePerfiles from '@/modules/perfiles/composables/usePerfiles';
import useClientes from '@/modules/clientes/composables/useClientes';
import useSucursales from '@/modules/sucursales/composables/useSucursales';
import useAreas from '@/modules/areas/composables/useAreas';
import { PERFILES_ID } from '@/utils/perfiles';

//dependencias
const { usuario, edicionHabilitada } = useUsuarios();
const { perfilesOpciones } = usePerfiles();
const { clientesOpciones } = useClientes();
const { sucursalesOpciones } = useSucursales();
const { areasOpciones } = useAreas();

// logica perfiles
const esSuperUsuario = computed(() => usuario.value.idPerfil === PERFILES_ID.SUPERUSUARIO);
const esAdmin = computed(() => usuario.value.idPerfil === PERFILES_ID.ADMINISTRADOR);
const esSupervisor = computed(() => usuario.value.idPerfil === PERFILES_ID.SUPERVISOR);
const esOperador = computed(() => usuario.value.idPerfil === PERFILES_ID.OPERADOR);
</script>