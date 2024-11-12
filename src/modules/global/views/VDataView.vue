<template>
<div class="pt-8">
        <slot name="header"></slot>
        <section>
            <header class="flex items-center justify-between">
                <h2></h2>
                <section class="fixed lg:static right-5 bottom-24 flex flex-col-reverse lg:flex-row gap-y-3 items-center gap-x-2 opacity-85 lg:opacity-100">
                    <VBoton 
                        :funcion-accion="habilitarEdicion"
                        :titulo="tituloBotonEdicion" 
                        :icono="iconoBotonEdicion"
                        tipo="advertencia"/>
                    <template v-if="editar">
                        <VBoton 
                            :funcion-accion="confirmarEdicion"
                            :icono="ICONOS.GUARDAR"
                            titulo="guardar" 
                            tipo="exito"/>
                        <VBoton 
                            :funcion-accion="eliminarElemento"
                            :icono="ICONOS.ELIMINAR"
                            titulo="eliminar" 
                            tipo="peligro"/>
                    </template>
                </section>
            </header>
            <section>
                <slot name="contenido" :editar="editar"></slot>
            </section>
            <footer>
                <slot name="extra"></slot>
            </footer>
        </section>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { defineAsyncComponent } from 'vue'
import { ICONOS } from '../utils/iconos';
import { onUnmounted } from 'vue'
import { useDialog } from 'naive-ui'
import useNotificacion from '../composables/useNotificacion';
import { MENSAJE_EXITO, MENSAJE_ERROR } from '../utils/mensajes';

// dependencias
const dialog = useDialog();
const notificacion = useNotificacion();

// propiedades
const props = defineProps({
    elemento: {
        type: Object,
        default: () => ({})
    },
    editarElemento: {
        type: Function,
        default: () => console.log('editar elemento')
    },
    obtenerElemento: {
        type: Function,
        default: () => console.log('obtener elemento')
    }
});

// eventos
const emit = defineEmits(['reiniciar-elemento']);

// componentes
const VBoton = defineAsyncComponent(() => import('@/modules/global/components/VBoton.vue'));

// editar elemento
const copiaElemento = ref({});
const elemento = ref(props.elemento);
const editar = ref(false);
const tituloBotonEdicion = computed(() => editar.value ? 'cancelar' : 'editar');
const iconoBotonEdicion = computed(() => editar.value ? ICONOS.EQUIS : ICONOS.EDITAR);

const habilitarEdicion = () => {
    editar.value = !editar.value;

    if(editar.value){
        copiaElemento.value = { ...elemento.value };
    }else{
        elemento.value = { ...copiaElemento.value };
        emit('reiniciar-elemento', elemento.value);
    }
}

const reinciarElementos = () => {
    copiaElemento.value = {};
    editar.value = false;
}

const editarElemento = async() => {
    const { id, ...dataElemento } = elemento.value;

    try{
        const res = await props.editarElemento({ id, data: dataElemento });
        await props.obtenerElemento({ id });
        reinciarElementos();
        notificacion.nExito({ mensaje: MENSAJE_EXITO.EDICION });
    }catch(err){
        console.log(err);
        notificacion.nError({ mensaje: MENSAJE_ERROR.EDICION });
    }
}

const eliminarElemento = async() => {
    const { id } = elemento.value;

    try{
        const res = await props.editarElemento({ id, data: { estatus: false } });
        console.log(res);
    }catch(err){
        console.log(err);
    }
}

const confirmarEdicion = () => {
    dialog.warning({
        title: 'Mensaje de confirmacion',
        content: '¿Esta seguro de editar este registro?',
        positiveText: 'Aceptar',
        negativeText: 'Cancelar',
        onPositiveClick: () => {
            editarElemento();
        },
        onNegativeClick: () => {
            reinciarElementos();
        }
    })
}

const confirmarEliminacion = () => {

}

// lifecycle
onUnmounted(() => {
    reinciarElementos();
})
</script>