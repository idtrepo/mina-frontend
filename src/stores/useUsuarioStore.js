import { ref, computed } from "vue";
import { defineStore } from "pinia";

export default defineStore("usuario-store", () => {
  const usuario = ref(null);
  const usuarioNombre = computed(() => usuario.value?.nombre ?? "");
  const usuarioApellido = computed(() => usuario.value?.apellido ?? "");
  const usuarioNombreCompleto = computed(
    () => `${usuarioNombre.value} ${usuarioApellido.value}`
  );
  const usuarioCorreo = computed(() => usuario.value?.correo);
  const usuarioPerfil = computed(() => usuario.value?.perfil?.nombre);
  const usuarioPerfilId = computed(() => usuario.value?.perfil?.id);
  const usuarioPermisos = computed(() => usuario.value?.perfil?.acciones);
  const usuarioCliente = computed(() => usuario.value?.cliente?.id);
  const usuarioSucursal = computed(() => usuario.value?.sucursal?.id);

  const asignarDataUsuario = (dataUsuario) => {
    usuario.value = dataUsuario;
  };

  const borrarDataUsuario = () => (usuario.value = null);

  return {
    usuarioNombre,
    usuarioApellido,
    usuarioNombreCompleto,
    usuarioCorreo,
    usuarioPerfil,
    usuarioPermisos,
    usuarioCliente,
    usuarioSucursal,
    usuarioPerfilId,
    asignarDataUsuario,
    borrarDataUsuario,
  };
});
