import {ref, computed} from 'vue';
import {defineStore} from 'pinia';

export default defineStore('areas-store', () => {
    const area = ref({
        nombre: null,
        estatus: null,
        idSucursal: null
    });

    const areas = ref([]);
    const numeroElementos = ref(1);

    const asignarDataAreas = ({data, resultados}) => {
        areas.value = data;
        numeroElementos.value = resultados;
    };

    const asignarDataArea = (data) => {
        const {id, nombre, idSucursal, estatus} = data;
        area.value["id"] = id;
        area.value.nombre = nombre;
        area.value.idSucursal = idSucursal;
        area.value.estatus = estatus;
    };

    const areasOpciones = computed(() => areas.value.map(({id, nombre}) => ({
        label: nombre,
        value: id
    })));

    return {
        area,
        areas,
        numeroElementos,
        areasOpciones,
        asignarDataAreas,
        asignarDataArea
    }
})