import axios from "axios"

//"https://yotubecopia.herokuapp.com/"
//"http://localhost:3300"

const local = "http://localhost:3300"

const api = axios.create({
    baseURL: local
})

export default api