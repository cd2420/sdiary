import React, { useState } from "react";




const Diary = ({diaryObj}) => {

    const [text, setText] = useState(diaryObj.text.replaceAll(/(<br>|<br\/>|<br \/>)/g, '\r\n'));

    const fnChkByte = (txt, len, lastTxt) => {
        if (len == "" || len == null) { // 기본값
            len = 20;
        }

        if (lastTxt == "" || lastTxt == null) { // 기본값
            lastTxt = "...";
        }
        if (txt.length > len) {
            txt = txt.substr(0, len) + lastTxt;
        }
        return (txt);       
    }

    return (
        <>
           <h4>{fnChkByte(text,100)}</h4>
        </>
    );
}

export default Diary;