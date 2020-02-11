import React from "react";
import NavBar from "./NavBar";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import DataSelection from "../new-activity/Dataselection";
import ActivityList from "../session-management/actvityList";
import LogInBox from "../landing-page/LogInBox";
function Dashboard() {
  return (
    <div>
      <NavBar />
      <BrowserRouter>
      <Switch>
        <Route exact path="/dashboard" component={LogInBox} />
        <Route path="/dashboard/dataselection" component={DataSelection} />
        <Route path="/dashboard/pastactivity" component={ActivityList} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}
export default Dashboard;
