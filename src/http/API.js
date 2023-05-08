import {$authHost, $host} from "./Main";

export const registration = async (username, password, surname, name, patronymic) => {
    const {data} = await $host.post('auth/registration', {username, password, surname, name, patronymic})
    if (data.jwt != null) {
        localStorage.setItem('jwt', data.jwt)
    }
    return data
}

export const verification = async (token) => {
    const {data} = await $host.get('/auth/verify?token=' + token)
    return data
}

export const login = async (username, password) => {
    const {data} = await $host.post('auth/login', {username, password})
    if (data.jwt != null) {
        localStorage.setItem('jwt', data.jwt)
    }
    return data
}

export const check = async (jwt, username) => {
    const {data} = await $host.post('auth/check', {jwt, username})
    return data.valid;
}

export const getAllUsers = async () => {
    const {data} = await $authHost.get('/user/all')
    return data
}

export const getUser = async (username) => {
    const {data} = await $authHost.get("/user/id?username=" + username)
    return data
}

export const deleteUser = async (username) => {
    await $authHost.delete('/user/delete?username=' + username)
}

export const updateUser = async (username, role, surname, name, patronymic, groupName) => {
    const {data} = await $authHost.patch('/user/update', {username, role, surname, name, patronymic, groupName})
    return data
}

export const getUserPerformances = async (username) => {
    const {data} = await $authHost.get("/performance/user?username=" + username)
    return data
}

export const deletePerformance = async (id) => {
    await $authHost.delete('/performance/delete?id=' + id)
}

export const addPerformance = async (name, mark, year, username) => {
    const {data} = await $authHost.post('/performance/add', {name, mark, year, username})
    return data
}

export const updatePerformance = async (name, mark, year, username, id) => {
    const {data} = await $authHost.patch('/performance/update?id=' + id, {name, mark, year, username})
    return data
}

export const getUserAttendances = async (username) => {
    const {data} = await $authHost.get('/attendance/user?username=' + username)
    return data
}

export const deleteAttendance = async (id) => {
    await $authHost.delete('/attendance/delete?id=' + id)
}

export const addAttendance = async (date, enterTime, exitTime, username) => {
    const {data} = await $authHost.post('/attendance/add', {date, enterTime, exitTime, username})
    return data
}

export const updateAttendance = async (date, enterTime, exitTime, username, id) => {
    const {data} = await $authHost.patch('/attendance/update?id=' + id, {date, enterTime, exitTime, username})
    return data
}
