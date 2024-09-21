<template>
    <BaseForm :config="config">
        <template #contenido>
            <article class="mb-3">
                <p class="mb-1 uppercase">nombre</p>
                <NInput 
                    v-model:value="dataArea.nombre"
                    :placeholder="AREAS_PLACEHOLDER.NOMBRE"/>
            </article>
            <article class="mb-3">
                <p class="mb-1 uppercase">sucursal</p>
                <NSelect 
                    :options="opcionesSucursales"
                    v-model:value="dataArea.idSucursal"
                    :placeholder="AREAS_PLACEHOLDER.SUCURSAL"/>
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
import { AREAS_PLACEHOLDER } from '@/modules/global/utils/placeholder';
import useSucursalesStore from '@/modules/sucursales/stores/useSucursalesStore';
import useAreasStore from '../../stores/useAreasStore';

//Componentes
const BaseForm = defineAsyncComponent(() => import('@/modules/global/components/forms/BaseForm.vue'))

//Dependencias
const areasStore = useAreasStore();
const sucursalesStore = useSucursalesStore();
const { opcionesSucursales } = storeToRefs(sucursalesStore);
const notificacion = useNotificacion();

//Crear usuario
const dataArea = ref({
    nombre: null,
    idSucursal: null
});

const crearArea = async() => {
    try{
        const { mensaje } = await areasStore.crearArea({ data: dataArea });

        notificacion.nExito({ mensaje });
        reiniciarDataArea();
        await areasStore.obtenerAreas();
    }catch({ response: { data: { error:mensaje } } }){
        notificacion.nError({ mensaje });
    }   
}

const reiniciarDataArea = () => {
    for(let clave in dataArea.value){
        dataArea.value[clave] = null;
    }
}


//Config
const config = ref({
    formFuncCrear: crearArea,
    formTitulo: 'Nueva sucursal'
})

//Hooks
onMounted(() => {
    sucursalesStore.obtenerSucursales()
        .then(console.log)
        .catch(console.log);
})
</script>