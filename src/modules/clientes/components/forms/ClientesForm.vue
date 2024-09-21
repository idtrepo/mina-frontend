<template>
    <BaseForm :config="config">
        <template #contenido>
            <article class="mb-3">
                <p class="mb-1 uppercase">nombre</p>
                <NInput 
                    v-model:value="dataCliente.nombre"
                    :placeholder="CLIENTES_PLACEHOLDER.NOMBRE"/>
            </article>
        </template>
    </BaseForm>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { defineAsyncComponent } from 'vue';
import { NInput } from 'naive-ui'
import useNotificacion from '@/modules/global/composables/useNotificacion';
import { CLIENTES_PLACEHOLDER } from '@/modules/global/utils/placeholder';
import useClientesStore from '@/modules/clientes/stores/useClientesStore';

//Componentes
const BaseForm = defineAsyncComponent(() => import('@/modules/global/components/forms/BaseForm.vue'))

//Dependencias
const clientesStore = useClientesStore();
const notificacion = useNotificacion();

//Crear usuario
const dataCliente = ref({
    nombre: null,
});

const crearCliente = async() => {
    try{
        const { mensaje } = await clientesStore.crearCliente({ data: dataCliente });

        notificacion.nExito({ mensaje });
        reiniciarDataCliente();
        await clientesStore.obtenerClientes();
    }catch({ response: { data: { error:mensaje } } }){
        notificacion.nError({ mensaje });
    }   
}

const reiniciarDataCliente = () => {
    dataCliente.value.nombre = null;
}


//Config
const config = ref({
    formFuncCrear: crearCliente,
    formTitulo: 'Nuevo cliente'
})
</script>