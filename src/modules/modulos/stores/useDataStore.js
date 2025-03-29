import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export default defineStore('data', () => {
    const datos = ref([]);
    const numeroElementos = ref(1);

    const asignarData = ({ data, resultados }) => {
        datos.value = data;
        numeroElementos.value = resultados;
    }
    
    return {
        datos,
        numeroElementos,
        asignarData
    }
});