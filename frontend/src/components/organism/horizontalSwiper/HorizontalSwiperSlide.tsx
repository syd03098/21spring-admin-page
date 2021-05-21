import React from 'react';
import styled from 'styled-components';
import HorizontalSwiperThumbnail from '@components/organism/horizontalSwiper/HorizontalSwiperThumbnail';

interface Props {
    id: number;
    label: string;
    imgUrl: string;
    grade?: JSX.Element;
}

const HorizontalSwiperSlide = ({ id, label, imgUrl, grade }: Props): JSX.Element => {
    return (
        <Element>
            <>{grade}</>
            <HorizontalSwiperThumbnail id={id} imgUrl={imgUrl} alt={label} />
            <TextArea>
                <p>{label}</p>
            </TextArea>
        </Element>
    );
};

const Element = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    flex: 1 0 auto;
    padding: 0 4px;
`;

const TextArea = styled.div`
    margin: 8px 5px 0 0;
    p {
        width: calc(100% - 10px);
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 15px;
        font-weight: 500;
        white-space: normal;
        color: ${({ theme }) => theme.black80};
        letter-spacing: -0.8px;
        margin: 0;
    }
`;

export default HorizontalSwiperSlide;
