import React, { ReactNode } from 'react';
import Theme from '@components/global/Theme';
import GlobalStyles from '@components/global/GlobalStyles';
import { ThemeProvider } from 'styled-components';

interface Props {
    children: ReactNode;
}

export default ({ children }: Props): JSX.Element => {
    return (
        <ThemeProvider theme={Theme}>
            <GlobalStyles />
            {children}
        </ThemeProvider>
    );
};
