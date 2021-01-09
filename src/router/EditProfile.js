import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

const EditProfile = ({userObj,refreshUser}) => {
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
        if(sectorNum === null){
            return 0;
        }
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
            
            <Grid item xs={12}>
                <FormLabel component="legend">담당업무</FormLabel>
                <RadioGroup row aria-label="position" name="position" value={newposition} >
                  
                    <FormControlLabel
                    value="(부)구역장"
                    control={<Radio color="primary" />}
                    label="(부)구역장"
                    labelPlacement="start"
                    onChange={onChange} 
                    name="position"
                    required
                    />

                    <FormControlLabel
                    value="구역원"
                    control={<Radio color="primary" />}
                    label="구역원"
                    labelPlacement="start"
                    onChange={onChange} 
                    name="position"
                    required
                    />
                </RadioGroup>
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
        // <>
    //     <form onSubmit={onSubmit}>
    //     <input type="text" placeholder="구역입력 (숫자만)" value={newsector} onChange={onChange} name="sector" required/>
    //     <br />
    //     <input type="text" placeholder="이름입력" value={newusername} onChange={onChange} name="username"  required />
    //     <br />
    //     <span>담당업무: </span>&nbsp;
    //     <label for="position1">(부)구역장</label><input type="radio" value="(부)구역장" id="position1" name="position" onChange={onChange}/>&nbsp;&nbsp;
    //     <label for="position2">구역원</label><input type="radio" value="구역원" id="position2" name="position" onChange={onChange} />
    //     <br />
    //     <input type="submit" value="신청" />
    // </form>
        // </>
    );
}

export default EditProfile;