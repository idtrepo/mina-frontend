import { ref } from 'vue'
import { defineStore } from 'pinia'

export default defineStore('titulo', () => {
    const titulo = ref('');

    const establecerTitulo = (dataTitulo) => {
        titulo.value = dataTitulo;
    }

    return {
        titulo,
        establecerTitulo
    }
})