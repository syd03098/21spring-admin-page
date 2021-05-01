import React, { ReactNode } from 'react';
import useMedia from 'react-use/lib/useMedia';

const Mobile = ({ children }: { children: ReactNode }): JSX.Element => {
    const isMobile = useMedia('(max-width:699px)');
    return <>{isMobile && children}</>;
};

export default Mobile;
