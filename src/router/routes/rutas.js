import { ICONOS } from "@/modules/global/utils/iconos";
import { VISTAS } from "@/modules/global/utils/vistas";
import { PERFILES } from "@/modules/global/utils/perfiles";

export const rutas = [
  {
    perfil: [
      PERFILES.SUPER_USUARIO,
      PERFILES.ADMINISTRADOR,
      PERFILES.SUPERVISOR,
    ],
    titulo: "areas",
    icono: ICONOS.AREAS,
    ruta: VISTAS.AREAS,
  },
  {
    perfil: [PERFILES.SUPER_USUARIO],
    titulo: "clientes",
    icono: ICONOS.CLIENTES,
    ruta: VISTAS.CLIENTES,
  },
  {
    perfil: [
      PERFILES.SUPER_USUARIO,
      PERFILES.ADMINISTRADOR,
      PERFILES.SUPERVISOR,
      PERFILES.OPERADOR,
    ],
    titulo: "modulos",
    icono: ICONOS.MODULOS,
    ruta: VISTAS.MODULOS,
  },
  {
    perfil: [PERFILES.SUPER_USUARIO, PERFILES.ADMINISTRADOR],
    titulo: "perfiles",
    icono: ICONOS.PERFILES,
    ruta: VISTAS.PERFILES_MENU,
  },
  {
    perfil: [
      PERFILES.SUPER_USUARIO,
      PERFILES.ADMINISTRADOR,
      PERFILES.SUPERVISOR,
    ],
    titulo: "sucursales",
    icono: ICONOS.SUCURSALES,
    ruta: VISTAS.SUCURSALES,
  },
  {
    perfil: [
      PERFILES.SUPER_USUARIO,
      PERFILES.ADMINISTRADOR,
      PERFILES.SUPERVISOR,
    ],
    titulo: "usuarios",
    icono: ICONOS.USUARIOS,
    ruta: VISTAS.USUARIOS,
  },
];
