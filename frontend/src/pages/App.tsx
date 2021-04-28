import React, { Suspense, lazy } from 'react';
import theme from '@utils/theme';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@pages/GlobalStyles';
import ErrorBoundary from '@components/molecule/ErrorBoundary';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AdminStoreProvider } from '@stores/AdminStore';
import AdminComponent from '@components/organism/admin/AdminComponent';
import { ToastStoreProvider } from '@stores/ToastStore';
import ToastList from '@components/molecule/ToastList';

const entrance = lazy(() => import('@pages/EntranceHallPage'));
const login = lazy(() => import('@pages/loginPage'));
const myProfile = lazy(() => import('@pages/MyProfilePage'));

const App = (): JSX.Element => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Suspense fallback={<div />}>
                <ErrorBoundary>
                    <Router>
                        <ToastStoreProvider>
                            <AdminStoreProvider>
                                <Switch>
                                    <Route exact path="/" component={entrance} />
                                    <Route exact path="/login" component={login} />
                                    <Route exact path="/create" component={login} />
                                    <Route exact path="/profile" component={myProfile} />
                                </Switch>
                                <AdminComponent />
                                <ToastList />
                            </AdminStoreProvider>
                        </ToastStoreProvider>
                    </Router>
                </ErrorBoundary>
            </Suspense>
        </ThemeProvider>
    );
};

export default App;
