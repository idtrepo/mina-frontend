import { jwtDecode } from "jwt-decode";

export const decodificarTokenJWT = (token) => {
  let tokenDecodificado;

  try {
    tokenDecodificado = jwtDecode(token);
    return tokenDecodificado;
  } catch (err) {
    throw err;
  }
};
