import axios from "axios";
import { BASE_URL } from "../../config/settings";

const instancia = axios.create({
    baseURL: BASE_URL
})

export default instancia;