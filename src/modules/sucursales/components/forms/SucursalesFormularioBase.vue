<template>
    <section>
        <article class="mb-4">
            <p class="mb-1 uppercase">nombre</p>
            <NInput 
                v-model:value="sucursal.nombre"
                clearable
                :disabled="edicionHabilitada"/>
        </article>
        <article class="mb-4 uppercase">
            <p>cliente</p>
            <NSelect 
                v-model:value="sucursal.idCliente"
                clearable
                :options="clientesOpciones"
                :disabled="!!usuarioCliente || edicionHabilitada"/>
        </article>
    </section>
</template>

<script setup>
import { NInput, NSelect } from 'naive-ui'
import { computed, watch, onMounted } from 'vue'
import useSucursales from '@/modules/sucursales/composables/useSucursales';
import useClientes from '@/modules/clientes/composables/useClientes';
import useUsuarioStore from '@/stores/useUsuarioStore';
import { storeToRefs } from 'pinia';
//dependencias
const { clientesOpciones } = useClientes();
const { sucursal, edicionHabilitada } = useSucursales();
const usuarioStore = useUsuarioStore();
const { usuarioPerfilId, usuarioCliente } = storeToRefs(usuarioStore);

// Si el usuario tiene cliente asociado, forzar ese id en la sucursal y bloquear edición
const aplicarClienteUsuario = () => {
    if (usuarioCliente.value) {
        sucursal.value.idCliente = usuarioCliente.value;
    }
};

onMounted(aplicarClienteUsuario);
watch(usuarioCliente, () => aplicarClienteUsuario());
</script>