import React, { ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';

const ShowMobile = ({ children }: { children: ReactNode }): JSX.Element => {
    const isMobile = useMediaQuery({ query: '(max-width:699px)' });
    return <>{isMobile && children}</>;
};

export default ShowMobile;
