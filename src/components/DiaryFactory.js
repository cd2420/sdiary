import React, { useState } from "react";
import { dbService } from "fbase";
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Parser from 'html-react-parser';

const DiaryFactory = ({userObj}) =>{

    const [diary, setDiary] = useState("");

    const onSubmit = async(event) => {
        event.preventDefault();
        const diaryObj = {
            text:  diary.replace(/(\n|\r\n)/g, '<br>'),
            createdAt : Date.now(),
            creatorId : userObj.creatorId,
            sector : userObj.sector,
            creatorName : userObj.username
        }
       
        await dbService.collection("diarys").add(diaryObj);
        setDiary("");
    };

    const onChange = (event) => {
        const {target : {value}} = event;
        setDiary(value);
    };

    const useStyles = makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(1),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
      }));

      const classes = useStyles();
    
    return (
        <form onSubmit={onSubmit}>
            <TextField
                id="outlined-multiline-static"
                label="일기장"
                multiline rows={5}
                defaultValue="Default Value"
                variant="outlined"
                onChange={onChange} 
                value={diary}
                fullWidth
            />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            등록
          </Button>
        </form>
    );
}

export default DiaryFactory;