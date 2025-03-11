import {computed, toValue} from 'vue';
import {storeToRefs} from 'pinia';
import useSucursalesStore from '../stores/useSucursalesStore';
import { useRouter } from 'vue-router';
import {SucursalesService} from '@/modules/sucursales/services/sucursalesService';
import {ICONOS} from '@/modules/global/utils/iconos';
import {evaluarSucursal} from '../schemas/sucursalesSchema';
import useRequest from '@/composables/request/useRequest';
import useFiltrosStore from '@/stores/useFiltrosStore';
import useEdicionStore from '@/stores/useEdicionStore';
import {VISTAS} from '@/modules/global/utils/vistas';
import {reiniciarData} from '@/utils/reinicio';

export default () => {
    const router = useRouter();
    const filtrosStore = useFiltrosStore();
    const edicionStore = useEdicionStore();
    const sucursalStore = useSucursalesStore();
    const {editar, edicionHabilitada} = storeToRefs(edicionStore);
    const {filtros, filtrosMapeados} = storeToRefs(filtrosStore);
    const {sucursal, sucursales, numeroElementos, sucursalesOpciones} = storeToRefs(sucursalStore);

    const {obtenerElemento, obtenerElementos, crearElemento, editarElemento} = useRequest({
        servicio: SucursalesService,
        filtros: filtrosMapeados,
        evaluacion: evaluarSucursal
    });

    //listado de sucursales
    const sucursalesListado = computed(() => sucursales.value.map(({id, nombre}) => ({
        id,
        titulo: nombre,
        icono: ICONOS.SUCURSALES,
        accion: () => router.push({name: VISTAS.SUCURSALES_DATA, params: {id}})
    })));

    const obtenerSucursales = async ({params = null}) => {
        try {
            const res = await obtenerElementos({params});
            if (res) {
                sucursalStore.asignarDataSucursales(res);
            }

            return res;
        } catch (err) {
            console.log(err)
            throw err;
        }
    };

    const obtenerSucursal = async ({id}) => {
        try{
            console.log(id)
            const res = await obtenerElemento({id});
            if(res){
                sucursalStore.asignarDataSucursal(res.data);
            }

            return res;
        } catch (err) {
            console.log(err)
            throw err;
        }
    };

    const crearSucursal = async ({data}) => {
        try {
            const res = await crearElemento({data});
            if(res){
                sucursalStore.asignarDataSucursal(res);
            }

            return res;
        } catch (err) {
            console.log(err)
            throw err;
        }
    };

    const editarSucursal = async () => {
        try {
            const res = await editarElemento({dataElemento: sucursal.value});
            if(res){
                console.log(res)
                sucursalStore.asignarDataSucursal(res);
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
            edicionStore.guardarData(sucursal);
        } else {
            sucursal.value = edicionStore.borrarData();
        }
    };
    
    function reiniciarDataCreacion() {
        sucursal.value = reiniciarData(toValue(sucursal));
    }

    //reiniciar datos
    function reiniciarDataSucursales() {
        reiniciarDataCreacion();
        filtrosStore.reiniciarFiltros();
        edicionStore.reiniciarEdicion();
        sucursales.value = [];
    }

    return {
        sucursal,
        sucursales,
        numeroElementos,
        sucursalesOpciones,
        sucursalesListado,
        filtros,
        editar,
        edicionHabilitada,
        obtenerSucursales,
        obtenerSucursal,
        crearSucursal,
        editarSucursal,
        habilitarEdicion,
        reiniciarDataCreacion,
        reiniciarDataSucursales
    }
}