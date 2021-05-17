import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { flexCenter } from '@utils/styleFunctions';
import ArrowLeft from '@components/atom/icons/ArrowLeft';
import ArrowRight from '@components/atom/icons/ArrowRight';
import Desktop from '@components/atom/Desktop';

type Direction = 'left' | 'right';

interface Props {
    direction: Direction;
    onClickHandler: MouseEventHandler<HTMLDivElement>;
}

const HorizontalDirectionButton = ({ direction, onClickHandler }: Props): JSX.Element => {
    return (
        <Desktop>
            <ArrowArea className={direction} onClick={onClickHandler}>
                <Sphere>
                    {direction === 'left' && <ArrowLeft size={18} color="#666666" />}
                    {direction === 'right' && <ArrowRight size={18} color="#666666" />}
                </Sphere>
            </ArrowArea>
        </Desktop>
    );
};

const Sphere = styled.div`
    ${flexCenter};
    border-radius: 50%;
    background-color: ${({ theme }) => theme.smoke1};
    box-shadow: rgb(0 0 0 / 20%) 0 0 4px 0;
    border: transparent;
    width: 32px;
    height: 32px;
    cursor: pointer;
`;

const ArrowArea = styled.div`
    ${flexCenter};
    position: absolute;
    height: 100%;
    padding: 0 4px;
    &.left {
        top: 0;
        left: 0;
    }
    &.right {
        top: 0;
        right: 0;
    }
`;

export default HorizontalDirectionButton;
