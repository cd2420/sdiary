import React from "react";
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '14ch',
      },
      
      border: '0.5rem outset',
      borderRadius: 12,
      marginBottom: 15,
      padding: 7,
    },
    tableContainer: {
      marginBottom: 25,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 100,
      marginRight: 10,
    },
    formControlinputLists:{
      margin: theme.spacing(1),
      minWidth: 140,
      marginBottom: 20,
    },
    dateFormControl : {
      margin: theme.spacing(1),
      minWidth: 180,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    button: {
      margin: theme.spacing(1),
    },
    btn: {
      border: 0,
      lineHeight: 2.5,
      padding: theme.spacing(0, 2),
      fontSize: '1rem',
      textAlign: 'center',
      color: '#fff',
      textShadow: '1px 1px 1px #000',
      borderRadius: '10px',
      backgroundColor: 'rgba(220, 0, 0, 1)',
      marginTop:15,
      marginLeft:15
    },
    margin: {
      marginTop: 20,
      width: '50px',
      height: '30px',
    },
    table: {
      minWidth: 650,
      
    },
    form: {
      marginTop: theme.spacing(3),
    },
    tableFont:{
      fontWeight:'bold'
    },
    calendar: {
      marginBottom : 20,
    },
    
}));

// export const checkAdminSign = (userObj) => {
//   if(!userObj.adminSign) {
//     alert("관리자 승인이 필요합니다.")
//     window.location.href="/"
//   }  
// }

export const makeCreatedTime = () => {
  const today = new Date();   
  const year = today.getFullYear(); // 년도
  const month = today.getMonth() + 1;  // 월
  const date = today.getDate();  // 날짜
  const createdAt = year + '/' + month + '/' + date
  return new Date(createdAt).getTime();
}

export const totalCountBySector = () => (
  {
    "13팀" : [
      {"1구역" :{
          "count1": 0,
          "count2": 0,
          "count3": 0,
          "count4": 0,
      }},
      {"2구역" :{
          "count1": 0,
          "count2": 0,
          "count3": 0,
          "count4": 0,
      }},
      {"3구역" :{
          "count1": 0,
          "count2": 0,
          "count3": 0,
          "count4": 0,
      }},
      {"4구역" :{
          "count1": 0,
          "count2": 0,
          "count3": 0,
          "count4": 0,
      }}   
    ],

    "14팀" : [
      {"5구역" :{
          "count1": 0,
          "count2": 0,
          "count3": 0,
          "count4": 0,
      }},
      {"6구역" :{
          "count1": 0,
          "count2": 0,
          "count3": 0,
          "count4": 0,
      }},
      {"7구역" :{
          "count1": 0,
          "count2": 0,
          "count3": 0,
          "count4": 0,
      }},
      {"8구역" :{
          "count1": 0,
          "count2": 0,
          "count3": 0,
          "count4": 0,
      }}   
    ],
    "15팀" : [
      {"9구역" :{
          "count1": 0,
          "count2": 0,
          "count3": 0,
          "count4": 0,
      }},
      {"10구역" :{
          "count1": 0,
          "count2": 0,
          "count3": 0,
          "count4": 0,
      }},
      {"11구역" :{
          "count1": 0,
          "count2": 0,
          "count3": 0,
          "count4": 0,
      }},
      {"12구역" :{
          "count1": 0,
          "count2": 0,
          "count3": 0,
          "count4": 0,
      }}   
    ],
    "16팀" : [
      {"13구역" :{
          "count1": 0,
          "count2": 0,
          "count3": 0,
          "count4": 0,
      }},
      {"14구역" :{
          "count1": 0,
          "count2": 0,
          "count3": 0,
          "count4": 0,
      }},
      {"15구역" :{
          "count1": 0,
          "count2": 0,
          "count3": 0,
          "count4": 0,
      }},
      {"16구역" :{
          "count1": 0,
          "count2": 0,
          "count3": 0,
          "count4": 0,
      }}   
    ],
    "17팀" : [
      {"17구역" :{
          "count1": 0,
          "count2": 0,
          "count3": 0,
          "count4": 0,
      }},
      {"18구역" :{
          "count1": 0,
          "count2": 0,
          "count3": 0,
          "count4": 0,
      }},
      {"19구역" :{
          "count1": 0,
          "count2": 0,
          "count3": 0,
          "count4": 0,
      }},
      {"20구역" :{
          "count1": 0,
          "count2": 0,
          "count3": 0,
          "count4": 0,
      }}   
    ],
  }
)

export const totalCountByTeam = () => (
  {
    "13팀" : {
      "count1":0,
      "count2":0,
      "count3":0,
      "count4":0,
    },
    "14팀" : {
      "count1":0,
      "count2":0,
      "count3":0,
      "count4":0,
    },
    "15팀" : {
      "count1":0,
      "count2":0,
      "count3":0,
      "count4":0,
    },
    "16팀" : {
      "count1":0,
      "count2":0,
      "count3":0,
      "count4":0,
    },
    "17팀" : {
      "count1":0,
      "count2":0,
      "count3":0,
      "count4":0,
    },
  }
)

export const totalCount = () => (
  {
    "대상자" : 0,
    "합당한자" : 0,
    "복음방" : 0,
    "센터확정자" : 0,
  }
)

export const timeStampOneDay = (24*60*60*1000)