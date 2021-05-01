import React, { ReactNode } from 'react';
import useMedia from 'react-use/lib/useMedia';

const Desktop = ({ children }: { children: ReactNode }): JSX.Element => {
    const isDesktop = useMedia('(min-width:700px)');
    return <>{isDesktop && children}</>;
};

export default Desktop;
