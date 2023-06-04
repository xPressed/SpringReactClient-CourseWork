import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL
})

const authInterceptor = config => {
    config.headers.authorization = localStorage.getItem('jwt')
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}
