import React, {useState} from 'react';
import styles from "../css/modal.module.css"
import {Button, Modal} from "react-bootstrap";
import {addPerformance, updatePerformance} from "../../http/API";

const EditPerformance = ({perf, onExited, username}) => {
    const [name, setName] = useState(perf === undefined ? '' : perf.name)
    const [year] = useState(perf === undefined ? '' : perf.year)
    const [mark, setMark] = useState(perf === undefined ? '' : perf.mark)

    const [nameError, setNameError] = useState('')
    const [yearError, setYearError] = useState('')
    const [markError, setMarkError] = useState('')
    const [error, setError] = useState('')

    const [showModal, setShowModal] = useState(true)

    const checkYear = () => {
        try {
            return window.getYear()
        } catch (e) {}
         return  year
    }

    const click = async () => {
        setError(null)
        try {
            let yearPicker = null
            try {
                yearPicker = window.getYear()
            } catch (e) {
            }
            let data
            if (perf === undefined) {
                data = await addPerformance(name, mark, yearPicker, username)
            } else {
                data = await updatePerformance(name, mark, yearPicker, username, perf.id)
            }

            if (!(data.isSaved === true || data.isUpdated === true)) {
                setNameError(data.name)
                setYearError(data.year)
                setMarkError(data.mark)
                return
            }
            window.location = "/performance/" + username;
        } catch (e) {
            setError("Something went wrong!")
        }
    }

    return (
        <Modal onShow={() => {
            window.renderCalendar();
        }} show={showModal} onHide={() => setShowModal(false)} onExited={onExited} size='500px' centered
               contentClassName={styles.content}
               backdropClassName={styles.backdrop}>
            <Modal.Body>
                <form>
                    <div className="form-group form-group-lg">
                        <label htmlFor="name" className="h4">Name</label>
                        <input type="text" id="name" className="form-control input-lg"
                               placeholder="Enter Discipline Name" autoComplete="off"
                               value={name}
                               onChange={e => setName(e.target.value)}/>
                    </div>
                    <div style={{color: 'red'}}>
                        <p>{nameError}</p>
                    </div>

                    <div className="form-group form-group-lg">
                        <label htmlFor="year" className="h4">Year</label>
                        <div className="input-group date" id="datepicker">
                            <input type="text" id="year" className="form-control input-lg"
                                   placeholder="Enter Year" autoComplete="off"
                                   value={checkYear()}/>
                            <span className="add-on input-group-text" style={{borderRadius: 0}}><i
                                className="fa fa-calendar"></i></span>
                        </div>
                    </div>
                    <div style={{color: 'red'}}>
                        <p>{yearError}</p>
                    </div>

                    <div className="form-group form-group-lg">
                        <label className="h4">Mark</label>

                        <div className="form-check">
                            <input className="form-check-input" type="radio" id="2"
                                   value="2"
                                   checked={mark === "2"}
                                   onChange={e => setMark(e.target.value)}/>
                            <label className="form-check-label" htmlFor="2">
                                Неудовлетворительно
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="radio" id="3"
                                   value="3"
                                   checked={mark === "3"}
                                   onChange={e => setMark(e.target.value)}/>
                            <label className="form-check-label" htmlFor="3">
                                Удовлетворительно
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="radio" id="4"
                                   value="4"
                                   checked={mark === "4"}
                                   onChange={e => setMark(e.target.value)}/>
                            <label className="form-check-label" htmlFor="4">
                                Хорошо
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="radio" id="5"
                                   value="5"
                                   checked={mark === "5"}
                                   onChange={e => setMark(e.target.value)}/>
                            <label className="form-check-label" htmlFor="5">
                                Отлично
                            </label>
                        </div>
                    </div>
                    <div style={{color: 'red'}}>
                        <p>{markError}</p>
                    </div>

                    <div style={{color: 'red'}}>
                        <p>{error}</p>
                    </div>

                    <div className="d-flex justify-content-center m-3">
                        <Button id="btn" className={["btn btn-secondary btn-lg", styles.btn].join(" ")}
                                onClick={click}>{perf === undefined ? "Add Record" : "Update Record"}
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default EditPerformance;