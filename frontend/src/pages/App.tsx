import React, { Suspense, lazy } from 'react';
import theme from '@utils/theme';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@components/atom/GlobalStyles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastStoreProvider } from '@stores/ToastStore';
import ToastList from '@components/molecule/toastList';
import ErrorBoundary from '@components/molecule/errorBoundary';

const entrance = lazy(() => import('@pages/EntranceHallPage'));
const login = lazy(() => import('@pages/login'));
const profile = lazy(() => import('@pages/Profile'));

const App = (): JSX.Element => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Suspense fallback={<div />}>
                <ErrorBoundary>
                    <Router>
                        <ToastStoreProvider>
                            <Switch>
                                <Route exact path="/" component={entrance} />
                                <Route exact path="/login" component={login} />
                                <Route exact path="/create" component={login} />
                                <Route exact path="/profile" component={profile} />
                            </Switch>
                            <ToastList />
                        </ToastStoreProvider>
                    </Router>
                </ErrorBoundary>
            </Suspense>
        </ThemeProvider>
    );
};

export default App;
