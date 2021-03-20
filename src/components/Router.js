import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import EditProfile from "router/EditProfile";
import Profile from "router/Profile";
import Statistics from "router/Statistics";
import Update from "router/Update";
import DetailDiary from "./DetailDiary";
import Invite from "router/Input";
import InputLists from "router/InputLists";

const AppRouter = ({userObj, refreshUser}) => {

   
    return (
        <Router>
            <Switch>
            { 
                (
                <>
                    <Route exact path="/">
                        {Boolean(userObj.adminSign) ? (
                            Boolean(userObj.checkObj) ? <Invite userObj={userObj} refreshUser={refreshUser} /> : <EditProfile userObj={userObj} refreshUser={refreshUser} />
                        ) : "관리자 승인 기다리는 중..."}
                        
                    </Route>
                    <Route exact path="/profile" >
                        {Boolean(userObj.adminSign) ? (
                            Boolean(userObj.checkObj) ? <Profile userObj={userObj} refreshUser={refreshUser} /> : <EditProfile userObj={userObj} refreshUser={refreshUser} />
                        ) : "관리자 승인 기다리는 중..."}
                        
                    </Route>
                    <Route exact path="/statistics" >
                        {Boolean(userObj.adminSign) ? (
                            Boolean(userObj.checkObj) ? <Statistics userObj={userObj} refreshUser={refreshUser} /> : <EditProfile userObj={userObj} refreshUser={refreshUser} />
                        ) : "관리자 승인 기다리는 중..."}
                        
                    </Route>
                    <Route exact path="/update" >
                        {Boolean(userObj.adminSign) ? (
                            Boolean(userObj.checkObj) ? <Update userObj={userObj} refreshUser={refreshUser} /> : <EditProfile userObj={userObj} refreshUser={refreshUser} />
                        ) : "관리자 승인 기다리는 중..."}
                    </Route>

                    <Route exact path="/lists" >
                        {Boolean(userObj.adminSign) ? (
                            Boolean(userObj.checkObj) ? <InputLists /> : <EditProfile userObj={userObj} refreshUser={refreshUser} />
                        ) : "관리자 승인 기다리는 중..."}
                    </Route>
                    
                    <Route exact path="/detailDiary/:id/:isOwner" component={DetailDiary} />
                </>
                )
               
            }
            </Switch>
        </Router>
    );
}

export default AppRouter;