<template>
    <div>
        <article class="hidden md:block">
            <NButton
                v-if="permisoEditar"
                @click="habilitarEdicion"
                type="warning">
                <template #icon>
                    <i :class="iconoBotonEdicion"></i>
                </template>
                <span class="uppercase font-bold">{{ tituloBotonEdicion }}</span>
            </NButton>
            <NButton 
                v-if="editar"
                @click="confirmarEdicion"
                class="ml-2"
                type="success">
                <template #icon>
                    <i :class="ICONOS.GUARDAR"></i>
                </template>
                <span class="uppercase font-bold">guardar</span>
            </NButton>
        </article>
        <article class="md:hidden">
            <NFloatButton :bottom="115" :right="30" type="primary" menu-trigger="click">
                <i :class="ICONOS.MENU"></i>
                <template #menu>
                    <NFloatButton v-if="editar" @click="confirmarEdicion">
                        <i :class="ICONOS.GUARDAR"></i>
                    </NFloatButton>
                    <NFloatButton @click="habilitarEdicion">
                        <i :class="iconoBotonEdicion"></i> 
                    </NFloatButton>
                </template>
            </NFloatButton>
        </article>
    </div>
</template>

<script setup>
import { ref, computed, watch, toRefs, toValue } from 'vue'
import { NFloatButton, NButton } from 'naive-ui'
import { useDialog } from 'naive-ui'
import { ICONOS } from '@/modules/global/utils/iconos';
import useEdicionStore from '@/stores/useEdicionStore';
import {storeToRefs} from 'pinia'
import useUsuarioStore from '@/stores/useUsuarioStore';
import { useRoute } from 'vue-router';

//dependencias
const usuarioStore = useUsuarioStore();
const {usuarioPermisos } = storeToRefs(usuarioStore);
const route = useRoute();

const permisoEditar = computed(() => usuarioPermisos.value[route.name.split('-')[0]]?.includes('editar') || false);

const edicionStore = useEdicionStore();
const { editar } = storeToRefs(edicionStore);

// props
const props = defineProps({
    idElemento: {
        type: String,
        default: null,
    },
    editarElemento: {
        type: Function,
        default: () => {}
    },
    habilitarEdicion: {
        type: Function,
        default: () => {}
    }, 
});


const { idElemento } = toRefs(props);

// depenedencia
const dialog = useDialog();

// habilitar edicion de registro
const iconoBotonEdicion = computed(() => !editar.value ? ICONOS.EDITAR : ICONOS.EQUIS);
const tituloBotonEdicion = computed(() => !editar.value ? 'editar' : 'cancelar');


const confirmarEdicion = () => {
    dialog.warning({
        title: 'Editar',
        content: '¿Estas seguro de editar este registro?',
        positiveText: 'aceptar',
        negativeText: 'cancelar',
        onPositiveClick: async() => {
            if(!idElemento.value) return;

            try{
                await props.editarElemento({ id: parseInt(toValue(idElemento)) });
                editar.value = false;
            }catch(err){
                console.log(err);
            }
        }
    });
}

</script>