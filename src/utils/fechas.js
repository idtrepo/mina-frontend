import { format } from "@formkit/tempo";

const l = "en";

export const formatearFecha = (t) => {
  return format(t, "YYYY-MM-DD", l);
};

export const formatearHora = (t) => {
  return format(t, "hh:mm:ss", l);
};
