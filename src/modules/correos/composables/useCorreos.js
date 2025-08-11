import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import useCorreosStore from '../stores/useCorreosStore';
import { CorreoService } from '@/modules/correos/services/correoService';
import { evaluarCorreo } from '../schemas/correosSchema';
import useRequest from '@/composables/request/useRequest';
import useFiltrosStore from '@/stores/useFiltrosStore';
import useEdicionStore from '@/stores/useEdicionStore';
import { reiniciarData } from '@/utils/reinicio';

export default () => {
    const filtrosStore = useFiltrosStore();
    const edicionStore = useEdicionStore();
    const correosStore = useCorreosStore();
    const { editar, edicionHabilitada } = storeToRefs(edicionStore);
    const { filtros, filtrosMapeados } = storeToRefs(filtrosStore);
    const { correo, correos, numeroElementos, correosOpciones } =
        storeToRefs(correosStore);
    
    const { obtenerElemento, obtenerElementos, crearElemento, editarElemento } =
        useRequest({
        servicio: CorreoService,
        filtros: filtrosMapeados,
        evaluacion: evaluarCorreo,
        });
    
    const obtenerCorreos = async ({ params = null } = {}) => {
        const res = await obtenerElementos({ params });
    
        if (res) {
        correosStore.asignarDataCorreos(res);
        }
    
        return res;
    };
    
    const obtenerCorreo = async ({ id }) => {
        const res = await obtenerElemento({ id });
    
        if (res) {
        correosStore.asignarDataCorreo(res);
        }
    
        return res;
    };

    const crearCorreo = async (data) => {
        const res = await crearElemento({ dataElemento: data });
        if (res) {
            correosStore.asignarDataCorreo(res);
        }

        return res;
    };

    const editarCorreo = async (id, data) => {
        const res = await editarElemento({ id, data });
        if (res) {
            correosStore.asignarDataCorreo(res);
        }
        return res;
    };

    const eliminarCorreo = async (id) => {
        const res = await CorreoService.eliminarElemento({id});
        if (res) {
            obtenerCorreos(); // Refresh the list after deletion
        }
        return res;
    };

    return {
        correo,
        correos,
        numeroElementos,
        correosOpciones,
        obtenerCorreos,
        obtenerCorreo,
        crearCorreo,
        editarCorreo,
        editar,
        edicionHabilitada,
        reiniciarDataCreacion: () => reiniciarData(correosStore),
        eliminarCorreo
    };
}