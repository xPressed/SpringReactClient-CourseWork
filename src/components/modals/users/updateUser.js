import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import styles from "../../css/modal.module.css";
import {updateUser} from "../../../http/API";

const UpdateUser = ({onExited, user}) => {
    const [role, setRole] = useState(user.role);
    const [surname, setSurname] = useState(user.surname);
    const [name, setName] = useState(user.name);
    const [patronymic, setPatronymic] = useState(user.patronymic);
    const [groupName, setGroupName] = useState(user.groupName);

    const [surnameError, setSurnameError] = useState('');
    const [nameError, setNameError] = useState('');
    const [patronymicError, setPatronymicError] = useState('');
    const [groupNameError, setGroupNameError] = useState('');
    const [error, setError] = useState('');

    const [showModal, setShowModal] = useState(true)

    const click = async () => {
        setError(null)
        try {
            let data = await updateUser(user.username, role, surname, name, patronymic === "" ? null : patronymic, groupName === "" ? null : groupName)
            if (data.isUpdated === true) {
                setShowModal(false)
            } else {
                setSurnameError(data.surname)
                setNameError(data.name)
                setPatronymicError(data.patronymic)
                setGroupNameError(data.groupName)
            }
        } catch (e) {
            setError("Something went wrong!")
        }
    }

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)} onExited={onExited} size='500px' centered contentClassName={styles.content}
               backdropClassName={styles.backdrop}>
            <Modal.Header closeButton>
                <p className="h3">{user.username}</p>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group form-group-lg">
                        <label className="h4">Role</label>
                        <div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="default"
                                       checked={role === "ROLE_DEFAULT"}
                                       value="ROLE_DEFAULT"
                                       onChange={e => setRole(e.target.value)}/>
                                <label className="form-check-label" htmlFor="default">
                                    ROLE_DEFAULT
                                </label>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="student"
                                       checked={role === "ROLE_STUDENT"}
                                       value="ROLE_STUDENT"
                                       onChange={e => setRole(e.target.value)}/>
                                <label className="form-check-label" htmlFor="student">
                                    ROLE_STUDENT
                                </label>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="teacher"
                                       checked={role === "ROLE_TEACHER"}
                                       value="ROLE_TEACHER"
                                       onChange={e => setRole(e.target.value)}/>
                                <label className="form-check-label" htmlFor="teacher">
                                    ROLE_TEACHER
                                </label>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" type="radio" id="admin"
                                       checked={role === "ROLE_ADMIN"}
                                       value="ROLE_ADMIN"
                                       onChange={e => setRole(e.target.value)}/>
                                <label className="form-check-label" htmlFor="admin">
                                    ROLE_ADMIN
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="form-group form-group-lg">
                        <label htmlFor="surname" className="h4">Surname</label>
                        <input type="text" id="surname" className="form-control input-lg"
                               value={surname}
                               onChange={e => setSurname(e.target.value)}
                               placeholder="Enter Surname"/>
                    </div>
                    <div style={{color: 'red'}}>
                        <p>{surnameError}</p>
                    </div>

                    <div className="form-group form-group-lg">
                        <label htmlFor="name" className="h4">Name</label>
                        <input type="text" id="name" className="form-control input-lg"
                               value={name}
                               onChange={e => setName(e.target.value)}
                               placeholder="Enter Name"/>
                    </div>
                    <div style={{color: 'red'}}>
                        <p>{nameError}</p>
                    </div>

                    <div className="form-group form-group-lg">
                        <label htmlFor="patronymic" className="h4">Patronymic (or Empty)</label>
                        <input type="text" id="patronymic" className="form-control input-lg"
                               value={patronymic}
                               onChange={e => setPatronymic(e.target.value)}
                               placeholder="Enter Patronymic"/>
                    </div>
                    <div style={{color: 'red'}}>
                        <p>{patronymicError}</p>
                    </div>

                    <div className="form-group form-group-lg">
                        <label htmlFor="groupName" className="h4">Group Name</label>
                        <input type="text" id="groupName" className="form-control input-lg"
                               value={groupName}
                               onChange={e => setGroupName(e.target.value)}
                               placeholder="Enter Group Name"/>
                    </div>
                    <div style={{color: 'red'}}>
                        <p>{groupNameError}</p>
                    </div>

                    <div style={{color: 'red'}}>
                        <p>{error}</p>
                    </div>

                    <div className="d-flex justify-content-center m-3">
                        <Button id="first"
                                className={["btn btn-secondary btn-lg", styles.btn].join(' ')}
                                onClick={click}>
                            Update User
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateUser;