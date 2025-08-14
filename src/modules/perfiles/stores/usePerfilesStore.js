import { ref, computed } from "vue";
import { defineStore } from "pinia";
import useUsuarioStore from '@/stores/useUsuarioStore';

export default defineStore("perfiles-store", () => {
  const perfil = ref({
    nombre: null,
  });

  const perfiles = ref([]);
  const numeroElementos = ref(1);

  const usuarioStore = useUsuarioStore();
  const { usuarioPerfilId } = usuarioStore;

  const perfilesOpciones = computed(() =>
    perfiles.value
      .filter(p =>  p.id > usuarioPerfilId) 
      .map(({ id, nombre }) => ({
        label: nombre,
        value: id,
      }))
  );

  const asignarDataPerfiles = ({ data, resultados }) => {
    perfiles.value = data;
    numeroElementos.value = resultados;
  };

  const asignarDataPerfil = ({ data }) => {
    const { id, nombre } = data;
    perfil.value["id"] = id;
    perfil.value.nombre = nombre;
  };

  return {
    perfil,
    perfiles,
    numeroElementos,
    perfilesOpciones,
    asignarDataPerfiles,
    asignarDataPerfil,
  };
});
