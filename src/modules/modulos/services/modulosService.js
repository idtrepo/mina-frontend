import servicio from '@/services'

export class ModulosService {
    static recurso = 'modulos';

    static async obtenerElementos({params = null}) {
        return await servicio.get(ModulosService.recurso, {params});
    }

    static async obtenerElemento({id}) {
        return await servicio.get(`${ModulosService.recurso}/${id}`);
    }

    static async crearElemento({data}) {
        return await servicio.post(ModulosService.recurso, data);
    }

    static async editarElemento({id, data}) {
        return await servicio.patch(`${ModulosService.recurso}/${id}`, data);
    }

    static async obtenerElementoData({id}) {
        return await servicio.get(`${ModulosService.recurso}/${id}/data`);
    }
}