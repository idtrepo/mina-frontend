import { ref, computed, toValue } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { PerfilesService } from "@/modules/perfiles/services/perfilesService";
import { ICONOS } from "@/modules/global/utils/iconos";
import usePerfilesStore from "../stores/usePerfilesStore";
import useFiltrosStore from "@/stores/useFiltrosStore";
import useEdicionStore from "@/stores/useEdicionStore";
import { evaluarPerfil } from "../schemas/perfiles";
import { reiniciarData } from "@/utils/reinicio";
import useRequest from "@/composables/request/useRequest";
import { VISTAS } from "@/modules/global/utils/vistas";

export default () => {

  const router = useRouter();
  const filtrosStore = useFiltrosStore();
  const edicionStore = useEdicionStore();
  const perfilesStore = usePerfilesStore();
  const { editar, edicionHabilitada } = storeToRefs(edicionStore);
  const { filtros, filtrosMapeados } = storeToRefs(filtrosStore);
  const { perfil, perfiles, numElementos, perfilesOpciones } =
    storeToRefs(perfilesStore);

  const { obtenerElemento, obtenerElementos, crearElemento, editarElemento } =
    useRequest({
      servicio: PerfilesService,
      filtros: filtrosMapeados,
      evaluacion: evaluarPerfil,
    });

  // listado de perfiles
  const perfilesListado = computed(() =>
    perfiles.value.map(({ id, nombre }) => ({
      id,
      titulo: nombre,
      icono: ICONOS.PERFILES,
      accion: () => router.push({ name: VISTAS.PERFILES_DATA, params: { id } }),
    }))
  );

  const obtenerPerfiles = async ({ params = null }) => {
    try {
      const res = await obtenerElementos({ params });
      if (res) {
        perfilesStore.asignarDataPerfiles(res);
      }

      return res;
    } catch (err) {
      console.log(err)
      throw err;
    }
  };

  const obtenerPerfil = async ({ id }) => {
    try {
      const res = await obtenerElemento({ id });
      if(res) {
        perfilesStore.asignarDataPerfil(res.data);
      }
      return res;
    } catch (err) {
      throw err;
    }
  };

  const crearPerfil = async ({ data }) => {
    try {
      const res = await request.crearElemento({ dataElemento: perfil });

      if(res){
        reiniciarDataCreacion();
        await obtenerPerfiles();
      }
      return res;
    } catch (err) {
      throw err;
    }
  };

  const habilitarEdicion = () => {
    edicionStore.habilitarEdicion();

    if (editar.value) {
      edicionStore.guardarData(perfil);
    } else {
      perfil.value = edicionStore.borrarData();
    }
  };

  const editarPerfil = async () => {
    try {
      const res = await editarElemento({dataElemento: perfil.value});
      return res;
    } catch (err) {
      throw err;
    }
  };

  // reiniciar datos
  function reiniciarDataCreacion() {
    perfil.value = reiniciarData(toValue(perfil));
  }

  function reiniciarDataPerfiles() {
    reiniciarDataCreacion();
    filtrosStore.reiniciarFiltros();
    edicionStore.reiniciarEdicion();
    perfiles.value = [];
  }

  return {
    editar,
    edicionHabilitada,
    filtros,
    perfil,
    numElementos,
    perfilesListado,
    perfilesOpciones,
    obtenerPerfil,
    obtenerPerfiles,
    crearPerfil,
    editarPerfil,
    habilitarEdicion,
    reiniciarDataPerfiles,
    reiniciarDataCreacion,
  };
};