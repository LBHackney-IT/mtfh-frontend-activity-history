import { Switch, Route } from 'react-router-dom';
import React from 'react';

import { ActivitiesTenureView } from './views/activities-tenure-view';
import { ActivitiesPersonView } from './views/activities-person-view';

export default function App(): JSX.Element {
    return (
        <Switch>
            <Route path="/activities/person/:id" exact>
                <ActivitiesPersonView />
            </Route>
            <Route path="/activities/tenure/:id" exact>
                <ActivitiesTenureView />
            </Route>
            <Route path="*">// 404</Route>
        </Switch>
    );
}
