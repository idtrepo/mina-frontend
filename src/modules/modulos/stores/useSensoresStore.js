import { ref, computed, toValue } from 'vue'
import { defineStore } from 'pinia'
import sensoresService from '@/modules/modulos/services/sensoresService';
import useRequest from '@/modules/global/composables/request/useRequest';
import { formatearFecha } from '@/modules/global/utils/fecha';

export default defineStore('sensores', () => {
    const request = useRequest(sensoresService);

    const filtros = ref({
        pagina: 1, 
        estatus: true,
        fecha: null,
        modulo: null,
    })

    const sensores = ref([]);
    const sensoresClave = computed(() => sensores.value.map(({ clave }) => clave));
    const numResultados = ref(0);
    const sensoresData = computed(() => sensores.value.map(({ id, clave, editar }) => ({ id, clave, editar })));
    const filtroActivo = computed(() => (
        !filtros.value.estatus
        || !!filtros.value.estatus
        || !!filtros.value.fecha
        || !!filtros.value.modulo
    ));

    const asignarData = ({ data, resultados }) => {
        sensores.value = data.map(sensor => ({
            ...sensor,
            editar: false
        }));
        numResultados.value = resultados;
    }

    const mapFiltros = () => {
        const mFiltros = {};

        mFiltros['pagina'] = filtros.value.pagina;
        mFiltros['estatus'] = filtros.value.estatus ? '1' : '0';
        mFiltros['fecha'] = filtros.value.fecha && formatearFecha(filtros.value.fecha);
        mFiltros['modulo'] = filtros.value.modulo;

        return mFiltros;
    }

    const obtenerSensores = async() => {
        try{
            const filtros = mapFiltros();
            const res = await request.obtenerElementos({ params: filtros });
            asignarData(res);

            return res;
        }catch(err){
            throw err;
        }
    }

    const crearSensor = async({ data }) => {
        try{
            const res = await request.crearElemento({ data: toValue(data) });
            return res;
        }catch(err){
            throw err;
        }
    }

    const editarSensor = async({ id, data }) => {
        try{
            const res = await request.editarElemento({ id, data });
            return res;
        }catch(err){
            throw err;
        }
    }

    return {
        sensores,
        sensoresClave,
        sensoresData,
        filtros,
        filtroActivo,
        numResultados,
        obtenerSensores,
        crearSensor,
        editarSensor,
    }
});