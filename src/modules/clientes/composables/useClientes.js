import { computed, toValue} from 'vue';
import {storeToRefs} from 'pinia';
import useClientesStore from '../stores/useClientesStore';
import {useRouter} from 'vue-router';
import {ClientesService} from '@/modules/clientes/services/clientesService';
import {ICONOS} from '@/modules/global/utils/iconos';
import {evaluarCliente} from '../schemas/clientesSchema';
import useRequest from '@/composables/request/useRequest';
import useFiltrosStore from '@/stores/useFiltrosStore';
import useEdicionStore from '@/stores/useEdicionStore';
import {VISTAS} from '@/modules/global/utils/vistas';
import {reiniciarData} from '@/utils/reinicio';

export default () => {
    const router = useRouter();
    const filtrosStore = useFiltrosStore();
    const edicionStore = useEdicionStore();
    const clienteStore = useClientesStore();
    const {editar, edicionHabilitada} = storeToRefs(edicionStore);
    const {filtros, filtrosMapeados} = storeToRefs(filtrosStore);
    const {cliente, clientes, numeroElementos, clientesOpciones} = storeToRefs(clienteStore);

    const {obtenerElemento, obtenerElementos, crearElemento, editarElemento} = useRequest({
        servicio: ClientesService,
        filtros: filtrosMapeados,
        evaluacion: evaluarCliente
    });

    //listado de clientes
    const clientesListado = computed(() => clientes.value.map(({id, nombre}) => ({
        id,
        titulo: nombre,
        icono: ICONOS.CLIENTES,
        accion: () => router.push({name: VISTAS.CLIENTES_DATA, params: {id}})
    })));

    const obtenerClientes = async ({params = null}) => {
        try {
            const res = await obtenerElementos({params});
            if (res) {
                clienteStore.asignarDataClientes(res);
            }

            return res;
        } catch (err) {
            console.log(err)
            throw err;
        }
    };

    const obtenerCliente = async ({id}) => {
        try{
            const res = await obtenerElemento({id});
            if(res){
                clienteStore.asignarDataCliente(res.data);
            }

            return res;
        } catch (err) {
            console.log(err)
            throw err;
        }
    };

    const crearCliente = async ({data}) => {
        try {
            const res = await crearElemento({data});
            if (res) {
                clienteStore.asignarDataCliente(res);
            }

            return res;
        } catch (err) {
            console.log(err)
            throw err;
        }
    };

    const editarCliente = async () => {
        try {
            const res = await editarElemento({dataElemento: cliente.value});
            if (res) {
                clienteStore.asignarDataCliente(res);
            }

            return res;
        } catch (err) {
            console.log(err)
            throw err;
        }
    };

    const habilitarEdicion = () => {
        edicionStore.habilitarEdicion();

        if(editar.value){
            edicionStore.guardarData(cliente);
        } else {
            cliente.value = edicionStore.borrarData();
        }
    };

    function reiniciarDataCreacion() {
        cliente.value = reiniciarData(toValue(cliente));
    }

    function reiniciarDataClientes() {
        reiniciarDataCreacion();
        filtrosStore.reiniciarFiltros();
        edicionStore.reiniciarEdicion();
        clientes.value = [];
    }

    return {
        cliente,
        clientes,
        filtros,
        numeroElementos,
        clientesOpciones,
        clientesListado,
        edicionHabilitada,
        obtenerClientes,
        obtenerCliente,
        crearCliente,
        editarCliente,
        habilitarEdicion,
        reiniciarDataClientes,
        reiniciarDataCreacion
    }
}