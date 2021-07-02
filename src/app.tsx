import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';

export default function App(): JSX.Element {
    return (
        <div data-testid="activities">
            <Router>
                <Switch>
                    <Route path="/activity-history/:type/:id">
                        <div>Activity history placeholder</div>
                    </Route>
                    <Route path="*">// 404</Route>
                </Switch>
            </Router>
        </div>
    );
}
