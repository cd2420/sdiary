import Diary from "router/Diary";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import EditProfile from "./EditProfile";
import Home from "./Home";

const CheckPerson = ({userObj}) => {

    const [isChecking, setIsChecking] = useState(false);
    const [isinit, setIsinit] = useState(false);
    
    
    useEffect(
        () => {
          if(Boolean(userObj.position) && Boolean(userObj.sector) && Boolean(userObj.username)){
            setIsChecking(true);
          } else {
              setIsChecking(false);
          }
          setIsinit(true);
        }
    ,[]);

    return (
        <>
            {Boolean(userObj.adminSign) ? (
                isChecking ? <Diary userObj={userObj} /> : <EditProfile userObj={userObj} />
            ) : "관리자 승인 기다리는 중..."}
          
        </>
    );
}

export default CheckPerson;