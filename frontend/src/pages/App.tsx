import React, { Suspense } from 'react';
import ErrorBoundary from '@components/molecule/ErrorBoundary';
import Route from '@pages/Route';
import { Router } from 'react-router-dom';
import GlobalStyles from '@components/atom/GlobalStyles';
import styledTheme from '@pages/Theme';
import { ThemeProvider } from 'styled-components';
import { createBrowserHistory } from 'history';
import { RootStoreProvider } from '@stores/RootStore';

const history = createBrowserHistory();

const App = (): JSX.Element => {
    return (
        <ThemeProvider theme={styledTheme}>
            <GlobalStyles />
            <Suspense fallback={<div />}>
                <ErrorBoundary>
                    <Router history={history}>
                        <RootStoreProvider>
                            <Route />
                        </RootStoreProvider>
                    </Router>
                </ErrorBoundary>
            </Suspense>
        </ThemeProvider>
    );
};

export default App;
