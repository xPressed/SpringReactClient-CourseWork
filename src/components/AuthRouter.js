import React, {useContext} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom'
import {Context} from "../index";
import Users from "../pages/Users";
import Performance from "../pages/Performance";
import Attendance from "../pages/Attendance";
import Error from "../pages/Error";

const AuthRouter = () => {
    const {user} = useContext(Context)

    return (
        <Routes>
            {(user.isStudent) && <Route path='/' element={<Navigate to={'/performance/' + user.username}/>}/>}

            <Route path='/performance/:username' element={<Performance/>}/>}
            <Route path='/attendance/:username' element={<Attendance/>}/>}

            {(user.isAdmin || user.isTeacher) && <Route path='/' element={<Navigate to="/users"/>}/>}
            {(user.isAdmin || user.isTeacher) && <Route path='/users' element={<Users/>}/>}

            <Route path="*" element={<Navigate to="/error"/>}/>
            <Route path="/error" element={<Error/>}/>
        </Routes>
    );
};

export default AuthRouter;