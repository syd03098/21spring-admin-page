import React from 'react';
import styled from 'styled-components';

const DefaultLayout = styled.div`
    @media (min-width: 720px) {
        padding-top: 80px;
        padding-bottom: 60px;
    }
    @media (max-width: 719px) {
        padding-top: 64px;
        padding-bottom: 48px;
    }
`;

export default DefaultLayout;
