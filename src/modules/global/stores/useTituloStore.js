import { ref } from 'vue'
import { defineStore } from 'pinia'

export default defineStore('titulo', () => {
    const titulo = ref('');
    const icono = ref([]);

    const establecerTitulo = ({ tituloRuta, iconoRuta }) => {
        titulo.value = tituloRuta;
        icono.value = iconoRuta;
    }

    return {
        icono,
        titulo,
        establecerTitulo
    }
})