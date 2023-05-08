import {observer} from "mobx-react-lite";
import {useContext, useState} from "react";
import {deleteUser, getAllUsers} from "../http/API";
import {Button, Spinner} from "react-bootstrap";
import {Context} from "../index";
import ViewUser from "../components/modals/users/viewUser"
import UpdateUser from "../components/modals/users/updateUser";

const Users = observer(() => {
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState([]);
    const {user} = useContext(Context)
    const [viewVisible, setViewVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState();
    const [updateVisible, setUpdateVisible] = useState(false);

    if (loading) {
        setTimeout(() => {
            getAllUsers().then(data => {
                setUsers(data)
            }).finally(() => setLoading(false))
        },);
    }

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

    const reload = async () => {
        setLoading(true)
        setTimeout(() => {
            getAllUsers().then(data => {
                setUsers(data)
            }).finally(() => setLoading(false))
        }, );
    }

    const clickDelete = async (data) => {
        await deleteUser(data.username)
        await reload()
    }

    return (

        <div onLoad={window.renderTable(-1)} className="px-0 container-fluid">
            <div className="row justify-content-center">
                <div className="col-12 col-xl-12">
                    <div className="row justify-content-center text-center">
                        <div className="col-11">
                            <p className="h1 my-4">Users Table</p>
                            <table id="userstable" className="table table-striped table-bordered table-sm m-0 p-0">
                                <thead>
                                <tr>
                                    <th className="col-2">Role</th>
                                    <th className="col-2">Surname</th>
                                    <th className="col-2">Name</th>
                                    <th className="col-2">Patronymic</th>
                                    <th className="col-2">Group</th>
                                    <th style={{minWidth: "130px", maxWidth: "130px"}}>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.map(function (data, index) {
                                    return (
                                        <tr key={index}>
                                            <td style={{
                                                textOverflow: "ellipsis",
                                                overflow: "hidden",
                                                maxWidth: 0
                                            }}>{data.role}</td>
                                            <td style={{
                                                textOverflow: "ellipsis",
                                                overflow: "hidden",
                                                maxWidth: 0
                                            }}>{data.surname}</td>
                                            <td style={{
                                                textOverflow: "ellipsis",
                                                overflow: "hidden",
                                                maxWidth: 0
                                            }}>{data.name}</td>
                                            <td style={{
                                                textOverflow: "ellipsis",
                                                overflow: "hidden",
                                                maxWidth: 0
                                            }}>{data.patronymic}</td>
                                            <td style={{
                                                whiteSpace: "nowrap",
                                                textOverflow: "ellipsis",
                                                overflow: "hidden",
                                                maxWidth: 0
                                            }}>{data.groupName}</td>
                                            <td>
                                                <Button onClick={() => {setViewVisible(true); setCurrentUser(data)}} type="button" className="btn btn-primary"><i
                                                    className="fa fa-eye"></i></Button>
                                                <Button onClick={() => {setUpdateVisible(true); setCurrentUser(data)}} type="button" className="btn btn-success"><i
                                                    className="fa fa-edit"></i></Button>
                                                {user.isAdmin && <Button type="button" className="btn btn-danger"
                                                                         onClick={() => clickDelete(data)}><i
                                                    className="fas fa-trash-alt"></i></Button>}
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {viewVisible && <ViewUser user={currentUser} showButtons={currentUser.role === "ROLE_STUDENT"} onExited={() => setViewVisible(false)}/>}
            {updateVisible && <UpdateUser user={currentUser} onExited={async () => {await reload(); setUpdateVisible(false)}}/>}

        </div>
    )
})

export default Users