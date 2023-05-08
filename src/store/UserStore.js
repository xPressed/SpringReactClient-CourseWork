import {makeAutoObservable} from "mobx";
import jwt_decode from "jwt-decode";

export default class UserStore {
    constructor() {
        this._isAuth = false

        try {
            this._username = jwt_decode(localStorage.getItem('jwt')).sub
            this._role = jwt_decode(localStorage.getItem('jwt')).role
        } catch (e) {
            this._username = null
            this._role = null
        }

        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    get isAuth() {
        return this._isAuth
    }

    get username() {
        return this._username
    }

    get isStudent() {
        return this._role === 'ROLE_STUDENT'
    }

    get isTeacher() {
        return this._role === 'ROLE_TEACHER'
    }

    get isAdmin() {
        return this._role === 'ROLE_ADMIN'
    }
}