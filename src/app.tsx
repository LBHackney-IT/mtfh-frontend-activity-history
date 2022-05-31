import React from "react";
import { Route, Switch } from "react-router-dom";

import { ActivitiesPersonView } from "./views/activities-person-view";
import { ActivitiesProcessView } from "./views/activities-process-view";
import { ActivitiesTenureView } from "./views/activities-tenure-view";

export default function App(): JSX.Element {
  return (
    <Switch>
      <Route path="/activities/person/:id" exact>
        <ActivitiesPersonView entityType="person" />
      </Route>
      <Route path="/activities/tenure/:id" exact>
        <ActivitiesTenureView entityType="tenure" />
      </Route>
      <Route path="/activities/process/:processName/:id" exact>
        <ActivitiesProcessView entityType="process" />
      </Route>
      <Route path="*">404</Route>
    </Switch>
  );
}
