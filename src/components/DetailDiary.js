import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const DetailDiary = ({match}) => {
    
    const {params : {id}} = match;
    const [text, setText] = useState("");

    const getDiary = async () => {
        const diary = await dbService.doc(`diarys/${id}`).get();
        return diary;
    }

    useEffect(
        () => {
            getDiary().then((result) => {
                setText(result.data().text);
            });
        }
    , []);
    

    return (
        <div>
            {text}
        </div>
    );
}

export default DetailDiary;