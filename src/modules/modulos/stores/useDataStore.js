import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import useRequest from '@/modules/global/composables/request/useRequest';
import dataService from '../services/dataService';
import { formatearFecha } from '@/modules/global/utils/fecha';

export default defineStore('data', () => {
    const request = useRequest(dataService);

    const filtros = ref({
        pagina: 1,
        estatus: true,
        fecha: null,
        modulo: null,
        listado: false,
    });
    const filtroActivo = computed(() => (
        !filtros.value.estatus
        || !!filtros.value.fecha
    ));
    const data = ref([]);
    const numResultados = ref(0);

    const asignarData = ({ data:datos, resultados }) => {
        console.log('RESULTADOS: ', resultados);
        console.log('DATA');
        console.log(datos);

        data.value = datos;
        numResultados.value = resultados;
    }

    const reiniciarFiltros = () => {
        for(let clave in filtros.value){
            filtros.value[clave] = null;
        }

        filtros.value.pagina = 1;
        filtros.value.estatus = true;
        filtros.value.listado = false;
    }

    const mapFiltros = () => {
        const mFiltros = {};

        mFiltros['pagina'] = filtros.value.pagina;
        mFiltros['estatus'] = filtros.value.estatus ? '1' : '0';
        mFiltros['listado'] = filtros.value.listado ? '1' : '0';
        mFiltros['fecha'] = filtros.value.fecha && formatearFecha(filtros.value.fecha);
        mFiltros['modulo'] = filtros.value.modulo;

        return mFiltros;
    }

    const obtenerData = async() => {
        try{
            const filtros = mapFiltros();
            const res = await request.obtenerElementos({ params: filtros });

            asignarData(res);

            return res;
        }catch(err){
            throw err;
        }
    }
    
    return {
        filtros,
        filtroActivo,
        data,
        numResultados,
        obtenerData,
        reiniciarFiltros,
    }
});