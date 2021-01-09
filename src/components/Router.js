import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Auth from "router/Auth";
import CheckPerson from "router/Check";
import Profile from "router/Profile";
import DetailDiary from "./DetailDiary";
import Invite from "./Invite";
import Navigation from "./Navigation";

const AppRouter = ({userObj, refreshUser}) => {

   
    return (
        <Router>
            {/* {isLoggIn && <Navigation isLoggIn={isLoggIn} userObj={userObj} refreshUser={refreshUser} />} */}
            <Switch>
            { 
                (
                <>
                    <Route exact path="/">
                        <CheckPerson userObj={userObj} refreshUser={refreshUser} />
                    </Route>
                    <Route exact path="/profile" >
                        <Profile userObj={userObj} refreshUser={refreshUser} />
                    </Route>
                    <Route exact path="/detailDiary/:id/:isOwner" component={DetailDiary} />
                    <Route exact path="/invite" >
                        <Invite />
                    </Route>
                </>
                )
               
            }
            </Switch>
        </Router>
    );
}

export default AppRouter;