import { ref, computed, toValue } from 'vue'
import { defineStore } from 'pinia'
import modulosService from '@/modules/modulos/services/modulosService';
import useRequest from '@/modules/global/composables/request/useRequest';
import { ICONOS } from '@/modules/global/utils/iconos';
import { formatearFecha } from '@/modules/global/utils/fecha';
import { VISTAS } from '@/modules/global/utils/vistas';

export default defineStore('modulos', () => {
    const request = useRequest(modulosService);

    const filtros = ref({
        pagina: 1,
        estatus: true,
        fecha: null,
        mac: null,
        cliente: null
    });
    const modulos = ref([]);
    const numResultados = ref(0);
    const modulosListado = computed(() => modulos.value.map(({ id, mac, cliente }) => ({
        id,
        icono: ICONOS.MODULOS,
        primario: mac,
        secundario: cliente?.nombre ?? '',
        vista: VISTAS.MODULOS_DATA
    })));
    const modulosOpciones = computed(() => modulos.value.map(({ id, mac }) => ({
        label: mac,
        value: id
    })));
    const filtroActivo = computed(() => (
        !filtros.value.estatus
        || !!filtros.value.fecha
        || !!filtros.value.mac
        || !!filtros.value.cliente
    ));

    const asignarData = ({ data, resultados }) => {
        modulos.value = data;
        numResultados.value = resultados;
    }

    const mapFiltros = () => {
        const mFiltros = {};

        mFiltros['pagina'] = filtros.value.pagina;
        mFiltros['estatus'] = filtros.value.estatus ? '1' : '0';
        mFiltros['fecha'] = filtros.value.fecha && formatearFecha(filtros.value.fecha);

        return mFiltros;
    }

    const obtenerModulos = async() => {
        try{
            const filtros = mapFiltros();
            const res = await request.obtenerElementos({ params: filtros });
            asignarData(res);

            return res;
        }catch(err){
            throw err;
        }
    }

    const obtenerModulo = async ({ id }) => {
        try{
            const res = await request.obtenerElemento({ id });
            return res;
        }catch(err){
            throw err;
        }
    }

    const obtenerDataModulo = async ({ id }) => {
        try{
            const res = await request.customEndpoint('obtenerDataElemento', { id });
            return res;
        }catch(err){
            throw err;
        }
    }

    const crearModulo = async({ data }) => {
        try{
            const res = await request.crearElemento({ data: toValue(data) });
            return res;
        }catch(err){
            throw err;
        }
    }

    const editarModulo = async({ id, data }) => {
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
        modulos,
        numResultados,
        modulosListado,
        modulosOpciones,
        crearModulo,
        obtenerModulo,
        obtenerDataModulo,
        obtenerModulos,
        editarModulo,
        reinciarFiltros
    }
});