import React from 'react';
import Button from '@components/atom/Button';
import Close from '@components/atom/icons/Close';
import styled from 'styled-components';
import { fullDisplay } from '@utils/styleFunctions';

interface Props {
    contents: JSX.Element;
    closePopupHandler: () => void;
    headerTitle: string;
}

const SmallPopup = ({ contents, closePopupHandler, headerTitle }: Props): JSX.Element => {
    return (
        <StyledOverLay>
            <StyledPopupContainer>
                <StyledPopupHeader>
                    <h3>{headerTitle}</h3>
                    <Button
                        icon={<Close size={20} />}
                        onClick={closePopupHandler}
                        style={{ padding: '8px 0 8px 12px' }}
                    />
                </StyledPopupHeader>
                <StyledPopupContents>
                    <StyledContentsInner>{contents}</StyledContentsInner>
                </StyledPopupContents>
            </StyledPopupContainer>
        </StyledOverLay>
    );
};

const StyledOverLay = styled.div`
    position: fixed;
    ${fullDisplay};
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(0, 0, 0, 0.4);
`;

const StyledPopupContainer = styled.div`
    position: relative;
    background-color: ${({ theme }) => theme.white};
    border-radius: 8px;
    width: auto;
    overflow: hidden;
`;

const StyledPopupContents = styled.div`
    display: flex;
    position: relative;
    margin: 0 16px;
    align-items: center;
`;

const StyledPopupHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1 1 0;
    height: 52px;
    padding: 0 16px;
    border-bottom: 1px solid ${({ theme }) => theme.smoke80};
    h3 {
        font-size: 18px;
        font-weight: 600;
        letter-spacing: -1.2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

const StyledContentsInner = styled.div`
    flex: 1 1 auto;
    position: relative;
    width: 360px;
    margin: 8px 0 20px 0;
`;

export default SmallPopup;
