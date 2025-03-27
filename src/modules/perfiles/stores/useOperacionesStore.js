import {ref, computed} from 'vue';
import {defineStore} from 'pinia';

export default defineStore('operaciones-store', () => {
    const operacion = ref({
        nombre: null,
    });
    
    const operaciones = ref([]);
    const numeroElementos = ref(1);
    
    const operacionesOpciones = computed(() =>
        operaciones.value.map(({id, nombre}) => ({
        label: nombre,
        value: id,
        }))
    );
    
    const asignarDataOperaciones = ({data, resultados}) => {
        operaciones.value = data;
        numeroElementos.value = resultados;
    };
    
    const asignarDataOperacion = ({data}) => {
        const {id, nombre} = data;
        operacion.value['id'] = id;
        operacion.value.nombre = nombre;
    };
    
    return {
        operacion,
        operaciones,
        numeroElementos,
        operacionesOpciones,
        asignarDataOperaciones,
        asignarDataOperacion,
    };
    });