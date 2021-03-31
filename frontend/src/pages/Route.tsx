import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const Main = lazy(() => import('@pages/main'));
const Login = lazy(() => import('@pages/login'));

export default (): JSX.Element => {
    return (
        <>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/create" component={Login} />
            </Switch>
        </>
    );
};
