import {computed, toValue} from 'vue';
import {storeToRefs} from 'pinia';
import {useRouter} from 'vue-router';
import {AreasService} from '@/modules/areas/services/areasService';
import {ICONOS} from '@/modules/global/utils/iconos';
import useAreasStore from '../stores/useAreasStore';
import useFiltrosStore from '@/stores/useFiltrosStore';
import useEdicionStore from '@/stores/useEdicionStore';
import {evaluarArea} from '../schemas/areas';
import {reiniciarData} from '@/utils/reinicio';
import useRequest from '@/composables/request/useRequest';
import {VISTAS} from '@/modules/global/utils/vistas';

export default () => {

    const router = useRouter();
    const filtrosStore = useFiltrosStore();
    const edicionStore = useEdicionStore();
    const areasStore = useAreasStore();
    const {editar, edicionHabilitada} = storeToRefs(edicionStore);
    const {filtros, filtrosMapeados} = storeToRefs(filtrosStore);
    const {area, areas, numeroElementos, areasOpciones} = storeToRefs(areasStore);

    const {obtenerElemento, obtenerElementos, crearElemento, editarElemento} = useRequest({
        servicio: AreasService,
        filtros: filtrosMapeados,
        evaluacion: evaluarArea
    });

    //listado de areas
    const areasListado = computed(() => areas.value.map(({id, nombre}) => ({
        id,
        titulo: nombre,
        icono: ICONOS.AREAS,
        accion: () => router.push({name: VISTAS.AREAS_DATA, params: {id}})
    })));

    const obtenerAreas = async ({params = null}) => {
        try {
            const res = await obtenerElementos({params});
            if (res) {
                areasStore.asignarDataAreas(res);
            }

            return res;
        } catch (err) {
            console.log(err)
            throw err;
        }
    };

    const obtenerArea = async ({id}) => {
        try {
            const res = await obtenerElemento({id});
            if (res) {
                areasStore.asignarDataArea(res);
            }

            return res;
        } catch (err) {
            console.log(err)
            throw err;
        }
    };

    const crearArea = async ({data}) => {
        try {
            const res = await crearElemento({data});
            if (res) {
                areasStore.asignarDataArea(res);
            }

            return res;
        } catch (err) {
            throw err;
        }
    };

    const editarArea = async ({id, data}) => {
        try {
            const res = await editarElemento({id, data});
            if (res) {
                areasStore.asignarDataArea(res);
            }

            return res;
        } catch (err) {
            throw err;
        }
    };

    const habilitarEdicion = () => {
        edicionStore.habilitarEdicion();

        if(editar.value){
            edicionStore.guardarData(area);
        } else {
            area.value = edicionStore.borrarData();
        }
    };

    //reiniciar datos
    function reiniciarDataCreacion() {
        area.value = reiniciarData(toValue(area));
    }

    function reiniciarDataAreas() {
        reiniciarDataCreacion();
        filtrosStore.reiniciarFiltros();
        edicionStore.reiniciarEdicion();
        areas.value = [];
    }

    return {
        editar,
        edicionHabilitada,
        filtros,
        area,
        numeroElementos,
        areasOpciones,
        areasListado,
        obtenerAreas,
        obtenerArea,
        crearArea,
        editarArea,
        habilitarEdicion,
        reiniciarDataAreas,
        reiniciarDataCreacion
    }
}