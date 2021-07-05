import { Switch, Route } from 'react-router-dom';
import React from 'react';

export default function App(): JSX.Element {
    return (
        <Switch>
            <Route path="/activities/:type/:id" exact>
                <div data-testid="activities">Activity history placeholder</div>
            </Route>
            <Route path="*">// 404</Route>
        </Switch>
    );
}
