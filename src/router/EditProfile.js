import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const EditProfile = ({userObj,refreshUser}) => {

    const [newsector, setSector] = useState(userObj.sector);
    const [newusername, setUsername] = useState(userObj.username);
    const [checkSector, setCheckSector] = useState(false);
    let newteam = 0;

    useEffect(
        () => {
            if(isNumberValid(newsector)){
                setCheckSector(true);
            };   
        }
        ,[]
    );

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
          marginTop: theme.spacing(3),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
      }));

    const classes = useStyles();

    const onChange = (event) => {
        const {target : {name, value}} = event;
        if(name === "sector") {
            setSector(value);
            if(isNumberValid(value)){
                setCheckSector(true);
            };
        } else if(name ==="username") {
            setUsername(value);
        } 
    }

    const isNumberValid = (sectorNum) => {
        var pattern = /^[0-9]*$/;
        if(sectorNum === null){
            return 0;
        }
        return sectorNum.search(pattern) !== -1;
    }


    const onSubmit = async (event) => {
        event.preventDefault();
        if (newsector >= 1 && newsector <= 4){
          newteam = 13
        } else if (newsector >= 5 && newsector <= 8){
          newteam = 14
        } else if (newsector >= 9 && newsector <= 12){
          newteam = 15
        } else if (newsector >= 13 && newsector <= 16){
          newteam = 16
        } else if (newsector >= 17 && newsector <= 20){
          newteam = 17
        } 
        if(checkSector){
            await dbService.doc(`users/${userObj.id}`).update({
                sector:newsector,
                username:newusername,
                team:newteam,
            });
           
        } else {
            alert("구역은 숫자만 가능");
        }
       
        refreshUser();
    }
    
    return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="구역입력 (숫자만)"
                name="sector"
                value={newsector}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="username"
                label="이름입력"
                value={newusername}
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            제출
          </Button>
       
        </form>
      
      </div>
    </Container>
    );
}

export default EditProfile;