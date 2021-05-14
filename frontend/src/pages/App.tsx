import React, { Suspense } from 'react';
import theme from '@utils/theme';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@pages/GlobalStyles';
import ErrorBoundary from '@components/molecule/errorBoundary';
import Routes from '@pages/Routes';
import { AuthStoreProvider as AuthProvider } from '@stores/AuthStore';

const App = (): JSX.Element => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Suspense fallback={<div />}>
                <ErrorBoundary>
                    <AuthProvider>
                        <Routes />
                    </AuthProvider>
                </ErrorBoundary>
            </Suspense>
        </ThemeProvider>
    );
};

export default App;
