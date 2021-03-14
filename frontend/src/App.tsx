import React, { Suspense, lazy } from 'react';
import ErrorBoundary from '@components/errorBoundary/index';
import GlobalThemeProvider from '@components/theme';
import { RootStoreProvider } from '@pages/main/services/stores/RootStore';

const MainPage = lazy(() => import('@pages/main'));

const App = (): JSX.Element => {
    return (
        <GlobalThemeProvider>
            <Suspense fallback={<div />}>
                <ErrorBoundary>
                    <RootStoreProvider>
                        <MainPage />
                    </RootStoreProvider>
                </ErrorBoundary>
            </Suspense>
        </GlobalThemeProvider>
    );
};

export default App;
