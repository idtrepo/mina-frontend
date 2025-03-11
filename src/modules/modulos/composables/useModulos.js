import {computed, toValue} from 'vue';
import {storeToRefs} from 'pinia';
import useModulosStore from '../stores/useModulosStore';
import {useRouter} from 'vue-router';
import {ModulosService} from '@/modules/modulos/services/modulosService';
import {ICONOS} from '@/modules/global/utils/iconos';
import {evaluarModulo} from '../schemas/modulosSchema';
import useRequest from '@/composables/request/useRequest';
import useFiltrosStore from '@/stores/useFiltrosStore';
import useEdicionStore from '@/stores/useEdicionStore';
import {VISTAS} from '@/modules/global/utils/vistas';
import {reiniciarData} from '@/utils/reinicio';
import useDataStore from '../stores/useDataStore';   

export default () => {
    const router = useRouter();
    const filtrosStore = useFiltrosStore();
    const edicionStore = useEdicionStore();
    const moduloStore = useModulosStore();
    const {editar, edicionHabilitada} = storeToRefs(edicionStore);
    const {filtros, filtrosMapeados} = storeToRefs(filtrosStore);
    const {modulo, modulos, numeroElementos, modulosOpciones} = storeToRefs(moduloStore);
    const {datos, asignarData} = useDataStore();

    const {obtenerElemento, obtenerElementos, crearElemento, editarElemento, obtenerElementoData} = useRequest({
        servicio: ModulosService,
        filtros: filtrosMapeados,
        evaluacion: evaluarModulo
    });

    //listado de modulos
    const modulosListado = computed(() => modulos.value.map(({id, mac}) => ({
        id,
        titulo: mac,
        icono: ICONOS.MODULOS,
        accion: () => router.push({name: VISTAS.MODULOS_DATA, params: { id }})
    })));

    const obtenerModulos = async ({params = null}) => {
        try {
            const res = await obtenerElementos({params});
            if (res) {
                moduloStore.asignarDataModulos(res.data);
            }

            return res;
        } catch (err) {
            console.log(err)
            throw err;
        }
    };

    const obtenerModulo = async ({id}) => {
        try{
            const res = await obtenerElemento({id});
            if(res){
                moduloStore.asignarDataModulo(res.data.data);
            }

            return res;
        } catch (err) {
            console.log(err)
            throw err;
        }
    };

    const obtenerDataModulo = async ({id}) => {
        try {
            const res = await obtenerElementoData(id);
            if (res) {
                asignarData(res.data);
            }

            return res;
        } catch (err) {
            console.log(err)
            throw err;
        }
    }

    const crearModulo = async ({data}) => {
        try {
            const res = await crearElemento(data);
            if (res) {
                moduloStore.asignarDataModulo(res);
            }

            return res;
        } catch (err) {
            console.log(err)
            throw err;
        }
    };

    const editarModulo = async () => {
        try {
            const res = await editarElemento({dataElemento: modulo.value});
            if (res) {
                moduloStore.asignarDataModulo(res.data);
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
            edicionStore.guardarData(modulo);
        } else {
            modulo.value = edicionStore.borrarData(); 
        }
    }

    function reiniciarDataCreacion() {
        modulo.value = reiniciarData(toValue(modulo));
    }

    function reiniciarDataModulos() {
        reiniciarDataCreacion();
        filtrosStore.reiniciarFiltros();
        edicionStore.reiniciarEdicion();
        modulos.value = [];
    }

    return {
        modulo,
        modulos,
        numeroElementos,
        modulosOpciones,
        modulosListado,
        edicionHabilitada,
        obtenerModulos,
        obtenerModulo,
        crearModulo,
        editarModulo,
        habilitarEdicion,
        reiniciarDataModulos,
        obtenerDataModulo
    }
}