import React, { Suspense, lazy } from 'react';
import ErrorBoundary from '@components/molecule/errorBoundary';
import { RootStoreProvider } from '@stores/RootStore';
import Theme from '@pages/Theme';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@components/atom/GlobalStyles';

const MainPage = lazy(() => import('@pages/main'));

const App = (): JSX.Element => {
    return (
        <ThemeProvider theme={Theme}>
            <GlobalStyles />
            <Suspense fallback={<div />}>
                <ErrorBoundary>
                    <RootStoreProvider>
                        <MainPage />
                    </RootStoreProvider>
                </ErrorBoundary>
            </Suspense>
        </ThemeProvider>
    );
};

export default App;
