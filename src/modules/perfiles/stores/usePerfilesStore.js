import { ref, computed, toValue } from 'vue'
import { defineStore } from 'pinia'
import perfilesService from '@/modules/perfiles/services/perfilesService';
import useRequest from '@/modules/global/composables/request/useRequest';
import { ICONOS } from '@/modules/global/utils/iconos';
import { formatearFecha } from '@/modules/global/utils/fecha';
import { VISTAS } from '@/modules/global/utils/vistas';

export default defineStore('perfiles', () => {
    const request = useRequest(perfilesService);

    const filtros = ref({
        pagina: 1,
        estatus: true,
        nombre: null,
        fecha: null,
    });
    const perfiles = ref([]);
    const numResultados = ref(0)
    const perfilesListado = computed(() => perfiles.value.map(({ id, nombre }) => ({
        id,
        icono: ICONOS.PERFILES,
        primario: nombre,
        vista: VISTAS.PERFILES_DATA,
    })));
    const perfilesOpciones = computed(() => perfiles.value.map(({ id, nombre }) => ({
        label: nombre,
        value: id
    })));
    const filtroActivo = computed(() => (
        !filtros.value.estatus
        || !!filtros.value.nombre
        || !!filtros.value.fecha
    ))

    const asignarData = ({ data, resultados }) => {
        perfiles.value = data;
        numResultados.value = resultados;
    }

    const mapFiltros = () => {
        const mFiltros = {};

        mFiltros['pagina'] = filtros.value.pagina;
        mFiltros['nombre'] = filtros.value.nombre;
        mFiltros['estatus'] = filtros.value.estatus ? '1' : '0';
        mFiltros['fecha'] = filtros.value.fecha && formatearFecha(filtros.value.fecha);

        return mFiltros;
    }

    const obtenerPerfiles = async() => {
        try{
            const filtros = mapFiltros();
            const res = await request.obtenerElementos({ params: filtros });
            asignarData(res);

            return res;
        }catch(err){
            throw err;
        }
    }

    const obtenerPerfil = async ({ id }) => {
        try{
            const res = await request.obtenerElemento({ id });
            return res;
        }catch(err){
            throw err;
        }
    }

    const crearPerfil = async({ data }) => {
        try{
            const res = await request.crearElemento({ data: toValue(data) });
            return res;
        }catch(err){
            throw err;
        }
    }

    const editarPerfil = async({ id, data }) => {
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
        perfiles,
        numResultados,
        perfilesListado,
        perfilesOpciones,
        crearPerfil,
        obtenerPerfiles,
        obtenerPerfil,
        editarPerfil,
        reinciarFiltros,
    }   
})