<template>
    <BaseForm :config="config">
        <template #contenido>
            <article class="mb-3">
                <p class="mb-1 uppercase">nombre</p>
                <NInput 
                    v-model:value="dataSucursal.nombre"
                    :placeholder="SUCURSALES_PLACEHOLDER.NOMBRE"/>
            </article>
            <article class="mb-3">
                <p class="mb-1 uppercase">cliente</p>
                <NSelect 
                    :options="opcionesClientes"
                    v-model:value="dataSucursal.idCliente"
                    :placeholder="SUCURSALES_PLACEHOLDER.CLIENTE"/>
            </article>
        </template>
    </BaseForm>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { defineAsyncComponent } from 'vue';
import { storeToRefs } from 'pinia'
import { NInput, NSelect } from 'naive-ui'
import useNotificacion from '@/modules/global/composables/useNotificacion';
import { SUCURSALES_PLACEHOLDER } from '@/modules/global/utils/placeholder';
import useClientesStore from '@/modules/clientes/stores/useClientesStore';
import useSucursalesStore from '../../stores/useSucursalesStore';

//Componentes
const BaseForm = defineAsyncComponent(() => import('@/modules/global/components/forms/BaseForm.vue'))

//Dependencias
const sucursalesStore = useSucursalesStore();
const clientesStore = useClientesStore();
const { opcionesClientes } = storeToRefs(clientesStore);
const notificacion = useNotificacion();

//Crear usuario
const dataSucursal = ref({
    nombre: null,
    idCliente: null
});

const crearSucursal = async() => {
    try{
        const { mensaje } = await sucursalesStore.crearSucursal({ data: dataSucursal });

        notificacion.nExito({ mensaje });
        reiniciarDataSucursal();
        await sucursalesStore.obtenerSucursales();
    }catch({ response: { data: { error:mensaje } } }){
        notificacion.nError({ mensaje });
    }   
}

const reiniciarDataSucursal = () => {
    for(let clave in dataSucursal.value){
        dataSucursal.value[clave] = null;
    }
}


//Config
const config = ref({
    formFuncCrear: crearSucursal,
    formTitulo: 'Nueva sucursal'
})

//Hooks
onMounted(() => {
    clientesStore.obtenerClientes()
        .then(console.log)
        .catch(console.log);
})
</script>