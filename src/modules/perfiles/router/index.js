import { ICONOS } from "@/modules/global/utils/iconos";
import { PERFILES } from "@/modules/global/utils/perfiles";

export default {
  path: "/perfiles",
  name: "perfiles",
  component: () => import("@/modules/perfiles/layouts/PerfilesLayout.vue"),
  meta: {
    icono: ICONOS.PERFILES,
    titulo: "perfiles",
    perfil: [PERFILES.SUPER_USUARIO],
  },
  children: [
    {
      path: "",
      name: "perfiles-listado",
      component: () => import("@/modules/perfiles/views/PerfilesView.vue"),
    },
    {
      path: ":id",
      name: "perfiles-data",
      component: () => import("@/modules/perfiles/views/PerfilesDataView.vue"),
    },
    {
      path: "acciones",
      name: "acciones-listado",
      meta: {
        icono: ICONOS.ACCIONES,
        titulo: "acciones",
      },
      component: () => import("@/modules/perfiles/views/AccionesView.vue"),
    },
    {
      path: "categorias",
      name: "categorias-listado",
      meta: {
        icono: ICONOS.CATEGORIAS,
        titulo: "categorias",
      },
      component: () => import("@/modules/perfiles/views/CategoriasView.vue"),
    },
    {
      path: "operaciones",
      name: "operaciones-listado",
      meta: {
        icono: ICONOS.PERMISOS,
        titulo: "operaciones",
      },
      component: () => import("@/modules/perfiles/views/OperacionesView.vue"),
    },
    {
      path: "menu",
      name: "perfiles-menu",
      component: () => import("@/modules/perfiles/views/PerfilesMenuView.vue"),
    },
    {
      path: "operaciones/:id",
      name: "operaciones-data",
      component: () => import("@/modules/perfiles/views/OperacionesDataView.vue"),
    },
  ],
};
