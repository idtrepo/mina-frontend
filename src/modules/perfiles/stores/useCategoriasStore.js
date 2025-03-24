import { ref, computed } from "vue";
import { defineStore } from "pinia";

export default defineStore("categorias-store", () => {
  const categoria = ref({
    nombre: null,
  });

  const categorias = ref([]);
  const numeroElementos = ref(1);

  const categoriasOpciones = computed(() =>
    categorias.value.map(({ id, nombre }) => ({
      label: nombre,
      value: id,
    }))
  );

  const asignarDataCategorias = ({ data, resultados }) => {
    categorias.value = data;
    numeroElementos.value = resultados;
  };

  const asignarDataCategoria = ({ data }) => {
    const { id, nombre } = data;
    categoria.value["id"] = id;
    categoria.value.nombre = nombre;
  };

  return {
    categoria,
    categorias,
    numeroElementos,
    categoriasOpciones,
    asignarDataCategorias,
    asignarDataCategoria,
  };
});
