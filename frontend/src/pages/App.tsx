import React, { Suspense, useState } from 'react';
import theme from '@utils/theme';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@pages/GlobalStyles';
import ErrorBoundary from '@components/molecule/errorBoundary';
import Routes from '@pages/Routes';
import { ModalStoreProvider as ModalProvider } from '@stores/ModalStore';
import { ToastStoreProvider as ToastProvider } from '@stores/ToastStore';
import { AuthContext } from '@pages/context';

const App = (): JSX.Element => {
    const [isLogined, setLogined] = useState<boolean>(false);
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Suspense fallback={<div />}>
                <ErrorBoundary>
                    <AuthContext.Provider value={{ logined: isLogined, setLogined }}>
                        <ToastProvider>
                            <ModalProvider>
                                <Routes />
                            </ModalProvider>
                        </ToastProvider>
                    </AuthContext.Provider>
                </ErrorBoundary>
            </Suspense>
        </ThemeProvider>
    );
};

export default App;
