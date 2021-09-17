import { Switch, Route } from 'react-router-dom';
import React from 'react';
import { useFeatureToggle } from '@mtfh/common';

import { ActivitiesViewLegacy } from './views/activities-view';
import { ActivitiesTenureView } from './views/activities-tenure-view';
import { ActivitiesPersonView } from './views/activities-person-view';

export default function App(): JSX.Element {
    const tenureActivityHistoryToggle = useFeatureToggle(
        'MMH.TenureActivityHistory'
    );

    return (
        <Switch>
            {tenureActivityHistoryToggle ? (
                <>
                    <Route path="/activities/person/:id" exact>
                        <ActivitiesPersonView />
                    </Route>
                    <Route path="/activities/tenure/:id" exact>
                        <ActivitiesTenureView />
                    </Route>
                </>
            ) : (
                <Route path="/activities/:entityType/:id" exact>
                    <ActivitiesViewLegacy />
                </Route>
            )}
            <Route path="*">// 404</Route>
        </Switch>
    );
}
