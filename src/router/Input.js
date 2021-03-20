import React, { useEffect, useState, useRef,useCallback } from "react";
import { Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import {useStyles , makeCreatedTime } from "config/common";
import InputDto from "../components/InputDto";
import { dbService } from "fbase";


const Input = ({userObj,refreshUser}) => {

    const childRef = useRef();

    const [inputs, setInputs] = useState([]);
    const makeObj = (key) => ({
      key:key,
      inviteMan:'',
      targetMan:'',
      step:'',
      username : userObj.username,
      sector : userObj.sector,
      team: userObj.team,
      creatorId : userObj.creatorId,
      address : '',
      gender : '',
      age: 0,
    })

    

    useEffect(
      () => {
        setInputs(inputs.concat([makeObj(1)]));
        
      }
     , []);

    const classes = useStyles();
    
    const keyNum = useRef(2);
    const plus = () => {
      setInputs(inputs.concat([
        makeObj(keyNum.current)
      ]));
      keyNum.current += 1;
    }

    const onSubmit =  useCallback((event) => {
      event.preventDefault();
      try{
        const count = inputs.length
        let countcheck = 0
        const createdAt = makeCreatedTime()
        inputs.map( async(input) => {
          countcheck += 1
          input.createdAt = createdAt
          input.createdAtTimeStamp = Date.now()
          input.targetMan = input.targetMan.slice(0,-1) + "*"
          await dbService.collection("lists").add(input);
          if(count === countcheck){
            alert("등록 완료")
            window.location.reload();
          }
        })
      } catch(e){
        console.log(e)
        alert("등록 실패")
        
      }
    })
    
    const remove = (event) => {
      const {target : {id}} = event
      setInputs(inputs.filter(input => input.key !== parseInt(id)))
    }

    const handleInputs = (data) => {
      inputs.map(input => {
        if(input.key === parseInt(data.key)){
          if(data.hasOwnProperty('inviteMan')){
            input.inviteMan = data.inviteMan
          } else if (data.hasOwnProperty('targetMan')){
            input.targetMan = data.targetMan
          } else if (data.hasOwnProperty('step')) {
            input.step = data.step
          } else if (data.hasOwnProperty('address')) {
            input.address = data.address
          } else if (data.hasOwnProperty('gender')) {
            input.gender = data.gender
          } else if (data.hasOwnProperty('age')) {
            input.age = data.age
          }
        }
      })
    }
    

    return (
      <>
      <Grid container>
        <form autoComplete="off" onSubmit={onSubmit} className={classes.form}>
          { 
            inputs.map((input) => (
              <Grid item key={input.key} xs className={classes.root} >
                <InputDto classes={classes} input={input} onInput={handleInputs} ref={childRef}  />
                { Boolean(input.key !== 1) && 
                  <>
                  <input 
                    type = "button"
                    onClick={remove}
                    id = {input.key}
                    className={classes.margin}
                    value="삭제"
                    />
                </>
                }
              </Grid>
              
            ))
          }
          <Button
          variant="contained"
          color="secondary"
          onClick={plus}
          fullWidth

        >
          +
        </Button>

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

      </Grid>
      </>
    );
}

export default Input;