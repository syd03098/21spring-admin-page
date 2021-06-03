import React, { Suspense, useState } from 'react';
import theme from '@utils/theme';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@pages/GlobalStyles';
import ErrorBoundary from '@components/molecule/errorBoundary';
import Routes from '@pages/Routes';
import { ModalStoreProvider as ModalProvider } from '@stores/ModalStore';
import { ToastStoreProvider as ToastProvider } from '@stores/ToastStore';
import { AuthContext } from '@pages/authContext';
import { TicketContext } from '@pages//ticketContext';

const App = (): JSX.Element => {
    const [isLogined, setLogined] = useState<boolean>(false);
    const [ticketCount, setTicketCount] = useState<number>(0);
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Suspense fallback={<div />}>
                <ErrorBoundary>
                    <AuthContext.Provider value={{ logined: isLogined, setLogined }}>
                        <TicketContext.Provider value={{ count: ticketCount, setCount: setTicketCount }}>
                            <ToastProvider>
                                <ModalProvider>
                                    <Routes />
                                </ModalProvider>
                            </ToastProvider>
                        </TicketContext.Provider>
                    </AuthContext.Provider>
                </ErrorBoundary>
            </Suspense>
        </ThemeProvider>
    );
};

export default App;
