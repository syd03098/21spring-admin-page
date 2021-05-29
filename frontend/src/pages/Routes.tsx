import React, { lazy, useState } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import ToastList from '@components/molecule/toastList';
import SharedModal from '@components/organism/modal';
import { fetchCurrentUserInfo } from '@utils/api/auth';
import Layout from '@components/layouts/DefaultLayout';
import { useAuth } from '@pages/context';
import useEffectOnce from 'react-use/esm/useEffectOnce';
import Loading from '@pages/Loading';

const login = lazy(() => import('@pages/login'));
const entrance = lazy(() => import('@pages/entrance'));
const profile = lazy(() => import('@pages/profile'));

const Routes = (): JSX.Element => {
    const [initialized, setInitialized] = useState<boolean>(false);
    const { setLogined } = useAuth();

    useEffectOnce(() => {
        fetchCurrentUserInfo()
            .then((status) => {
                if (status === 200) {
                    setLogined(true);
                }
            })
            .catch((_) => {})
            .finally(() => setInitialized(true));
    });
    if (!initialized) return <Loading message="Fetching User data..." />;
    return (
        <Router>
            <Switch>
                <Route exact path="/login" component={login} />
                <Route exact path="/create" component={login} />
                <Layout>
                    <Route exact path="/" component={entrance} />
                    <Route exact path="/profile" component={profile} />
                </Layout>
            </Switch>
            <ToastList />
            <SharedModal />
        </Router>
    );
};

export default Routes;
