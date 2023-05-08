import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Spinner} from "react-bootstrap";
import {deletePerformance, getUserPerformances} from "../http/API";
import {Context} from "../index";
import {useParams} from "react-router-dom";
import styles from "./css/btn.module.css";
import EditPerformance from "../components/modals/editPerformance";

const Performance = observer(() => {
    const [loading, setLoading] = useState(true)
    const [performances, setPerformances] = useState([])
    const {username} = useParams()
    const {user} = useContext(Context)
    const [editVisible, setEditVisible] = useState(false);
    const [data, setData] = useState()

    if (window.location.pathname.split('/')[2] === user.username && (user.isTeacher || user.isAdmin)) {
        window.location = '/'
    }

    if (loading) {
        setTimeout(() => {
            getUserPerformances(username).then(data => {
                if (data.error !== undefined) {
                    window.location = '/error'
                    return
                }
                setPerformances(data)
            }).finally(() => setLoading(false))
        },);
    }

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    const reload = async () => {
        setLoading(true)
        setTimeout(() => {
            getUserPerformances(username).then(data => {
                if (data.error !== undefined) {
                    window.location = '/error'
                    return
                }
                setPerformances(data)
            }).finally(() => setLoading(false))
        },);
    }

    const clickDelete = async (data) => {
        await deletePerformance(data.id)
        await reload()
    }

    return (
        <div onLoad={(user.isAdmin || user.isTeacher) ? window.renderTable(-1) : window.renderTable()} className="px-0 container-fluid">
            <div className="row justify-content-center">
                <div className="col-12 col-xl-12">
                    <div className="row justify-content-center text-center">
                        <div className="col-11">
                            <p className="h1 my-4">Performance Table</p>
                            {(user.isAdmin || user.isTeacher) && <Button onClick={() => setEditVisible(true)} type="button" className={["btn btn-secondary btn-lg", styles.btn].join(' ')}>Add Performance Record</Button>}
                            <table id="userstable" className="table table-striped table-bordered table-sm m-0 p-0">
                                <thead>
                                <tr>
                                    <th className="col-5">Name</th>
                                    <th className="col-1">Mark</th>
                                    <th className="col-1">Year</th>
                                    {(user.isAdmin || user.isTeacher) && <th style={{minWidth: "90px", maxWidth: "90px"}}>Actions</th>}
                                </tr>
                                </thead>
                                <tbody>
                                {performances.map(function (data, index) {
                                    return (
                                        <tr key={index}>
                                            <td style={{
                                                textOverflow: "ellipsis",
                                                overflow: "hidden",
                                                maxWidth: 0
                                            }}>{data.name}</td>
                                            <td style={{
                                                textOverflow: "ellipsis",
                                                overflow: "hidden",
                                                maxWidth: 0
                                            }}>{data.mark}</td>
                                            <td style={{
                                                textOverflow: "ellipsis",
                                                overflow: "hidden",
                                                maxWidth: 0
                                            }}>{data.year}</td>
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
            {(user.isAdmin || user.isTeacher) && editVisible && <EditPerformance perf={data} username={username} onExited={() => {window.removeCalendar(); setData(undefined); setEditVisible(false)}}/>}
        </div>
    );
});

export default Performance;