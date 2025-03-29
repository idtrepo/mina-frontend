import {computed, toValue} from 'vue';
import {storeToRefs} from 'pinia';
import {OperacionesService} from '../services/operacionesService';
import useOperacionesStore from '../stores/useOperacionesStore';
import useRequest from '@/composables/request/useRequest';
import {ICONOS} from '@/modules/global/utils/iconos';
import {VISTAS} from '@/modules/global/utils/vistas';
import useFiltrosStore from '@/stores/useFiltrosStore';
import useEdicionStore from '@/stores/useEdicionStore';
import {reiniciarData} from '@/utils/reinicio';
import {evaluarOperacion} from '../schemas/operacionesSchema';
import {useRouter} from 'vue-router';

export default () => {
    const operacionesStore = useOperacionesStore();
    const router = useRouter();
    const filtrosStore = useFiltrosStore();
    const {filtros, filtrosMapeados} = storeToRefs(filtrosStore);
    const edicionStore = useEdicionStore();
    const { editar, edicionHabilitada } = storeToRefs(edicionStore);
    const {operacion, operaciones, numeroElementos, operacionesOpciones} = storeToRefs(operacionesStore);
    const {obtenerElemento, obtenerElementos, crearElemento, editarElemento} = useRequest({
        servicio: OperacionesService,
        filtros:filtrosMapeados,
        evaluacion: evaluarOperacion,
    });

    const operacionesListado = computed(() =>
        operaciones.value.map(({ id, nombre }) => ({
          id,
          titulo: nombre,
          icono: ICONOS.PERFILES,
          accion: () => router.push({ name: VISTAS.OPERACIONES_DATA, params: { id } }),
        }))
      );

    const obtenerOperaciones = async ({params = null} = {}) => {
        const res = await obtenerElementos({params});
        
        if(res){
            operacionesStore.asignarDataOperaciones(res);
        }
        return res;
    };

    const obtenerOperacion = async ({id}) => {
        const res = await obtenerElemento({id});

        if(res){
            operacionesStore.asignarDataOperacion(res);
        }
        return res;
    }

    const editarOperacion = async () => {
        const res = await editarElemento({dataElemento: operacion});

        if(res){
            reiniciarDataCreacion();
            await obtenerOperaciones();
        }

        return res;
    }

    const crearOperacion = async () => {
        const res = await crearElemento({dataElemento: operacion});

        if (res) {
          reiniciarDataCreacion();
          await obtenerOperaciones();
        }

        return res;
    }

    const habilitarEdicion = () => {
        edicionStore.habilitarEdicion();
    
        if (editar.value) {
          edicionStore.guardarData(permiso);
        } else {
          operacion.value = edicionStore.borrarData();
        }
      };

    // Reiniciar datos
      function reiniciarDataCreacion() {
        operacion.value = reiniciarData(toValue(operacion));
      }
    
      function reiniciarDataOperaciones() {
        reiniciarDataCreacion();
        filtrosStore.reiniciarFiltros();
        edicionStore.reiniciarEdicion();
        operaciones.value = [];
      }

    return {
        operacion,
        operaciones,
        operacionesListado,
        numeroElementos,
        operacionesOpciones,
        editar,
        edicionHabilitada,
        obtenerOperaciones,
        obtenerOperacion,
        editarOperacion,
        habilitarEdicion,
        reiniciarDataCreacion,
        reiniciarDataOperaciones,
        crearOperacion,
        filtros,
    }
}