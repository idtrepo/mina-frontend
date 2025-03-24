import { ref, computed, toValue } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { CategoriasService } from "../services/categoriasService";
import { ICONOS } from "@/modules/global/utils/iconos";
import useCategoriasStore from "../stores/useCategoriasStore";
import useFiltrosStore from "@/stores/useFiltrosStore";
import useEdicionStore from "@/stores/useEdicionStore";
import {
  evaluarCategoria,
  evaluarCategoriaParcial,
} from "../schemas/categoriasSchema";
import { reiniciarData } from "@/utils/reinicio";
import { VISTAS } from "@/modules/global/utils/vistas";
import useRequest from "@/composables/request/useRequest";

export default () => {
  const router = useRouter();
  const filtrosStore = useFiltrosStore();
  const edicionStore = useEdicionStore();
  const categoriasStore = useCategoriasStore();
  const { editar, edicionHabilitada } = storeToRefs(edicionStore);
  const { filtros, filtrosMapeados } = storeToRefs(filtrosStore);
  const { categoria, categorias, numeroElementos, categoriasOpciones } =
    storeToRefs(categoriasStore);
  const { obtenerElemento, obtenerElementos, crearElemento, editarElemento } =
    useRequest({
      servicio: CategoriasService,
      filtros: filtrosMapeados,
      evaluacion: evaluarCategoria,
      evaluacionParcial: evaluarCategoriaParcial,
    });

  // Listado de categorías
  const categoriasListado = computed(() =>
    categorias.value.map(({ id, nombre }) => ({
      id,
      titulo: nombre,
      icono: ICONOS.CATEGORIAS,
      accion: () =>
        router.push({ name: VISTAS.CATEGORIAS_DATA, params: { id } }),
    }))
  );

  const obtenerCategorias = async ({ params = null } = {}) => {
    const res = await obtenerElementos({ params });

    if (res) {
      categoriasStore.asignarDataCategorias(res);
    }

    return res;
  };

  const obtenerCategoria = async ({ id }) => {
    const res = await obtenerElemento({ id });

    if (res) {
      categoriasStore.asignarDataCategoria(res);
    }

    return res;
  };

  // Crear categoría
  const crearCategoria = async () => {
    const res = await crearElemento({ dataElemento: categoria });

    if (res) {
      reiniciarDataCreacion();
      await obtenerCategorias();
    }

    return res;
  };

  // Editar categoría
  const habilitarEdicion = () => {
    edicionStore.habilitarEdicion();

    if (editar.value) {
      edicionStore.guardarData(categoria);
    } else {
      categoria.value = edicionStore.borrarData();
    }
  };

  const editarCategoria = async () => {
    const res = await editarElemento({ dataElemento: categoria });

    if (res) {
      editar.value = false;
      const { data: categoria } = res;
      await obtenerCategoria(categoria);
    }

    return res;
  };

  // Reiniciar datos
  function reiniciarDataCreacion() {
    categoria.value = reiniciarData(toValue(categoria));
  }

  function reiniciarDataCategorias() {
    reiniciarDataCreacion();
    filtrosStore.reiniciarFiltros();
    edicionStore.reiniciarEdicion();
    categorias.value = [];
  }

  return {
    editar,
    edicionHabilitada,
    filtros,
    categoria,
    categorias,
    numeroElementos,
    categoriasListado,
    categoriasOpciones,
    obtenerCategoria,
    obtenerCategorias,
    crearCategoria,
    editarCategoria,
    habilitarEdicion,
    reiniciarDataCategorias,
    reiniciarDataCreacion,
  };
};
