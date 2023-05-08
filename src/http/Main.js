import axios from "axios";

const $host = axios.create({
    baseURL: 'http://localhost:8080'
})

const $authHost = axios.create({
    baseURL: 'http://localhost:8080'
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
