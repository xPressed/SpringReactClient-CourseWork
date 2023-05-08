import React, {useContext, useState} from 'react';
import {useParams} from "react-router-dom";
import {Context} from "../index";
import {deleteAttendance, getUserAttendances} from "../http/API";
import {Button, Spinner} from "react-bootstrap";
import styles from "./css/btn.module.css";
import EditAttendance from "../components/modals/editAttendance";

const Attendance = () => {
    const [loading, setLoading] = useState(true)
    const [attendances, setAttendances] = useState([])
    const {username} = useParams()
    const {user} = useContext(Context)
    const [editVisible, setEditVisible] = useState(false);
    const [data, setData] = useState()

    if (window.location.pathname.split('/')[2] === user.username && (user.isTeacher || user.isAdmin)) {
        window.location = '/'
    }

    if (loading) {
        setTimeout(() => {
            getUserAttendances(username).then(data => {
                if (data.error !== undefined) {
                    window.location = '/error'
                    return
                }
                setAttendances(data)
            }).finally(() => setLoading(false))
        },);
    }

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    const reload = async () => {
        setLoading(true)
        setTimeout(() => {
            getUserAttendances(username).then(data => {
                if (data.error !== undefined) {
                    window.location = '/error'
                    return
                }
                setAttendances(data)
            }).finally(() => setLoading(false))
        },);
    }

    const clickDelete = async (data) => {
        await deleteAttendance(data.id)
        await reload()
    }

    return (
        <div onLoad={(user.isAdmin || user.isTeacher) ? window.renderTable(-1) : window.renderTable()} className="px-0 container-fluid">
            <div className="row justify-content-center">
                <div className="col-12 col-xl-12">
                    <div className="row justify-content-center text-center">
                        <div className="col-11">
                            <p className="h1 my-4">Performance Table</p>
                            {(user.isAdmin || user.isTeacher) && <Button onClick={() => setEditVisible(true)} type="button" className={["btn btn-secondary btn-lg", styles.btn].join(' ')}>Add Attendance Record</Button>}
                            <table id="userstable" className="table table-striped table-bordered table-sm m-0 p-0">
                                <thead>
                                <tr>
                                    <th className="col-3">Date of Record</th>
                                    <th className="col-3">Enter Time</th>
                                    <th className="col-3">Exit Time</th>
                                    {(user.isAdmin || user.isTeacher) && <th style={{minWidth: "90px", maxWidth: "90px"}}>Actions</th>}
                                </tr>
                                </thead>
                                <tbody>
                                {attendances.map(function (data, index) {
                                    return (
                                        <tr key={index}>
                                            <td style={{
                                                textOverflow: "ellipsis",
                                                overflow: "hidden",
                                                maxWidth: 0
                                            }}>{data.date}</td>
                                            <td style={{
                                                textOverflow: "ellipsis",
                                                overflow: "hidden",
                                                maxWidth: 0
                                            }}>{data.enterTime}</td>
                                            <td style={{
                                                textOverflow: "ellipsis",
                                                overflow: "hidden",
                                                maxWidth: 0
                                            }}>{data.exitTime}</td>
                                            {(user.isAdmin || user.isTeacher) && <td>
                                                <Button onClick={() => {setData(data); setEditVisible(true)}} type="button" className="btn btn-success"><i
                                                    className="fa fa-edit"></i></Button>
                                                <Button type="button" className="btn btn-danger"
                                                        onClick={() => clickDelete(data)}><i
                                                    className="fas fa-trash-alt"></i></Button>
                                            </td>}
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {(user.isAdmin || user.isTeacher) && editVisible && <EditAttendance att={data} username={username} onExited={() => {window.removeCalendar(); setData(undefined); setEditVisible(false)}}/>}
        </div>
    );
};

export default Attendance;