import { ref, computed, toValue } from 'vue'
import { defineStore } from 'pinia'
import areasService from '@/modules/areas/services/areasService';
import useRequest from '@/modules/global/composables/request/useRequest';
import { ICONOS } from '@/modules/global/utils/iconos';
import { formatearFecha } from '@/modules/global/utils/fecha';
import { VISTAS } from '@/modules/global/utils/vistas';

export default defineStore('areas', () => {
    const request = useRequest(areasService);

    const filtros = ref({
        pagina: 1,
        estatus: true,
        fecha: null,
        nombre: null,
        sucursal: null,
    });
    const areas = ref([]);
    const numResultados = ref(0);
    const areasListado = computed(() => areas.value.map(({ id, nombre }) => ({
        id,
        icono: ICONOS.AREAS,
        primario: nombre,
        vista: VISTAS.AREAS_DATA
    })));
    const areasOpciones = computed(() => areas.value.map(({ id, nombre }) => ({
        label: nombre,
        value: id,
    })));
    const filtroActivo = computed(() => (
        !filtros.value.estatus
        || !!filtros.value.fecha
        || !!filtros.value.nombre
        || !!filtros.value.sucursal
    ))

    const asignarData = ({ data, resultados }) => {
        areas.value = data;
        numResultados.value = resultados;
    }

    const mapFiltros = () => {
        const mFiltros = {};

        mFiltros['nombre'] = filtros.value.nombre;
        mFiltros['sucursal'] = filtros.value.sucursal;
        mFiltros['pagina'] = filtros.value.pagina;
        mFiltros['estatus'] = filtros.value.estatus ? '1' : '0';
        mFiltros['fecha'] = filtros.value.fecha && formatearFecha(filtros.value.fecha);

        return mFiltros;
    }

    const obtenerAreas = async() => {
        try{
            const filtros = mapFiltros();
            const res = await request.obtenerElementos({ params: filtros });
            asignarData(res);

            return res;
        }catch(err){
            throw err;
        }
    }

    const obtenerArea = async({ id }) => {
        try{
            const res = await request.obtenerElemento({ id });

            return res;
        }catch(err){
            throw err;
        }
    }

    const crearArea = async({ data }) => {
        try{
            const res = await request.crearElemento({ data: toValue(data) });
            return res;
        }catch(err){
            throw err;
        }
    }

    const editarArea = async({ id, data }) => {
        try{
            const res = await request.editarElemento({ id, data });
            return res;
        }catch(err){
            throw err;
        }
    }

    const reinciarFiltros = () => {
        for(let clave in filtros.value){
            filtros.value[clave] = null;
        }

        filtros.value.estatus = true;
        filtros.value.pagina = 1;
    }

    return {
        filtros,
        filtroActivo,
        areas,
        numResultados,
        areasListado,
        areasOpciones,
        crearArea,
        obtenerAreas,
        obtenerArea,
        reinciarFiltros,
        editarArea,
    }
});