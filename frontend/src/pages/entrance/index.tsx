import React, { useLayoutEffect } from 'react';
import GlobalNavbar from '@components/organism/topNavbar';
import HorizontalSwiper from '@components/organism/horizontalSwiper';

const Entrance = (): JSX.Element => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <GlobalNavbar />
            <HorizontalSwiper />
        </>
    );
};

export default Entrance;
