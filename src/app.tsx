import React from "react";
import { Route, Switch } from "react-router-dom";

import { ActivitiesPersonView } from "./views/activities-person-view";
import { ActivitiesTenureView } from "./views/activities-tenure-view";

export default function App(): JSX.Element {
  return (
    <Switch>
      <Route path="/activities/person/:id" exact>
        <ActivitiesPersonView />
      </Route>
      <Route path="/activities/tenure/:id" exact>
        <ActivitiesTenureView />
      </Route>
      <Route path="*">404</Route>
    </Switch>
  );
}
