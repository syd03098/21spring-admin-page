import React, { lazy } from 'react';
import { ModalStoreProvider as ModalProvider } from '@stores/ModalStore';
import { ToastStoreProvider as ToastProvider } from '@stores/ToastStore';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import ToastList from '@components/molecule/toastList';
import Modal from '@components/organism/modal';
import useEffectOnce from 'react-use/esm/useEffectOnce';
import { fetchCurrentUserInfo } from '@utils/api/userInfo';
import { useAuth } from '@stores/AuthStore';

const entrance = lazy(() => import('@pages/entrance'));
const login = lazy(() => import('@pages/login'));
const profile = lazy(() => import('@pages/Profile'));

const Routes = (): JSX.Element => {
    const { setCurrentUser } = useAuth();

    useEffectOnce(() => {
        fetchCurrentUserInfo()
            .then((res) => {
                setCurrentUser(res);
            })
            .catch((_) => {
                setCurrentUser(null);
            });
    });

    return (
        <Router>
            <ModalProvider>
                <ToastProvider>
                    <Switch>
                        <Route exact path="/" component={entrance} />
                        <Route exact path="/profile" component={profile} />
                        <Route exact path="/login" component={login} />
                        <Route exact path="/create" component={login} />
                    </Switch>
                    <ToastList />
                    <Modal />
                </ToastProvider>
            </ModalProvider>
        </Router>
    );
};

export default Routes;
