<template>
    <BaseForm :config="config">
        <template #contenido>
            <article class="mb-3">
                <p class="mb-1 uppercase">nombre</p>
                <NInput 
                    v-model:value="dataPerfil.nombre"
                    :placeholder="PERFILES_PLACEHOLDER.NOMBRE"/>
            </article>
        </template>
    </BaseForm>
</template>

<script setup>
import { ref, computed } from 'vue'
import { defineAsyncComponent } from 'vue'
import { NSelect, NInput } from 'naive-ui'
import useNotificacion from '@/modules/global/composables/useNotificacion';
import usePerfilesStore from '../../stores/usePerfilesStore';
import { PERFILES_PLACEHOLDER } from '@/modules/global/utils/placeholder';

//Dependencias 
const notificacion = useNotificacion();
const perfilesStore = usePerfilesStore();

//Componentes
const BaseForm = defineAsyncComponent(() => import('@/modules/global/components/forms/BaseForm.vue'));

//Crear perfil
const dataPerfil = ref({
    nombre: null
})

const reiniciarDataPerfil = () => {
    dataPerfil.value.nombre = null;
}

const crearPerfil = async() => {
    try{
        const { mensaje } = await perfilesStore.crearPerfil({
            data: dataPerfil
        })

        notificacion.nExito({ mensaje });
        await perfilesStore.obtenerPerfiles();
        reiniciarDataPerfil();
    }catch({ response: { data: { error:mensaje } } }){
        notificacion.nError({ mensaje });
    }
}

//Config form
const config = ref({
    formTitulo: 'Nuevo perfil',
    formFuncCrear: crearPerfil
});

//Hooks
</script>