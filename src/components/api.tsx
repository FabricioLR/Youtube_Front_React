import axios from "axios"

//https://yotubecopia.herokuapp.com/
//http://localhost:3300

const api = axios.create({
    baseURL: "https://yotubecopia.herokuapp.com/"
})

export default api