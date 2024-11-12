import { ref, computed, toValue } from 'vue'
import { defineStore } from 'pinia'
import sucursalesService from '@/modules/sucursales/services/sucursalesService';
import useRequest from '@/modules/global/composables/request/useRequest';
import { ICONOS } from '@/modules/global/utils/iconos';
import { formatearFecha } from '@/modules/global/utils/fecha';
import { VISTAS } from '@/modules/global/utils/vistas';

export default defineStore('sucursales', () => {
    const request = useRequest(sucursalesService);

    const filtros = ref({
        pagina: 1,
        estatus: true,
        fecha: null,
        nombre: null,
        cliente: null,
    });
    const sucursales = ref([]);
    const numResultados = ref(0);
    const sucursalesListado = computed(() => sucursales.value.map(({ id, nombre }) => ({
        id,
        icono: ICONOS.SUCURSALES,
        primario: nombre,
        vista: VISTAS.SUCURSALES_DATA
    })));
    const sucursalesOpciones = computed(() => sucursales.value.map(({ id, nombre }) => ({
        label: nombre,
        value: id
    })));
    const filtroActivo = computed(() => (
        !filtros.value.estatus
        || !!filtros.value.fecha
        || !!filtros.value.nombre
        || !!filtros.value.cliente
    ))

    const asignarData = ({ data, resultados }) => {
        sucursales.value = data;
        numResultados.value = resultados;
    }

    const mapFiltros = () => {
        const mFiltros = {};

        mFiltros['cliente'] = filtros.value.cliente;
        mFiltros['nombre'] = filtros.value.nombre;
        mFiltros['pagina'] = filtros.value.pagina;
        mFiltros['estatus'] = filtros.value.estatus ? '1' : '0';
        mFiltros['fecha'] = filtros.value.fecha && formatearFecha(filtros.value.fecha);

        return mFiltros;
    }

    const obtenerSucursales = async() => {
        try{
            const filtros = mapFiltros();
            const res = await request.obtenerElementos({ params: filtros });
            asignarData(res);

            return res;
        }catch(err){
            throw err;
        }
    }

    const obtenerSucursal = async ({ id }) => {
        try{
            const res = await request.obtenerElemento({ id });
            return res;
        }catch(err){
            throw err;
        }
    }

    const crearSucursal = async({ data }) => {
        try{
            const res = await request.crearElemento({ data: toValue(data) });
            return res;
        }catch(err){
            throw err;
        }
    }

    const editarSucursal = async({ id, data }) => {
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
        sucursales,
        numResultados,
        sucursalesListado,
        sucursalesOpciones,
        crearSucursal,
        obtenerSucursales,
        obtenerSucursal,
        editarSucursal,
        reinciarFiltros
    }
});