import { ref } from "vue";
import { defineStore } from "pinia";

export default defineStore("titulo-store", () => {
  const titulo = ref("");
  const icono = ref([]);

  const asignarTitulo = (nuevoTitulo) => {
    titulo.value = nuevoTitulo;
  };

  const asignarIcono = (nuevoIcono) => {
    icono.value = nuevoIcono;
  };

  const asignarDataTitulo = ({ nuevoTitulo = "", nuevoIcono = [] } = {}) => {
    asignarIcono(nuevoIcono);
    asignarTitulo(nuevoTitulo);
  };

  return {
    titulo,
    icono,
    asignarDataTitulo,
  };
});
