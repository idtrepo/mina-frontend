import { computed, toValue } from "vue";
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

  const obtenerPerfiles = async ({ params = null } = {}) => {
    const res = await obtenerElementos({ params });

    if (res) {
      perfilesStore.asignarDataPerfiles(res);
    }
    
    return res;
  };

  const obtenerPerfil = async ({ id }) => {
    const res = await obtenerElemento({ id });

    if (res) {
      perfilesStore.asignarDataPerfil(res);
    }

    return res;
  };

  const crearPerfil = async () => {
    const res = await crearElemento({ dataElemento: perfil });

    if (res) {
      reiniciarDataCreacion();
      await obtenerPerfiles();
    }

    return res;
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
    const res = await editarElemento({ dataElemento: perfil });

    if (res) {
      editar.value = false;
      const { data: perfil } = res;
      await obtenerPerfil(perfil);
    }

    return res;
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
