import React, { useCallback } from 'react';
import styled from 'styled-components';
import HorizontalSwiperThumbnail from '@components/organism/horizontalSwiper/HorizontalSwiperThumbnail';
import { requestMovieInfo } from '@utils/api/movieInfo';
import Information from '@components/organism/modal/information';
import movieInfo from '@utils/jsons/movie_1.json';
import { useModal } from '@stores/ModalStore';

interface Props {
    id: number;
    label: string;
    imgUrl: string;
    grade?: JSX.Element;
}

const HorizontalSwiperSlide = ({ id, label, imgUrl, grade }: Props): JSX.Element => {
    const { appendModal } = useModal();

    const popUpModalInfoHandler = useCallback(async () => {
        return requestMovieInfo(id)
            .then((res) => {
                appendModal(<Information data={res} />, 'both');
            })
            .catch((_) => {
                appendModal(<Information data={movieInfo} />, 'both');
            });
    }, [appendModal, id]);

    const popUpModalTicketsHandler = useCallback(async () => {
        // todo: tickets 모달 띄우기
        console.log('예매하기');
    }, []);

    return (
        <Element>
            <>{grade}</>
            <HorizontalSwiperThumbnail
                imgUrl={imgUrl}
                alt={label}
                popUpModalInfoHandler={popUpModalInfoHandler}
                popUpModalTicketsHandler={popUpModalTicketsHandler}
            />
            <TextArea>
                <p>{label}</p>
            </TextArea>
            <ShowTicketsModalBtn onClick={popUpModalTicketsHandler}>예매하기</ShowTicketsModalBtn>
        </Element>
    );
};

const Element = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
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

const ShowTicketsModalBtn = styled.button`
    display: block;
    width: 72px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.smoke100};
    padding: 6px 8px;
    margin-top: 4px;
    color: ${({ theme }) => theme.black60};
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;

    @media (min-width: 720px) {
        display: none;
    }
`;

export default HorizontalSwiperSlide;
