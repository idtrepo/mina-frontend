import { computed } from 'vue';
import useDataStore from '../stores/useDataStore';
import { storeToRefs } from 'pinia';
import useRequest from '@/composables/request/useRequest';
import { DataService } from '@/modules/modulos/services/dataService';
import useFiltrosStore from '@/stores/useFiltrosStore';
import { evaluarModulo } from '../schemas/modulosSchema';
import { COLORES } from '../utils/colores';

export default () => {
    const filtrosStore = useFiltrosStore();
    const { filtros, filtrosMapeados } = storeToRefs(filtrosStore);
    const { obtenerElementos } = useRequest({ servicio: DataService, filtros: filtrosMapeados, evaluacion: evaluarModulo });
    const dataStore = useDataStore();
    const { datos, numeroElementos } = storeToRefs(dataStore);

    const obtenerDataModulo = async () => {
        try {
            const res = await obtenerElementos();
            if (res) {
                dataStore.asignarData(res);
            }
            return res;
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    const datosSensores = computed(() => datos.value);

    const mayorLongitud = computed(() => {
        const sensorDataMap = new Map();
        datosSensores.value.forEach(({ sensor, valor }) => {
            if (!sensorDataMap.has(sensor.id)) {
                sensorDataMap.set(sensor.id, []);
            }
            sensorDataMap.get(sensor.id).push(valor);
        });
        return Math.max(...Array.from(sensorDataMap.values()).map(data => data.length));
    });

    const etiquetasSensores = computed(() => {
        if (!datosSensores.value) return [];
        const sensorDataMap = new Map();
        datosSensores.value.forEach(({ sensor, creado }) => {
            if (!sensorDataMap.has(sensor.id)) {
                sensorDataMap.set(sensor.id, []);
            }
            sensorDataMap.get(sensor.id).push(creado);
        });
        const [longestData] = Array.from(sensorDataMap.values()).filter(data => data.length === mayorLongitud.value);
        return longestData ? longestData.reverse() : [];
    });

    const dataSensores = computed(() => {
        if (!datosSensores.value) return [];
        const sensorDataMap = new Map();
        datosSensores.value.forEach(({ sensor, valor }) => {
            if (!sensorDataMap.has(sensor.id)) {
                sensorDataMap.set(sensor.id, { label: sensor.clave, data: [] });
            }
            sensorDataMap.get(sensor.id).data.push(valor);
        });
        return Array.from(sensorDataMap.values()).map(sensorData => ({
            ...sensorData,
            data: sensorData.data.reverse(),
            backgroundColor: COLORES,
        }));
    });

    const dataModulo = computed(() => ({
        labels: etiquetasSensores.value,
        datasets: dataSensores.value,
    }));

    return {
        dataModulo,
        obtenerDataModulo,
        numeroElementos,
        filtros,
    };
};