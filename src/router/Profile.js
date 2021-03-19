import { checkAdminSign } from "config/common";
import React from "react";
import EditProfile from "./EditProfile";

const Profile = ({userObj,refreshUser}) => {


    return (
        <>
        {
                Boolean(userObj.checkObj) ? "Profile" : <EditProfile userObj={userObj} refreshUser={refreshUser} />
        }
        
        </>
    );
}

export default Profile;