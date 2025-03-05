import { ref } from "vue";

export default () => {
  const modal = ref(false);

  const mostrarModal = () => {
    modal.value = !modal.value;
  };

  return {
    modal,
    mostrarModal,
  };
};
