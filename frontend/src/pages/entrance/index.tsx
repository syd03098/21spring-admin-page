import React from 'react';
import GlobalNavbar from '@components/organism/globalNavbar';
import HorizontalSwiper from '@components/organism/horizontalSwiper';
import styled from 'styled-components';
import Loading from '@pages/Loading';

const Entrance = (): JSX.Element => {
    return (
        <Loading>
            <Layout>
                <GlobalNavbar />
                <HorizontalSwiper />
            </Layout>
        </Loading>
    );
};

const Layout = styled.div`
    @media (min-width: 720px) {
        padding-top: 80px;
        padding-bottom: 60px;
    }
    @media (max-width: 719px) {
        padding-top: 64px;
        padding-bottom: 48px;
    }
`;

export default Entrance;
