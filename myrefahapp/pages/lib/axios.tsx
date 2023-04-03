import Axios from "axios";

export default Axios.create({
    baseURL: process.env.BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    },
    withCredentials: true
})