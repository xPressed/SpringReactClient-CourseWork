import './App.css';
import {BrowserRouter} from "react-router-dom";
import AuthRouter from "./components/AuthRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {check} from "./http/API";
import {Spinner} from "react-bootstrap";
import DefaultRouter from "./components/DefaultRouter";

const App = observer(() => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            check(localStorage.getItem('jwt'), user.username).then(data => {
                if (data === true) {
                    user.setIsAuth(true)
                } else {
                    user.setIsAuth(false)
                }
            }).finally(() => setLoading(false))
        },);
    },);

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    if (user.isAuth) {
        return (
            <BrowserRouter>
                <NavBar/>
                <AuthRouter/>
            </BrowserRouter>
        );
    }
    return (
        <BrowserRouter>
            <DefaultRouter/>
        </BrowserRouter>
    );
})

export default App;
