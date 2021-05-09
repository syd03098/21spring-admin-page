import React from 'react';
import styled from 'styled-components';

interface Props {
    label: string;
    imgUrl?: string;
    grade?: JSX.Element;
}

const HorizontalSwiperSlide = ({ label, imgUrl, grade }: Props): JSX.Element => {
    return (
        <SlideElement>
            <>{grade}</>
            <SlideThumbnail src={imgUrl} alt={label} loading="lazy" />
            <SlideTextBox>
                <p>{label}</p>
            </SlideTextBox>
        </SlideElement>
    );
};

const SlideElement = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    flex: 1 0 auto;
    padding: 0 4px;
    cursor: pointer;
`;

const SlideThumbnail = styled.img`
    width: 100%;
    border-radius: 8px;
`;

const SlideTextBox = styled.div`
    margin: 8px 5px 0 0;
    p {
        width: calc(100% - 10px);
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 15px;
        font-weight: 400;
        white-space: normal;
        color: ${({ theme }) => theme.black80};
        margin: 0;
    }
`;

export default HorizontalSwiperSlide;
