import React, { useEffect, useState, useRef } from "react";
import { Button } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import {useStyles , checkAdminSign, makeCreatedTime } from "config/common";
import InputDto from "../components/InputDto";
import { dbService } from "fbase";


const Update = ({userObj,refreshUser}) => {

    const childRef = useRef();
    const classes = useStyles();
    const [outputs, setOutputs] = useState([]);
    
    useEffect(
      () => {
        dbService.collection("lists").onSnapshot((snapshot) => {
          const listsArray = snapshot.docs.map((doc) => ({
              id:doc.id,
              ...doc.data(),
          }));
          setOutputs(listsArray.filter(list => list.creatorId === userObj.creatorId));
        });
      }
     , []);

    const onSubmit =  async(event) => {
      event.preventDefault();
      console.log(event)
      try{
        const count = outputs.length
        let countcheck = 0
        outputs.map( 
          async(output) => {
            countcheck += 1
            output.targetMan = output.targetMan.slice(0,-1) + "*"
            await dbService.doc(`lists/${output.id}`).update(output);
            if(count === countcheck){
              window.location.reload();
            }
        })
      } catch(e){
        console.log(e)
        alert("수정 실패")
        
      }
    }
    
    const remove = async(event) => {
      const {target : {id}} = event
      if (window.confirm("정말로 삭제하시겠습니까?")) {
        setOutputs(outputs.filter(output => output.id !== id))
        await dbService.doc(`lists/${id}`).delete();
      } else {
        setOutputs(outputs)
      }
    }

    const handleInputs = (data) => {
      outputs.map(output => {
        if(output.id === data.key){
          if(data.hasOwnProperty('inviteMan')){
            output.inviteMan = data.inviteMan
          } else if (data.hasOwnProperty('targetMan')){
            output.targetMan = data.targetMan
          } else if (data.hasOwnProperty('step')) {
            output.step = data.step
          } else if (data.hasOwnProperty('address')) {
            output.address = data.address
          } else if (data.hasOwnProperty('gender')) {
            output.gender = data.gender
          } else if (data.hasOwnProperty('age')) {
            output.age = data.age
          }
        }
      })
    }

    return (
      <>
      <Grid container>
        <form onSubmit={onSubmit} > 
          {
            outputs.map(
              (output) => (
                <Grid item key={output.id} xs className={classes.root} >
                  <InputDto classes={classes} input={output} onInput={handleInputs} update={true} ref={childRef} />
                  
                  <input 
                    type="button"
                    onClick={remove}
                    id = {output.id}
                    className={classes.btn}
                    value="내리기" />
                   
                </Grid>
              )
            )
          }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            수정완료
          </Button>
        </form>
      </Grid>
      
      </>
    );
}

export default Update;