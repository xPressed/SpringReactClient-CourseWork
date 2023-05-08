import React, {useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import styles from "../../css/modal.module.css"

const ViewUser = ({onExited, user, showButtons}) => {
    const [showModal, setShowModal] = useState(true)

    return (
        <Modal show={showModal} onHide={() => setShowModal(false)} onExited={onExited} size='500px' centered contentClassName={styles.content}
               backdropClassName={styles.backdrop}>
            <Modal.Header closeButton>
                <p className="h3">{user.username}</p>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group form-group-lg">
                    <label htmlFor="username" className="h4 mb-0">E-Mail</label>
                    <p id="username">{user.username}</p>
                </div>

                <div className="form-group form-group-lg">
                    <label htmlFor="role" className="h4 mb-0">Role</label>
                    <p id="role">{user.role}</p>
                </div>

                <div className="form-group form-group-lg">
                    <label htmlFor="surname" className="h4 mb-0">Surname</label>
                    <p id="surname">{user.surname}</p>
                </div>

                <div className="form-group form-group-lg">
                    <label htmlFor="name" className="h4 mb-0">Name</label>
                    <p id="name">{user.name}</p>
                </div>

                <div className="form-group form-group-lg">
                    <label htmlFor="patronymic" className="h4 mb-0">Patronymic</label>
                    <p id="patronymic">{user.patronymic}</p>
                </div>

                <div className="form-group form-group-lg">
                    <label htmlFor="groupName" className="h4 mb-0">Group Name</label>
                    <p id="groupName">{user.groupName}</p>
                </div>

                <div className="d-flex justify-content-center m-3">
                    {showButtons &&
                        <>
                            <Button type="button" className={["btn btn-secondary btn-lg", styles.btn].join(" ")}
                                    href={"/performance/" + user.username}>Performance
                            </Button>
                            <Button type="button"
                                    href={"/attendance/" + user.username}
                                    className={["btn btn-secondary btn-lg mx-4", styles.btn].join(" ")}>Attendance
                            </Button>
                        </>
                    }
                </div>

            </Modal.Body>
        </Modal>
    );
};

export default ViewUser;