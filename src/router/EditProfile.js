import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const EditProfile = ({userObj}) => {
    const [newsector, setSector] = useState(userObj.sector);
    const [newusername, setUsername] = useState(userObj.username);
    const [newposition, setPosition] = useState(userObj.position);
    const [checkSector, setCheckSector] = useState(false);

    useEffect(
        () => {
            if(isSectorValid(newsector)){
                setCheckSector(true);
            };   
        }
        ,[]
    );

    const onChange = (event) => {
        const {target : {name, value}} = event;
        if(name === "sector") {
            setSector(value);
            if(isSectorValid(value)){
                setCheckSector(true);
            };
        } else if(name ==="username") {
            setUsername(value);
        } else if(name ==="position") {
            setPosition(value);
    
        }
    }

    const isSectorValid = (sectorNum) => {
        var pattern = /^[0-9]*$/;
        return sectorNum.search(pattern) !== -1;
    }


    const onSubmit = async (event) => {
        event.preventDefault();
        if(checkSector){
            await dbService.doc(`users/${userObj.id}`).update({
                sector:newsector,
                username:newusername,
                position:newposition,
            });
        } else {
            alert("구역은 숫자만 가능");
        }
       

        // return ( <CheckPerson userObj={editor} />);
    }
    
    return (
        <>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="구역입력 (숫자만)" value={newsector} onChange={onChange} name="sector" required/>
            <br />
            <input type="text" placeholder="이름입력" value={newusername} onChange={onChange} name="username"  required />
            <br />
            <span>담당업무: </span>&nbsp;
            <label for="position1">(부)구역장</label><input type="radio" value="(부)구역장" id="position1" name="position" onChange={onChange}/>&nbsp;&nbsp;
            <label for="position2">구역원</label><input type="radio" value="구역원" id="position2" name="position" onChange={onChange} />
            <br />
            <input type="submit" value="신청" />
        </form>
        </>
    );
}

export default EditProfile;