import { jwtDecode } from "jwt-decode";

export const decodificarTokenJWT = (token) => {
  let data;

  try {
    data = jwtDecode(token);
  } catch (err) {
    data = null;
  }

  return data;
};
