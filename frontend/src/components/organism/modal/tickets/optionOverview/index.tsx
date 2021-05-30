import React from 'react';
import styled from 'styled-components';
import Button from '@components/atom/Button';
import {
    StyledOverViewRow,
    StyledOptionOverView,
    StyledOptionControlArea,
} from '@components/organism/modal/tickets/optionOverview/style';

interface Props {
    movieName?: string;
    thumbnail?: JSX.Element;
    runningTime?: JSX.Element;
    theaterName?: string;
    totalPrice?: number;
    isReady: boolean;
}

const OptionOverView = ({
    movieName,
    runningTime,
    thumbnail,
    theaterName,
    totalPrice,
    isReady,
}: Props): JSX.Element => {
    return (
        <StyledOverViewRow>
            <StyledOptionOverView>
                {thumbnail}
                {/* <ThumbnailArea> */}
                {/*    <img src={moviePosterUrl} alt={movieName} loading="lazy" /> */}
                {/*    <ViewGrade viewGrade={movieGrade as MovieGrade} /> */}
                {/* </ThumbnailArea> */}
                <OptionSummary>
                    {/* todo: 옵션 상세정보 표시하기 */}
                    {/* movieName */}
                    {/* runningTime */}
                    {/* theaterName */}
                    {/* totalPrice */}
                </OptionSummary>
            </StyledOptionOverView>
            <StyledOptionControlArea>
                <Button type="pink" disabled={!isReady}>
                    결제하기
                </Button>
                <Button type="default" disabled={!isReady}>
                    포인트결제
                </Button>
            </StyledOptionControlArea>
        </StyledOverViewRow>
    );
};

const ThumbnailArea = styled.div`
    display: block;
    position: relative;
    margin-left: 6px;
    margin-right: 12px;
    max-width: 84px;
    max-height: 120px;
    border: 1px solid ${({ theme }) => theme.smoke80};
    overflow: hidden;
    border-radius: 6px;
    div {
        top: 0;
        right: 0;
    }
    img {
        display: block;
        width: 100%;
        height: 100%;
    }
    @media (max-width: 360px) {
        display: none;
    }
`;

const OptionSummary = styled.div`
    flex: 1 1 auto;
    flex-wrap: nowrap;
    overflow: hidden;
    //p {
    //    white-space: nowrap;
    //    overflow: hidden;
    //    text-overflow: ellipsis;
    //}
`;

export default OptionOverView;
