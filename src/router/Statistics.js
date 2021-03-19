import { checkAdminSign, makeCreatedTime, totalCountBySector, useStyles,totalCountByTeam,totalCount, timeStampOneDay } from "config/common";
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

const Statistics = ({userObj}) => {

    const classes = useStyles();
    const today = makeCreatedTime();

    const [listsArray,setListsArray] = useState([])
    const [teams,setTeams] = useState([])
    const [cal, setCal] = useState(new Date());

    let [lists,setLists] = useState([])
    let [yesterdayLists,setYesterdayLists] = useState([])
    let [countSector,setCountSector] = useState(totalCountBySector())
    let [countTeam, setCountTeam] = useState(totalCountByTeam())
    let [countTotal,setCountTotal] = useState(totalCount());
    let [countYesterDayTotal,setCountYesterDayTotal] = useState(totalCount())
    
    const createForLists = (listsArray,date) => {
        lists = []
        yesterdayLists = []
        
        listsArray.map((list) => {
            
            if(list.createdAtTimeStamp <= (date + timeStampOneDay)){
                lists.push(list)
            }
            if(list.createdAtTimeStamp <= (date)){
                yesterdayLists.push(list)
            }
        })
        setLists(lists);
        setYesterdayLists(yesterdayLists)
    }
   
    const createForCounts = (teamsArray) => {

        const check = [[1,5,9,13,17],
                               [2,6,10,14,18],
                               [3,7,11,15,19],
                               [4,8,12,16,20]]

        const makeCheckSectorAndCount = (check,list,yesterday = false) => {

            if(!yesterday) { 
              
                let checkSector = 0
                if (check[0].indexOf(parseInt(list.sector)) >= 0) {
                    checkSector = 0
                } else if (check[1].indexOf(parseInt(list.sector)) >= 0){
                    checkSector = 1
                } else if (check[2].indexOf(parseInt(list.sector)) >= 0){
                    checkSector = 2
                } else if (check[3].indexOf(parseInt(list.sector)) >= 0){
                    checkSector = 3
                }
                
                switch (list.step) {
                    case "대상자":
                        countTeam[list.team+"팀"]["count1"] += 1
                        countSector[list.team+"팀"][checkSector][list.sector+"구역"]['count1'] += 1
                        break;
                    case "합당한자":
                        countTeam[list.team+"팀"]["count2"] += 1
                        countSector[list.team+"팀"][checkSector][list.sector+"구역"]['count2'] += 1
                        break;
                    case "복음방":
                        countTeam[list.team+"팀"]["count3"] += 1
                        countSector[list.team+"팀"][checkSector][list.sector+"구역"]['count3'] += 1
                        break;
                    case "센터확정자":
                        countTeam[list.team+"팀"]["count4"] += 1
                        countSector[list.team+"팀"][checkSector][list.sector+"구역"]['count4'] += 1
                        break;
                    default:
                        break;
                }
                countTotal[list.step] += 1
            } else {
                countYesterDayTotal[list.step] += 1
            }
        }

        for(let list of lists){
            makeCheckSectorAndCount(check,list)    
        }

        for(let list of yesterdayLists){
            makeCheckSectorAndCount(check,list,true)
        }

        setTeams(teamsArray)
        setCountSector(countSector);
        setCountTeam(countTeam);
        setCountTotal(countTotal)
        setCountYesterDayTotal(countYesterDayTotal)

    }

    const onDateChange = (event) => {
        setCal(event)
        countSector = totalCountBySector();
        countTeam = totalCountByTeam();
        countTotal = totalCount();
        countYesterDayTotal = totalCount();
        createForLists(listsArray, new Date(event).getTime())
        createForCounts(teams)
    }

    const callListsAndTeams = () => {
        dbService.collection("lists").orderBy("createdAtTimeStamp","desc").onSnapshot((snapshot) => {
            const listsArray = snapshot.docs.map((doc) => (
            {
                id:doc.id,
                ...doc.data(),
            }
            ));
            setListsArray(listsArray)
            createForLists(listsArray,today)
            
            dbService.collection("teams").orderBy("number").onSnapshot((snapshot) => {
                 const teamsArray = snapshot.docs.map((doc) => (
                         {...doc.data()}
                 ));
             
                 createForCounts(teamsArray)
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
                        <TableCell >대</TableCell>
                        <TableCell >합</TableCell>
                        <TableCell >복</TableCell>
                        <TableCell >확</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {countSector[te.team].map((t) => (
                    
                <TableRow >
                    <TableCell component="th" scope="row">
                        {Object.getOwnPropertyNames(t)[0]}
                    </TableCell>
                    <TableCell>{t[Object.getOwnPropertyNames(t)[0]].count1}</TableCell>
                    <TableCell>{t[Object.getOwnPropertyNames(t)[0]].count2}</TableCell>
                    <TableCell>{t[Object.getOwnPropertyNames(t)[0]].count3}</TableCell>
                    <TableCell>{t[Object.getOwnPropertyNames(t)[0]].count4}</TableCell>
                </TableRow>
                ))}
                <TableRow>
                    <TableCell className={classes.tableFont} component="th" scope="row">
                        합계
                    </TableCell>
                    <TableCell className={classes.tableFont}>{countTeam[te.team].count1}</TableCell>
                    <TableCell className={classes.tableFont}>{countTeam[te.team].count2}</TableCell>
                    <TableCell className={classes.tableFont}>{countTeam[te.team].count3}</TableCell>
                    <TableCell className={classes.tableFont}>{countTeam[te.team].count4}</TableCell>
                </TableRow>
                </TableBody>
            </Table>
            </TableContainer>
                    
            ))
            }

            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table} aria-label="caption table">
                <TableHead>
                    <TableRow>
                        <TableCell ></TableCell>
                        <TableCell >대상자</TableCell>
                        <TableCell >합당한자</TableCell>
                        <TableCell >복음방</TableCell>
                        <TableCell >센터확정자</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell className={classes.tableFont} component="th" scope="row">
                            총 합계
                        </TableCell>
                        <TableCell className={classes.tableFont}>{countTotal["대상자"]}</TableCell>
                        <TableCell className={classes.tableFont}>{countTotal["합당한자"]}</TableCell>
                        <TableCell className={classes.tableFont}>{countTotal["복음방"]}</TableCell>
                        <TableCell className={classes.tableFont}>{countTotal["센터확정자"]}</TableCell>
                    </TableRow>
                </TableBody>
                </Table>
            </TableContainer>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table} aria-label="caption table">
                <TableHead>
                    <TableRow>
                        <TableCell >전날대비</TableCell>
                        <TableCell >대상자</TableCell>
                        <TableCell >합당한자</TableCell>
                        <TableCell >복음방</TableCell>
                        <TableCell >센터확정자</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell className={classes.tableFont} component="th" scope="row">
                        </TableCell>
                        <TableCell className={classes.tableFont}>{countTotal["대상자"] - countYesterDayTotal["대상자"] }</TableCell>
                        <TableCell className={classes.tableFont}>{countTotal["합당한자"] - countYesterDayTotal["합당한자"]}</TableCell>
                        <TableCell className={classes.tableFont}>{countTotal["복음방"] - countYesterDayTotal["복음방"]}</TableCell>
                        <TableCell className={classes.tableFont}>{countTotal["센터확정자"] - countYesterDayTotal["센터확정자"]}</TableCell>
                    </TableRow>
                </TableBody>
                </Table>
            </TableContainer>          
        </>
    );
}

export default Statistics