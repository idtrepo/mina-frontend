import { ref, computed, toValue } from 'vue'
import { defineStore } from 'pinia'
import usuariosService from '@/modules/usuarios/services/usuariosService';
import useRequest from '@/modules/global/composables/request/useRequest';
import { formatearFecha } from '@/modules/global/utils/fecha';
import { ICONOS } from '@/modules/global/utils/iconos';
import { VISTAS } from '@/modules/global/utils/vistas';

export default defineStore('usuarios', () => {
    const request = useRequest(usuariosService);

    const filtros = ref({
        pagina: 1,
        estatus: true,
        fecha: null,
        nombre: null,
        apellido: null,
        correo: null,
        perfil: null,
        cliente: null,
        area: null,
        sucursal: null
    });
    const usuarios = ref([]);
    const numResultados = ref(0);
    const usuariosListado = computed(() => usuarios.value.map(({ id, nombre, apellido, perfil }) => ({
        id,
        icono: ICONOS.USUARIOS,
        primario: `${nombre.split(' ')[0]} ${apellido.split(' ')[0]}`,
        secundario: perfil.nombre,
        vista: VISTAS.USUARIOS_DATA,
    })));
    const filtroActivo = computed(() => (
        !filtros.value.estatus
        || !!filtros.value.fecha
        || !!filtros.value.nombre
        || !!filtros.value.apellido
        || !!filtros.value.correo
        || !!filtros.value.perfil
        || !!filtros.value.cliente
        || !!filtros.value.area
        || !!filtros.value.sucursal
    ))

    const asignarData = ({ data, resultados }) => {
        usuarios.value = data;
        numResultados.value = resultados;
    }

    const mapFiltros = () => {
        const mFiltros = {};

        mFiltros['pagina'] = filtros.value.pagina;
        mFiltros['estatus'] = filtros.value.estatus ? '1' : '0';
        mFiltros['fecha'] = filtros.value.fecha && formatearFecha(filtros.value.fecha);
        mFiltros['correo'] = filtros.value.correo;
        mFiltros['nombre'] = filtros.value.nombre;
        mFiltros['apellido'] = filtros.value.apellido;
        mFiltros['perfil'] = filtros.value.perfil;
        mFiltros['cliente'] = filtros.value.cliente;
        mFiltros['sucursal'] = filtros.value.sucursal;
        mFiltros['area'] = filtros.value.area;

        return mFiltros;
    }

    const obtenerUsuarios = async () => {
        try {
            const filtros = mapFiltros();
            const res = await request.obtenerElementos({ params: filtros });
            asignarData(res);

            return res;
        } catch (err) {
            throw err;
        }
    };

    const obtenerUsuario = async ({ id }) => {
        try{
            const res = await request.obtenerElemento({ id });
            return res;
        }catch(err){
            throw err;
        }
    }

    const crearUsuario = async ({ data }) => {
        try {
            const res = await request.crearElemento({ data: toValue(data) });
            return res;
        } catch (err) {
            throw err;
        }
    }

    const editarUsuario = async({ id, data }) => {
        try{
            const res = await request.editarElemento({ id, data });
            return res;
        }catch(err){
            throw err;
        }
    }

    const reinciarFiltros = () => {
        for(let clave in filtros.value){
            filtros.value[clave] = null;
        }

        filtros.value.estatus = true;
        filtros.value.pagina = 1;
    }

    return {
        filtros,
        filtroActivo,
        usuarios,
        usuariosListado,
        numResultados,
        crearUsuario,
        obtenerUsuarios,
        obtenerUsuario,
        editarUsuario,
        reinciarFiltros
    }
});