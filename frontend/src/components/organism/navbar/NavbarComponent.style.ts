import styled from 'styled-components';
import FlexBox from '@components/atom/FlexBox';

export const StyledDesktopNavBox = styled(FlexBox)`
    align-items: stretch;
    justify-content: space-between;
    height: 80px;
    box-shadow: inset 0 -1px 0 ${({ theme }) => theme.smoke50};
    padding: 0 10px;
`;

export const StyledMobileNavContainer = styled(FlexBox)`
    align-items: stretch;
    justify-content: space-between;
    height: 60px;
    box-shadow: inset 0 -1px 0 ${({ theme }) => theme.smoke50};
    padding: 0 20px;
`;
