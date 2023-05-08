import React, {useEffect, useState} from 'react';
import {login, verification} from "../http/API";
import {observer} from "mobx-react-lite";
import styles from "./css/auth.module.css"
import {Button} from "react-bootstrap";
import lock from "../icons/lock.png";
import unlock from "../icons/unlock.png";

const Login = observer(() => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [show, setShow] = useState(false)
    const [verified, setIsVerified] = useState(false)

    useEffect(() => {
        async function f() {
            if (window.location.pathname.split('/')[1] === "verify") {
                try {
                    let data = await verification(window.location.pathname.split('/')[2])
                    if (data.isVerified === true) {
                        setIsVerified(true)
                    }
                } catch (e) {}
            }
        }

        f();
    }, [])

    const click = async () => {
        if (username === "" || password === "") {
            setError("Please enter your E-Mail and Password!")
            return
        }

        try {
            let data = await login(username, password)
            if (data.jwt != null) {
                window.location = '/'
            } else {
                setError(data.error)
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

                                <div className="mx-5 px-5" style={{position: 'relative'}}>
                                    <label className="h4">Password</label>
                                    {show ?
                                        <input type="text" id="password" className="form-control"
                                               placeholder="Enter Your Password" value={password}
                                               onChange={e => setPassword(e.target.value)}/>
                                        :
                                        <input type="password" id="password" className="form-control"
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

                                {verified && <div className="mx-5 px-5" style={{color: 'limegreen'}}>
                                    <p>E-Mail successfully verified!</p>
                                </div>}

                                <div className="mx-5 px-5" style={{color: 'red'}}>
                                    <p>{error}</p>
                                </div>

                                <div className="d-flex justify-content-center m-3 pb-3">
                                    <Button id="first" onClick={click}
                                            className={["btn btn-secondary btn-lg", styles.first].join(' ')}
                                            style={{borderColor: '#5700f7', borderRadius: '30px'}}>
                                        Log In
                                    </Button>
                                    <Button id="second" type="button" href="/registration"
                                            className={["btn btn-secondary btn-lg pb-3 mx-4", styles.second].join(' ')}
                                            style={{borderColor: 'grey', borderRadius: '30px'}}>Registration
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // return (
    //     <Container className="d-flex justify-content-center align-items-center"
    //                style={{height: window.innerHeight - 56}}>
    //         <Card style={{width: 600}} className="p-5">
    //             <h2 className="m-auto">{isLogin ? 'Authorization' : 'Registration'}</h2>
    //             <Form className="d-flex flex-column">
    //                 <Form.Control className="mt-3" placeholder="Enter your Email..." value={email} onChange={e => setEmail(e.target.value)}/>
    //                 <Form.Control className="mt-3" placeholder="Enter your Password..." value={password} onChange={e => setPassword(e.target.value)} type="password"/>
    //                 {isLogin ?
    //                     <Container className="d-flex justify-content-center align-items-center">
    //                         <Button className="mt-3 mx-2" variant={"outline-dark"} href="/registration">Registration</Button>
    //                         <Button className="mt-3 mx-2" variant={"outline-success"} onClick={click}>Log In</Button>
    //                     </Container>
    //                     :
    //                     <Container className="d-flex justify-content-center align-items-center">
    //                         <Button className="mt-3 mx-2" variant={"outline-dark"} href="/login">Authorization</Button>
    //                         <Button className="mt-3 mx-2" variant={"outline-success"} onClick={click}>Register</Button>
    //                     </Container>
    //                 }
    //             </Form>
    //         </Card>
    //     </Container>
    // );
});

export default Login;