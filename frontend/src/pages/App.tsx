import React, { lazy, Suspense } from 'react';
import { RootStoreProvider } from '@stores/RootStore';
import Theme from '@pages/theme';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@pages/GlobalStyles';
import ToastList from '@components/molecule/ToastList';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ErrorBoundary from '@components/molecule/ErrorBoundary';

const ShowRoom = lazy(() => import('@pages/ShowRoomPage'));
const Login = lazy(() => import('@pages/LoginPage'));

const App = (): JSX.Element => {
    return (
        <>
            <ThemeProvider theme={Theme}>
                <GlobalStyles />
                <Suspense fallback={<div />}>
                    <ErrorBoundary>
                        <BrowserRouter>
                            <RootStoreProvider>
                                <Switch>
                                    <Route exact path="/" component={ShowRoom} />
                                    <Route exact path="/login" component={Login} />
                                </Switch>
                                <ToastList />
                            </RootStoreProvider>
                        </BrowserRouter>
                    </ErrorBoundary>
                </Suspense>
            </ThemeProvider>
        </>
    );
};

export default App;
