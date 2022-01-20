import axios from "axios"

//https://yotubecopia.herokuapp.com/
//http://localhost:3300

const api = axios.create({
    baseURL: "http://localhost:3300"
})

export default api