import axios from "axios";
import {API_URL} from '../../variables.json'

export default axios.create({
    baseURL: `http://${API_URL}`
})