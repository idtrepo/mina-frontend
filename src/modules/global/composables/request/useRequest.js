import { ref } from 'vue'

const cargando = ref(false);

export default (servicio=null) => {
    const obtenerElementos = async({ params=null }) => {
        cargando.value = true;

        try{
            const res = await servicio.obtenerElementos({ params });
            return res.data;
        }catch(err){
            throw err;
        }finally{
            cargando.value = false;
        }
    }

    const crearElemento = async({ data }) => {
        cargando.value = true;

        try{
            const res = await servicio.crearElemento({ data });
            return res.data;
        }catch(err){
            throw err;
        }finally{
            cargando.value = false;
        }
    }

    const obtenerElemento = async({ id, params=null }) => {
        cargando.value = true;

        try{
            const res = await servicio.obtenerElemento({ id, params });
            return res.data;
        }catch(err){
            throw err;
        }finally{
            cargando.value = false;
        }
    }

    const editarElemento = async({ id, data }) => {
        cargando.value = true;

        try{
            const res = await servicio.editarElemento({ id, data });
            return res.data;
        }catch(err){
            throw err;
        }finally{
            cargando.value = false;
        }
    }

    const customEndpoint = async(nombre, { id, data, params }) => {
        cargando.value = true;

        try{
            const res = await servicio[nombre]({ id, data, params });
            return res.data;
        }catch(err){
            throw err;
        }finally{
            cargando.value = false;
        }
    }

    return {
        cargando,
        obtenerElemento,
        obtenerElementos,
        crearElemento,
        editarElemento,
        customEndpoint
    }
}