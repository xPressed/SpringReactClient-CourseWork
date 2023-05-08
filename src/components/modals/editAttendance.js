import React, {useState} from 'react';
import {addAttendance, updateAttendance} from "../../http/API";
import {Button, Modal} from "react-bootstrap";
import styles from "../css/modal.module.css";

const EditAttendance = ({att, onExited, username}) => {
    const [enterTime, setEnterTime] = useState(att === undefined ? '' : att.enterTime)
    const [date] = useState(att === undefined ? '' : att.date)
    const [exitTime, setExitTime] = useState(att === undefined ? '' : att.exitTime)

    const [enterTimeError, setEnterTimeError] = useState('')
    const [dateError, setDateError] = useState('')
    const [exitTimeError, setExitTimeError] = useState('')
    const [error, setError] = useState('')

    const [showModal, setShowModal] = useState(true)

    const checkDate = () => {
        try {
            return window.getDate()
        } catch (e) {}
        return  date
    }

    const click = async () => {
        setError(null)
        try {
            let datePicker = null
            try {
                datePicker = window.getDate()
            } catch (e) {
            }
            let data
            if (att === undefined) {
                data = await addAttendance(datePicker, enterTime, exitTime, username)
            } else {
                data = await updateAttendance(datePicker, enterTime, exitTime, username, att.id)
            }

            if (!(data.isSaved === true || data.isUpdated === true)) {
                setEnterTimeError(data.enterTime)
                setExitTimeError(data.exitTime)
                setDateError(data.date)
                return
            }
            window.location = "/attendance/" + username;
        } catch (e) {
            setError("Something went wrong!")
        }
    }

    return (
        <Modal onShow={() => {
            window.renderCalendarDate();
        }} show={showModal} onHide={() => setShowModal(false)} onExited={onExited} size='500px' centered
               contentClassName={styles.content}
               backdropClassName={styles.backdrop}>
            <Modal.Body>
                <form>

                    <div className="form-group form-group-lg">
                        <label htmlFor="year" className="h4">Date of Record</label>
                        <div className="input-group date" id="datepicker">
                            <input type="text" id="year" className="form-control input-lg"
                                   placeholder="Enter Date of Record" autoComplete="off"
                                   value={checkDate()}/>
                            <span className="add-on input-group-text" style={{borderRadius: 0}}><i
                                className="fa fa-calendar"></i></span>
                        </div>
                    </div>
                    <div style={{color: 'red'}}>
                        <p>{dateError}</p>
                    </div>

                    <div className="form-group form-group-lg">
                        <label htmlFor="name" className="h4">Time of Enter</label>
                        <input type="text" id="name" className="form-control input-lg"
                               placeholder="Enter Time" autoComplete="off"
                               value={enterTime}
                               onChange={e => setEnterTime(e.target.value)}/>
                    </div>
                    <div style={{color: 'red'}}>
                        <p>{enterTimeError}</p>
                    </div>

                    <div className="form-group form-group-lg">
                        <label htmlFor="name" className="h4">Time of Exit</label>
                        <input type="text" id="name" className="form-control input-lg"
                               placeholder="Exit Time" autoComplete="off"
                               value={exitTime}
                               onChange={e => setExitTime(e.target.value)}/>
                    </div>
                    <div style={{color: 'red'}}>
                        <p>{exitTimeError}</p>
                    </div>

                    <div style={{color: 'red'}}>
                        <p>{error}</p>
                    </div>

                    <div className="d-flex justify-content-center m-3">
                        <Button id="btn" className={["btn btn-secondary btn-lg", styles.btn].join(" ")}
                                onClick={click}>{att === undefined ? "Add Record" : "Update Record"}
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default EditAttendance;