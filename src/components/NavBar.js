import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import leaf from "../icons/leaf.png"
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import styles from "./css/nav.module.css"
import {useLocation} from "react-router-dom";
import ViewUser from "./modals/users/viewUser";
import {getUser} from "../http/API";

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const location = useLocation()
    const [viewVisible, setViewVisible] = useState(false)
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        async function f() {
            try {
                let data = await getUser(user.username)
                setCurrentUser(data)
            } catch (e) {}
        }

        f();
    }, [user])

    const logOut = () => {
        localStorage.removeItem('jwt')
        user.setIsAuth(false)
        window.location = '/'
    }

    return (
        <Navbar className="navbar sticky-top navbar-expand-xl navbar-light container-fluid"
                style={{backgroundColor: "white", borderBottom: "2px solid #d9d9d9"}}>
            <Nav.Link href="/"> <img alt="leaf?" className="d-block ml-5 mr-2" src={leaf}
                                     style={{width: "75px"}}/></Nav.Link>
            <Nav.Link className="" href="/"
                      style={{color: "black", textDecoration: "none", fontFamily: "Mechfire,serif", fontSize: "40px"}}>Spring
                Table</Nav.Link>
            <div className="ms-auto container px-0 mx-0 pe-3">
                {user.isAdmin || user.isTeacher ?
                    <Nav.Link
                        className={["ms-auto h4 px-4 py-2 mx-2", location.pathname === "/users" ? styles.current : styles.other].join(' ')}
                        href="/users">Users</Nav.Link>
                    :
                    <>
                        <Nav.Link
                            className={["ms-auto h4 px-4 py-2 mx-2", location.pathname.split('/')[1] === "performance" ? styles.current : styles.other].join(' ')}
                            href={"/performance/" + user.username}>Performance</Nav.Link>
                        <Nav.Link
                            className={["h4 px-4 py-2 mx-2", location.pathname.split('/')[1] === "attendance" ? styles.current : styles.other].join(' ')}
                            href={"/attendance/" + user.username}>Attendance</Nav.Link>
                    </>
                }

                <NavDropdown className="h5" title={user.username}>
                    <NavDropdown.Item onClick={() => setViewVisible(true)}
                                      className={styles.btn1}>Account</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item onClick={logOut} className={styles.btn2}>LogOut</NavDropdown.Item>
                </NavDropdown>
            </div>

            {viewVisible && <ViewUser user={currentUser} showButtons={false} onExited={() => setViewVisible(false)}/>}
        </Navbar>
    );
});

export default NavBar;