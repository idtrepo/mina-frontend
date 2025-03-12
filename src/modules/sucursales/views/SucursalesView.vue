<template>
    <VListadoView
        :elementos="sucursalesListado"
        :numElementos="numeroElementos"
        :obtenerListado = "obtenerSucursales"
        :reiniciarData = "reiniciarDataCreacion">
        <template #buscador>
            <SucursalesBuscador/>
        </template>
        <template #formulario>
            <SucursalesForm/>
        </template>
    </VListadoView>
</template>

<script setup>
import { onMounted, provide, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia';
import { defineAsyncComponent } from 'vue'
import useSucursales from '../composables/useSucursales';
import useClientes from '@/modules/clientes/composables/useClientes';
import useUsuarioStore from "@/modules/auth/stores/useUsuarioStore"


// dependencias
const usuarioStore = useUsuarioStore();
const clientesStore = useClientes();
const {usuarioPerfil} = storeToRefs(usuarioStore)
const { sucursalesListado, numeroElementos, obtenerSucursales, reiniciarDataCreacion, reiniciarDataSucursales } = useSucursales();

// componentes
const VListadoView = defineAsyncComponent(() => import('@/views/listado/VListadoView.vue'));
const SucursalesForm = defineAsyncComponent(() => import('@/modules/sucursales/components/SucursalesForm.vue'));
const SucursalesBuscador = defineAsyncComponent(() => import('@/modules/sucursales/components/SucursalesBuscador.vue'));

onMounted(() => {
    Promise.allSettled([
        obtenerSucursales({params:{ listado: true }})
    ])
        .then(console.log)
        .catch(console.log);
        const obtenerClientes = async () => {
        if(usuarioPerfil.value === "superusuario"){
            await clientesStore.obtenerClientes({params:{ listado: true }})
            console.log("clientesobtenidos")
        }
    }
    obtenerClientes();
});

onUnmounted(() => {
    reiniciarDataSucursales();
})
</script>