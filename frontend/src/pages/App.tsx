import React, { Suspense, lazy } from 'react';
import { RootStoreProvider } from '@stores/RootStore';
import theme from '@utils/theme';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@components/atom/GlobalStyles';
import ErrorBoundary from '@components/molecule/ErrorBoundary';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const entrance = lazy(() => import('@pages/EntranceHallPage'));
const login = lazy(() => import('@pages/LoginPage'));

const App = (): JSX.Element => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Suspense fallback={<div />}>
                <ErrorBoundary>
                    <Router>
                        <RootStoreProvider>
                            <Switch>
                                <Route exact path="/" component={entrance} />
                                <Route exact path="/login" component={login} />
                            </Switch>
                        </RootStoreProvider>
                    </Router>
                </ErrorBoundary>
            </Suspense>
        </ThemeProvider>
    );
};

export default App;
