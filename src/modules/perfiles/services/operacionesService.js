import service from '@/services'

export class OperacionesService {
    static recurso = 'operaciones'
    
    static obtenerElementos = async ({ params = null } = {}) => {
        try {
        const res = await service.get(OperacionesService.recurso, { params })
        return res.data
        } catch (err) {
        throw err
        }
    }
    
    static crearElemento = async ({ data }) => {
        try {
        const res = await service.post(OperacionesService.recurso, data)
        return res.data
        } catch (err) {
        throw err
        }
    }
    
    static obtenerElemento = async ({ id }) => {
        try {
        const res = await service.get(`${OperacionesService.recurso}/${id}`)
        return res.data
        } catch (err) {
        throw err
        }
    }
    
    static editarElemento = async ({ id, data }) => {
        try {
        const res = await service.patch(
            `${OperacionesService.recurso}/${id}`,
            data
        )
        return res.data
        } catch (err) {
        throw err
        }
    }
}