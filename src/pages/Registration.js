import React, {useState} from 'react';
import {registration} from "../http/API";
import {observer} from "mobx-react-lite";
import styles from "./css/auth.module.css"
import {Button} from "react-bootstrap";
import lock from "../icons/lock.png";
import unlock from "../icons/unlock.png";

const Registration = observer(() => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repPassword, setRepPassword] = useState('')
    const [surname, setSurname] = useState('')
    const [name, setName] = useState('')
    const [patronymic, setPatronymic] = useState('')
    const [error, setError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [surnameError, setSurnameError] = useState('')
    const [nameError, setNameError] = useState('')
    const [patronymicError, setPatronymicError] = useState('')
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)

    const click = async () => {
        setError(null)
        if (username === "" || password === "" || surname === "" || name === "") {
            setError("Please enter your Registration Data!")
            return
        }

        if (password.length < 5) {
            setPasswordError("Password should be at least 5 symbols!")
            return
        }

        if (password !== repPassword) {
            setPasswordError("Passwords do not match!")
            return
        }

        setPasswordError(null)

        try {
            let data = await registration(username, password, surname, name, patronymic === "" ? null : patronymic)
            if (data.isRegistered === true) {
                window.location = '/'
            } else {
                setUsernameError(data.username)
                setPasswordError(data.password)
                setSurnameError(data.surname)
                setNameError(data.name)
                setPatronymicError(data.patronymic)
            }
        } catch (e) {
            setError("Something went wrong!")
        }
    }

    return (
        <div style={{backgroundColor: 'transparent'}}>
            <div className="mt-4 container-fluid">
                <div className="row justify-content-center">
                    <div className="col-10 col-xl-5">
                        <div style={{backgroundColor: 'white', borderRadius: '25px', border: '2px solid #5700f7'}}>
                            <p className="text-center display-4" style={{fontFamily: 'Mechfire,serif'}}>Spring Table</p>
                            <form>
                                <div className="mx-5 px-5 form-group form-group-lg">
                                    <label className="h4">E-Mail</label>
                                    <input type="text" id="username" className="form-control"
                                           placeholder="Enter Your E-Mail" value={username}
                                           onChange={e => setUsername(e.target.value)}/>
                                </div>

                                <div className="mx-5 px-5" style={{color: 'red'}}>
                                    <p>{usernameError}</p>
                                </div>

                                <div className="mx-5 px-5" style={{position: 'relative'}}>
                                    <label className="h4">Password</label>
                                    {show ?
                                        <input type="text" className="form-control"
                                               placeholder="Enter Your Password" value={password}
                                               onChange={e => setPassword(e.target.value)}/>
                                        :
                                        <input type="password" className="form-control"
                                               placeholder="Enter Your Password" value={password}
                                               onChange={e => setPassword(e.target.value)}/>
                                    }

                                    {show ?
                                        <img onMouseLeave={() => {
                                            setShow(false)
                                        }} alt="lock?" className="d-block"
                                             src={lock}
                                             style={{
                                                 width: '30px',
                                                 position: 'absolute',
                                                 left: 'calc(100% - 15px)',
                                                 bottom: '3px'
                                             }}/>
                                        :
                                        <img onMouseEnter={() => {
                                            setShow(true)
                                        }} alt="lock?" className="d-block"
                                             src={unlock}
                                             style={{
                                                 width: '30px',
                                                 position: 'absolute',
                                                 left: 'calc(100% - 15px)',
                                                 bottom: '3px'
                                             }}/>
                                    }
                                </div>

                                <div className="mx-5 px-5" style={{position: 'relative'}}>
                                    <label className="h4">Repeated Password</label>
                                    {show2 ?
                                        <input type="text" className="form-control"
                                               placeholder="Repeat Your Password" value={repPassword}
                                               onChange={e => setRepPassword(e.target.value)}/>
                                        :
                                        <input type="password" className="form-control"
                                               placeholder="Repeat Your Password" value={repPassword}
                                               onChange={e => setRepPassword(e.target.value)}/>
                                    }

                                    {show2 ?
                                        <img onMouseLeave={() => {
                                            setShow2(false)
                                        }} alt="lock?" className="d-block"
                                             src={lock}
                                             style={{
                                                 width: '30px',
                                                 position: 'absolute',
                                                 left: 'calc(100% - 15px)',
                                                 bottom: '3px'
                                             }}/>
                                        :
                                        <img onMouseEnter={() => {
                                            setShow2(true)
                                        }} alt="lock?" className="d-block"
                                             src={unlock}
                                             style={{
                                                 width: '30px',
                                                 position: 'absolute',
                                                 left: 'calc(100% - 15px)',
                                                 bottom: '3px'
                                             }}/>
                                    }
                                </div>

                                <div className="mx-5 px-5" style={{color: 'red'}}>
                                    <p>{passwordError}</p>
                                </div>

                                <div className="mx-5 px-5 form-group form-group-lg">
                                    <label className="h4">Surname</label>
                                    <input type="text" className="form-control"
                                           placeholder="Enter Your Surname" value={surname}
                                           onChange={e => setSurname(e.target.value)}/>
                                </div>

                                <div className="mx-5 px-5" style={{color: 'red'}}>
                                    <p>{surnameError}</p>
                                </div>

                                <div className="mx-5 px-5 form-group form-group-lg">
                                    <label className="h4">Name</label>
                                    <input type="text" className="form-control"
                                           placeholder="Enter Your Name" value={name}
                                           onChange={e => setName(e.target.value)}/>
                                </div>

                                <div className="mx-5 px-5" style={{color: 'red'}}>
                                    <p>{nameError}</p>
                                </div>

                                <div className="mx-5 px-5 form-group form-group-lg">
                                    <label className="h4">Patronymic</label>
                                    <input type="text" className="form-control"
                                           placeholder="Enter Your Patronymic (or leave empty)" value={patronymic}
                                           onChange={e => setPatronymic(e.target.value)}/>
                                </div>

                                <div className="mx-5 px-5" style={{color: 'red'}}>
                                    <p>{patronymicError}</p>
                                </div>

                                <div className="mx-5 px-5" style={{color: 'red'}}>
                                    <p>{error}</p>
                                </div>

                                <div className="d-flex justify-content-center m-3 pb-3">
                                    <Button id="first" onClick={click}
                                            className={["btn btn-secondary btn-lg", styles.first].join(' ')}
                                            style={{borderColor: '#5700f7', borderRadius: '30px'}}>
                                        Register
                                    </Button>
                                    <Button id="second" type="button" href="/login"
                                            className={["btn btn-secondary btn-lg pb-3 mx-4", styles.second].join(' ')}
                                            style={{borderColor: 'grey', borderRadius: '30px'}}>Authorization
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Registration;