import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Parser from 'html-react-parser';

const DetailDiary = ({match}) => {
    
    const {params : {id,isOwner}} = match;
    const [newText, setNewText] = useState("");

    const getDiary = async () => {
        const diary = await dbService.doc(`diarys/${id}`).get();
        return diary;
    }

    useEffect(
        () => {
            getDiary().then((result) => {
                setNewText(result.data().text);
            });
        }
    , []);
    
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

      const onSubmit = async(event) => {
        event.preventDefault();
        await dbService.doc(`diarys/${id}`).update({
            text : newText.replace(/(\n|\r\n)/g, '<br>'),
        });
        window.location.href="/sdiary/#/";
        
    };

    const onChange = (event) => {
        const {target : {value}} = event;
        setNewText(value);
    };

    return (
        <>
        {!isOwner ? 
            (
            <form onSubmit={onSubmit}>
            <TextField
                id="outlined-multiline-static"
                label="수정"
                multiline rows={5}
                defaultValue="Default Value"
                variant="outlined"
                onChange={onChange} 
                value={newText}
                fullWidth
            />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            수정
          </Button>
        </form>

            ) 
            
            :

            ( 
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            
            {Parser(newText)}
            
            </Typography>
          </Container>
        </div>




            // <div>
            //     {newText}
            // </div>
            )   
        }
       </>
    );
}

export default DetailDiary;