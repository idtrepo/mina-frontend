import { ref, computed, h } from 'vue'
import { onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { NButton, NInput } from 'naive-ui'
import useSensoresStore from '../stores/useSensoresStore';
import { useDialog } from 'naive-ui';
import useNotificacion from '@/modules/global/composables/useNotificacion';
import { MENSAJE_ERROR, MENSAJE_EXITO } from '@/modules/global/utils/mensajes';

export default () => {
    // dependencias
    const notificacion = useNotificacion();
    const dialog = useDialog();
    const route = useRoute();
    const sensoresStore = useSensoresStore();
    const { filtros, sensoresData, sensores } = storeToRefs(sensoresStore);

    //crear sensor
    const sensor = ref({
        clave: null,
        idModulo: null
    })

    const crearSensor = async() => {
        if(!sensor.value.clave)
            return notificacion.nAviso({ mensaje: 'No puede crear un sensor, sin asignarle un clave de identificacion.' })

        try{
            const res = await sensoresStore.crearSensor({ data: sensor });
            notificacion.nExito({ mensaje: MENSAJE_EXITO.CREACION });
            await sensoresStore.obtenerSensores();
            sensor.value.clave = null;
        }catch(err){
            notificacion.nError({ mensaje: MENSAJE_ERROR.CREACION });
        }
    }

    //tabla sensores
    const copiaSensor = ref(null);

    const columnas = ref([
        {
            title: 'clave',
            key: 'clave',
            render: (row, index) => row.editar
                ? h(NInput, 
                    { 
                        type: 'text', 
                        clearable: true, 
                        value: row.clave, 
                        onUpdateValue: v => sensores.value[index].clave = v 
                    })
                : h('p', {}, `${ row.clave }`)
        },
        {
            title: 'acciones',
            key: 'acciones',
            render: (row, index) => h('div', {}, [
                h(NButton, 
                    { 
                        type: 'warning', 
                        strong: true,
                        disabled: (!!copiaSensor.value && !row.editar),
                        onClick: () => habilitarEdicion(index) 
                    }, 
                    { 
                        default: () => row.editar ? 'Cancelar' : 'Editar' 
                    }
                ),
                !row.editar 
                    ? h(NButton, 
                        { 
                            type: 'error',
                            strong: true, 
                            class: ['ml-2'],
                            disabled: (!!copiaSensor.value && !row.editar),
                        }, 
                        { 
                            default: () => 'Eliminar' 
                        }
                    )
                    : h(NButton, 
                        { 
                            type: 'success',
                            strong: true, 
                            class: ['ml-2'],
                            onClick: () => {
                                dialog.warning({
                                    title: 'Mensaje de confirmacion',
                                    content: '¿Esta seguro de editar este registro?',
                                    positiveText: 'Aceptar',
                                    negativeText: 'Cancelar',
                                    onPositiveClick: async() => {
                                        console.log('Se edito el sensor');

                                    }
                                })
                            }
                        }, 
                        { 
                            default: () => 'Guardar' 
                        }
                    ),
            ]) 
        },
    ])

    function habilitarEdicion(index){
        console.log('Habilitar edicion del sensor');
        sensores.value[index].editar = !sensores.value[index].editar;

        if(sensores.value[index].editar){
            copiaSensor.value = { ...sensores.value[index] };
        }else{
            sensores.value[index] = { ...copiaSensor.value, editar: false };
            copiaSensor.value = null;
        }
    }

    // lifecycle
    onMounted(() => {
        const { id } = route.params;
        const idModulo = parseInt(id);
        sensor.value.idModulo = idModulo;
        filtros.value.modulo = idModulo;

        sensoresStore.obtenerSensores()
            .then(console.log)
            .catch(console.log)
    });

    onUnmounted(() => {
        copiaSensor.value = null;
    })

    return {
        sensor,
        columnas,
        sensoresData,

        crearSensor,
    }
}