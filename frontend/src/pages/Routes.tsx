import React, { lazy, useEffect, useLayoutEffect, useState } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import ToastList from '@components/molecule/toastList';
import SharedModal from '@components/organism/modal';
import { fetchCurrentUserInfo } from '@utils/api/auth';
import Layout from '@components/layouts/DefaultLayout';
import { useAuth } from '@pages/authContext';
import useEffectOnce from 'react-use/esm/useEffectOnce';
import Loading from '@pages/Loading';
import { useTickets } from '@pages/ticketContext';
import { getNumberOfTickets } from '@utils/api/ticktes';

const login = lazy(() => import('@pages/login'));
const entrance = lazy(() => import('@pages/entrance'));
const profile = lazy(() => import('@pages/profile'));

const Routes = (): JSX.Element => {
    const [initialized, setInitialized] = useState<boolean>(false);
    const { logined, setLogined } = useAuth();
    const { setCount } = useTickets();

    useEffect(() => {
        if (!logined) return;
        (async () => {
            try {
                const { count: fetchedCount } = await getNumberOfTickets();
                setCount(fetchedCount);
            } catch (e) {
                console.error(e);
            }
        })();
    }, [logined, setCount]);

    useEffectOnce(() => {
        fetchCurrentUserInfo()
            .then((status) => {
                if (status === 200) {
                    setLogined(true);
                }
            })
            .catch((e) => console.error(e))
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
