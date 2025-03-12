import {computed} from 'vue';
import useDataStore from '../stores/useDataStore';
import {storeToRefs} from 'pinia';
import useRequest from '@/composables/request/useRequest';
import {ModulosService} from '@/modules/modulos/services/modulosService';
import useFiltrosStore from '@/stores/useFiltrosStore';
import {evaluarModulo} from '../schemas/modulosSchema';
import { COLORES } from '../utils/colores';

export default () => {
    const filtrosStore = useFiltrosStore();
    const {filtroMapeados} = storeToRefs(filtrosStore);
    const {obtenerElementoData} = useRequest({servicio: ModulosService, filtro: filtroMapeados, evaluacion:evaluarModulo});
    const dataStore = useDataStore()
    const {datos, numeroElementos} = storeToRefs(dataStore);
    const obtenerDataModulo = async ({id}) => {
        try {
            const res = await obtenerElementoData({id});
            if (res) {
                dataStore.asignarData(res.data);
            }

            return res;
        } catch (err) {
            console.log(err)
            throw err;
        }
    }

    const datosSensores = computed(() => datos.value.sensores);
    const mayorLongitud = computed(() => Math.max(
        ...datosSensores.value.map(({ data }) => data.length)
    ));

    const etiquetasSensores = computed(() => {
        const [ dataSensor ] = datosSensores.value
            .filter(({ data }) => data.length === mayorLongitud.value);
        const data = dataSensor?.data ?? []
        return data?.map(({ creado }) => creado)?.reverse();
    });

    const dataSensores = computed(() => datosSensores.value.map(({ data, clave }) => {
        if(data.length === 0) return {
            label: clave,
            data
        }
    
        return { 
            label: clave, 
            data: data.map(({ valor }) => valor).reverse(), 
            backgroundColor: COLORES,
        };
    }));

    const dataModulo = computed(() => ({
        labels: etiquetasSensores.value,
        datasets: dataSensores.value
    }));

    return{
        dataModulo,
        obtenerDataModulo,
        numeroElementos
    }
}