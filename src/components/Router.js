import React from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Auth from "router/Auth";
import CheckPerson from "router/Check";
import Profile from "router/Profile";
import Navigation from "./Navigation";

const AppRouter = ({isLoggIn, userObj}) => {


    return (
        <Router>
            {isLoggIn && <Navigation />}
            <Switch>
            { isLoggIn ? 
                (
                <>
                    <Route exact path="/">
                        <CheckPerson userObj={userObj} />
                    </Route>
                    <Route exact path="/profile">
                        <Profile />
                    </Route>
                    <Redirect from="*" to="/" />
                </>
                )
                :
                (
                <>
                    <Route exact path="/">
                        <Auth />
                    </Route>
                </>
                )           
            }
            </Switch>
        </Router>
    );
}

export default AppRouter;