
import Invite from "router/Input";
import React from "react";
import EditProfile from "./EditProfile";

const CheckPerson = ({userObj,refreshUser}) => {

    return (
        <>
            {Boolean(userObj.adminSign) ? (
                Boolean(userObj.checkObj) ? <Invite userObj={userObj} refreshUser={refreshUser} /> : <EditProfile userObj={userObj} refreshUser={refreshUser} />
            ) : "관리자 승인 기다리는 중..."}
          
        </>
    );
}

export default CheckPerson;