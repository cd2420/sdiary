import { makeCreatedTime, totalCountBySector, useStyles,totalCountByTeam,totalCount, timeStampOneDay } from "config/common";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';



const InputLists = () => {

    // const [text, setText] = useState(diaryObj.text.replaceAll(/(<br>|<br\/>|<br \/>)/g, '\r\n'));
    const classes = useStyles();
    const today = makeCreatedTime();

    const [listsArray,setListsArray] = useState([])
    
    const [cal, setCal] = useState(new Date());

    let [teams,setTeams] = useState([])
    let [lists,setLists] = useState({})
    
    const createForLists = (listsArray,date) => {
        
        lists = {}
        teams.map((team)=> {
            lists[team.team] = []
        })

        listsArray.map((list) => {
            if(list.createdAtTimeStamp <= (date + timeStampOneDay)){
                lists[list.team+"팀"].push(list)
            }
        })

        setLists(lists);
    }
   
    const onDateChange = (event) => {
        setCal(event)
        createForLists(listsArray, new Date(event).getTime())
    }

    const callListsAndTeams = () => {
       

        dbService.collection("teams").orderBy("number").onSnapshot((snapshot) => {
            const teamsArray = snapshot.docs.map((doc) => (
                {...doc.data()}
            ));
            teams = teamsArray
            setTeams(teams)
            dbService.collection("lists").orderBy("createdAtTimeStamp","desc").onSnapshot((snapshot) => {
                const listsArray = snapshot.docs.map((doc) => (
                    {
                        id:doc.id,
                        ...doc.data(),
                    }
                ));
                setListsArray(listsArray)
                createForLists(listsArray,today)
            })
        });
    }

    useEffect(
        () => {
            callListsAndTeams()
        }
    , []);

    


    return (
        <>
            <Calendar
                onChange={onDateChange}
                value={cal}
                maxDate = {new Date()}
                className = {classes.calendar}
            />
            
            {
                teams.map((te)=>(
               
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table stickyHeader className={classes.table} aria-label="sticky table">
                    <TableHead>
                        <TableRow >
                            <TableCell >{te.team}</TableCell>
                            <TableCell >인도자</TableCell>
                            <TableCell >열매</TableCell>
                            <TableCell >단계</TableCell>
                            <TableCell >나이</TableCell>
                            <TableCell >사는곳</TableCell>
                            <TableCell >성별</TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lists[te.team] && lists[te.team].map((t) => (
                        <TableRow >
                            <TableCell component="th" scope="row">
                                {t.sector + "구역"}
                            </TableCell>
                            <TableCell>{t.inviteMan}</TableCell>
                            <TableCell>{t.targetMan}</TableCell>
                            <TableCell>{t.step}</TableCell>
                            <TableCell>{t.age}</TableCell>
                            <TableCell>{t.address}</TableCell>
                            <TableCell>{t.gender}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>
                ))
            }
         
        </>
    );
}

export default InputLists;