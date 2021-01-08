
import React from "react";
import EditProfile from "./EditProfile";
import Home from "./Home";

const CheckPerson = ({userObj,refreshUser}) => {

    return (
        <>
            {Boolean(userObj.adminSign) ? (
                Boolean(userObj.checkObj) ? <Home userObj={userObj} /> : <EditProfile userObj={userObj} refreshUser={refreshUser} />
            ) : "관리자 승인 기다리는 중..."}
          
        </>
    );
}

export default CheckPerson;