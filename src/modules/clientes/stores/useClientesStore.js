import { ref, computed, toValue } from 'vue'
import { defineStore } from 'pinia'
import clientesService from '@/modules/clientes/services/clientesService';
import useRequest from '@/modules/global/composables/request/useRequest';
import { ICONOS } from '@/modules/global/utils/iconos';
import { formatearFecha } from '@/modules/global/utils/fecha';
import { VISTAS } from '@/modules/global/utils/vistas';

export default defineStore('clientes', () => {
    const request = useRequest(clientesService);

    const filtros = ref({
        pagina: 1,
        estatus: true,
        fecha: null,
        nombre: null
    });
    const clientes = ref([]);
    const numResultados = ref(0);
    const clientesListado = computed(() => clientes.value.map(({ id, nombre }) => ({
        id,
        icono: ICONOS.CLIENTES,
        primario: nombre,
        vista: VISTAS.CLIENTES_DATA
    })));
    const clientesOpciones = computed(() => clientes.value.map(({ id, nombre }) => ({
        label: nombre,
        value: id
    })));
    const filtroActivo = computed(() => (
        !filtros.value.estatus
        || !!filtros.value.fecha
    ))

    const asignarData = ({ data, resultados }) => {
        clientes.value = data;
        numResultados.value = resultados;
    }

    const mapFiltros = () => {
        const mFiltros = {};

        mFiltros['nombre'] = filtros.value.nombre;
        mFiltros['pagina'] = filtros.value.pagina;
        mFiltros['estatus'] = filtros.value.estatus ? '1' : '0';
        mFiltros['fecha'] = filtros.value.fecha && formatearFecha(filtros.value.fecha);

        return mFiltros;
    }

    const obtenerClientes = async() => {
        try{
            const mfiltros = mapFiltros();
            const res = await request.obtenerElementos({ params: mfiltros });
            asignarData(res);

            return res;
        }catch(err){
            throw err;
        }
    }

    const obtenerCliente = async({ id }) => {
        try{
            const res = await request.obtenerElemento({ id });

            return res;
        }catch(err){
            throw err;
        }
    }

    const crearCliente = async({ data }) => {
        try{
            const res = await request.crearElemento({ data: toValue(data) });
            return res;
        }catch(err){
            throw err;
        }
    }

    const editarCliente = async({ id, data }) => {
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
        clientes,
        numResultados,
        clientesListado,
        clientesOpciones,
        crearCliente,
        obtenerClientes,
        obtenerCliente,
        editarCliente,
        reinciarFiltros,
    }
});