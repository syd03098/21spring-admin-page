import React, { ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';

const ShowDesktop = ({ children }: { children: ReactNode }): JSX.Element => {
    const isDesktop = useMediaQuery({ query: '(min-width:800px)' });
    return <>{isDesktop && children}</>;
};

export default ShowDesktop;
