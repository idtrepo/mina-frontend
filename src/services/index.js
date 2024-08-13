import axios from "axios";
import { BASE_URL } from "../../config/settings";
import { interceptorRequest, interceptorRequestError } from "./interceptors/request";

const instancia = axios.create({
    baseURL: BASE_URL
})

instancia.interceptors.request.use(interceptorRequest, interceptorRequestError);

export default instancia;