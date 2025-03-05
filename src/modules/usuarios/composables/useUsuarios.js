import {computed, toValue} from 'vue';
import {storeToRefs} from 'pinia';
import useUsuariosStore from '../stores/useUsuariosStore';
import {useRouter} from 'vue-router';
import {UsuariosService} from '@/modules/usuarios/services/usuariosService';
import {ICONOS} from '@/modules/global/utils/iconos';
import {evaluarUsuario} from '../schemas/usuariosSchema';
import useRequest from '@/composables/request/useRequest';
import useFiltrosStore from '@/stores/useFiltrosStore';
import useEdicionStore from '@/stores/useEdicionStore';
import {VISTAS} from '@/modules/global/utils/vistas';
import {reiniciarData} from '@/utils/reinicio';

export default () => {

    const router = useRouter();
    const filtrosStore = useFiltrosStore();
    const edicionStore = useEdicionStore();
    const usuarioStore = useUsuariosStore();
    const {editar, edicionHabilitada} = storeToRefs(edicionStore);
    const {filtros, filtrosMapeados} = storeToRefs(filtrosStore);
    const {usuario, usuarios, numeroElementos} = storeToRefs(usuarioStore);

    const {obtenerElemento, obtenerElementos, crearElemento, editarElemento} = useRequest({
        servicio: UsuariosService,
        filtros: filtrosMapeados,
        evaluacion: evaluarUsuario
    });

    //listado de usuarios
    const usuariosListado = computed(() => usuarios.value.map(({id, nombre, apellido, perfil}) => ({
        id,
        titulo: `${nombre} ${apellido}`,
        subtitulo: perfil.nombre,
        icono: ICONOS.USUARIOS,
        accion: () => router.push({name: VISTAS.USUARIOS})
    })));

    const obtenerUsuarios = async ({params = null}) => {
        try {
            const res = await obtenerElementos({params});
            if (res) {
                usuarioStore.asignarDataUsuarios(res);
            }

            return res;
        } catch (err) {
            console.log(err)
            throw err;
        }
    };

    const obtenerUsuario = async ({id}) => {
        try{
            const res = await obtenerElemento({id});
            if(res){
                usuarioStore.asignarDataUsuario(res);
            }

            return res;
        } catch (err) {
            console.log(err)
            throw err;
        }
    };

    const crearUsuario = async ({data}) => {
        try{
            const res = await crearElemento({data});
            if(res){
                usuarioStore.agregarUsuario(res);
            }

            return res;
        } catch (err) {
            console.log(err)
            throw err;
        }
    };

    const editarUsuario = async ({id, data}) => {
        try{
            const res = await editarElemento({id, data});
            if(res){
                usuarioStore.editarUsuario(res);
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
            edicionStore.guardarData(usuario);
        } else {
            usuario.value = edicionStore.borrarData();
        }
    };

    function reiniciarDataCreacion() {
        usuario.value = reiniciarData(toValue(usuario));
    }

    //reiniciar datos 
    function reiniciarDataUsuario() {
        reiniciarDataCreacion();
        filtrosStore.reiniciarFiltros();
        edicionStore.reiniciarEdicion();
        usuarios.value = [];
    }

    return{
        usuario,
        usuarios,
        numeroElementos,
        filtros,
        editar,
        edicionHabilitada,
        usuariosListado,
        obtenerUsuarios,
        obtenerUsuario,
        crearUsuario,
        editarUsuario,
        habilitarEdicion,
        reiniciarDataUsuario,
        reiniciarDataCreacion
    }
}