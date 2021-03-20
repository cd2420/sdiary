import React, { useEffect, useState,forwardRef, useImperativeHandle  } from "react";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';

// const InputDto = ({classes, input, onInput, update = false, checks})=> {
const InputDto = forwardRef((props,ref)=> {
  
    const update = props.update
    const input = props.input
    const classes = props.classes
    const onInput = props.onInput
      
    const key = !update ? input.key : input.id;
    const [inviteMan, setInviteMan] = useState(!update ? "" : input.inviteMan);
    const [targetMan, setTargetMan] = useState(!update ? "" : input.targetMan);
    const [step, setStep] = useState(!update ?"대상자" : input.step);
    const [address, setAddress] = useState(!update ?"남구" : input.address);
    const [gender, setGender] = useState(!update ?"남" : input.gender);
    const [age, setAge] = useState(!update ? null:input.age)

    useImperativeHandle(ref, () => ({
      
    }));

    useEffect(
      () => {
        onInput({
          step: step,
          key : key
        });
        onInput({
          address: address,
          key : key
        });
        onInput({
          gender: gender,
          key : key
        });
      }
     , []);
    


    const onChange = (event) => {
        const {target : {name,value}} = event;
        if(name === "inviteMan") {
          setInviteMan(value);
          onInput({
            inviteMan: value,
            key : key
          })
        } else if(name === "targetMan"){
          setTargetMan(value);
          onInput({
            targetMan: value,
            key : key
          })
        } else if(name === "step") {
          setStep(value);
          onInput({
            step : value,
            key : key
          })
        } else if(name === "address") {
          setAddress(value);
          onInput({
            address : value,
            key : key
          })
        } else if(name === "gender") {
          setGender(value);
          onInput({
            gender:value,
            key:key
          })
        } else if(name === "age") {
          setAge(value);
          onInput({
            age:value,
            key:key
          })
        }
        
    }

    

    return (
      <>
          <TextField
            variant="outlined"
            required
            label="인도자"
            rowsMax={1}  
            name="inviteMan"
            value={inviteMan}
            onChange={onChange}
            placeholder="인도자"
          />
          <TextField
            variant="outlined"
            required
            label="열매이름"
            rowsMax={1}  
            name="targetMan"
            value={targetMan}
            onChange={onChange}
            placeholder="열매이름"
          />
          <TextField
            variant="outlined"
            required
            label="나이"
            rowsMax={1}  
            name="age"
            value={age}
            onChange={onChange}
            placeholder="나이"
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">단계</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={step}
              name="step"
              onChange={onChange}
              label="단계"
            >
              <MenuItem value={"대상자"}>대상자</MenuItem>
              <MenuItem value={"합당한자"}>합당한자</MenuItem>
              <MenuItem value={"복음방"}>복음방</MenuItem>
              <MenuItem value={"센터확정자"}>센터확정자</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">주소</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={address}
              name="address"
              onChange={onChange}
              label="주소"
            >
              <MenuItem value={"남구"}>남구</MenuItem>
              <MenuItem value={"중구"}>중구</MenuItem>
              <MenuItem value={"동구"}>동구</MenuItem>
              <MenuItem value={"북구"}>북구</MenuItem>
              <MenuItem value={"울주군"}>울주군</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">성별</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={gender}
              name="gender"
              onChange={onChange}
              label="성별"
            >
              <MenuItem value={"남"}>남</MenuItem>
              <MenuItem value={"여"}>여</MenuItem>
            </Select>
          </FormControl>
    </>
    )

})

export default InputDto
