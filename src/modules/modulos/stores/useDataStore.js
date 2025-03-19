import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export default defineStore('data', () => {
    const datos = ref([]);
    const numeroElementos = ref(1);

    const asignarData = ({ elemento, numElementos }) => {
        datos.value = elemento;
        numeroElementos.value = numElementos;
    }
    
    return {
        datos,
        numeroElementos,
        asignarData
    }
});