import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';

import './root.styles.scss';

export default function Root(): JSX.Element {
    return (
        <Router>
            <Switch>
                <Route path="/activity-history/:type/:id">
                    <div>Activity history placeholder</div>
                </Route>
                <Route path="*">// 404</Route>
            </Switch>
        </Router>
    );
}
