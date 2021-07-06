import { Switch, Route } from 'react-router-dom';
import React from 'react';

import { ActivitiesView } from './views/activities-view';

export default function App(): JSX.Element {
    return (
        <Switch>
            <Route path="/activities/:type/:id" exact>
                <ActivitiesView />
            </Route>
            <Route path="*">// 404</Route>
        </Switch>
    );
}
