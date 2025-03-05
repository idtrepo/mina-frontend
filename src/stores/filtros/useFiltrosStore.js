import { ref, computed, toValue } from 'vue'
import { defineStore } from 'pinia'
import { reiniciarValores } from '@/utils/funciones/reiniciarValores';

export default defineStore('filtros', () => {
    // filtros
    const filtros = ref({
        pagina: 1,
        estatus: true,
        listado: false,
        fecha: null,

        nombre: null,
        apellido: null,
        correo: null,
        clave: null,
        perfil: null,
        sucursal: null,
        cliente: null,
        area: null,
        modulo: null,

    });

    const numResultados = ref(null);

    const filtrosData = computed(() => {
        const { estatus, listado, ...data } = filtros.value;

        return {
            ...data,
            estatus: estatus ? '1' : '0',
            listado: listado ? '1' : '0'
        }
    });

    const filtroActivo = computed(() => (!filtros.value.estatus
        || !!filtros.value.fecha
        || !!filtros.value.nombre
        || !!filtros.value.apellido
        || !!filtros.value.correo
        || !!filtros.value.clave
        || !!filtros.value.perfil
        || !!filtros.value.sucursal
        || !!filtros.value.cliente

    ));

    const reiniciarFiltros = () => {
        filtros.value = reiniciarValores(toValue(filtros), {
            estatus: true, 
            pagina: 1,
            listado: false,
        });
    }

    return {
        filtros,
        filtroActivo,
        filtrosData,
        numResultados,

        reiniciarFiltros,
    }
}); 