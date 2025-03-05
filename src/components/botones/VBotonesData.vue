<template>
    <div>
        <article class="hidden md:block">
            <NButton
                @click="habilitarEdicionRegistro"
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
                    <NFloatButton @click="habilitarEdicionRegistro">
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
    cbCancelarEdicion: {
        type: Function,
        default: () => {}
    }, 
});

// eventos
const emit = defineEmits(['editar-elemento']);

const { idElemento } = toRefs(props);

// depenedencia
const dialog = useDialog();

// habilitar edicion de registro
const editar = ref(false);

const iconoBotonEdicion = computed(() => !editar.value ? ICONOS.EDITAR : ICONOS.EQUIS);
const tituloBotonEdicion = computed(() => !editar.value ? 'editar' : 'cancelar');

const habilitarEdicionRegistro = () => {
    editar.value = !editar.value;
    emit('editar-elemento', editar.value);
}

const confirmarEdicion = () => {
    dialog.warning({
        title: 'Eliminar',
        content: '¿Estas seguro de eliminar este registro?',
        positiveText: 'aceptar',
        negativeText: 'cancelar',
        onPositiveClick: async() => {
            if(!idElemento.value) return;

            try{
                await props.editarElemento({ id: parseInt(toValue(idElemento)) });
                editar.value = false;
                props.cbCancelarEdicion();
                emit('editar-elemento', editar.value);
            }catch(err){
                console.log(err);
            }
        }
    });
}

watch(editar, newValue => {
    if(!newValue) props.cbCancelarEdicion();
})
</script>