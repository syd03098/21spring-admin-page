import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { flexCenter, fullDisplay } from '@utils/styleFunctions';
import Button from '@components/atom/Button';
import { useModal } from '@stores/ModalStore';
import Information from '@components/organism/modal/information';
import { requestMovieInfo } from '@utils/api/movieInfo';
import { useToast } from '@stores/ToastStore';
import movieInfo from '@utils/jsons/movie_1.json';

interface Props {
    id: number;
    imgUrl: string;
    alt: string;
}

const HorizontalSwiperThumbnail = ({ id, imgUrl, alt }: Props): JSX.Element => {
    const [isHovered, setHovered] = useState(false);
    const { appendModal } = useModal();
    const { appendToast } = useToast();

    const openOverlay = useCallback(() => {
        setHovered(true);
    }, []);

    const closeOverlay = useCallback(() => {
        setHovered(false);
    }, []);

    const popUpModalInfoHandler = useCallback(async () => {
        return requestMovieInfo(id)
            .then((res) => {
                appendModal(<Information data={res} />, 'both');
            })
            .catch((_) => {
                appendModal(<Information data={movieInfo} />, 'both');
            });
    }, [appendModal, id]);

    return (
        <Container onMouseEnter={openOverlay} onMouseLeave={closeOverlay} onMouseOver={openOverlay}>
            <ThumbnailArea onClick={popUpModalInfoHandler}>
                <Thumbnail src={imgUrl} alt={alt} loading="lazy" />
            </ThumbnailArea>
            {isHovered && (
                <Overlay>
                    <Button
                        type="white"
                        onClick={() => {
                            console.log('예매하기');
                        }}
                    >
                        예매하기
                    </Button>
                    <Button
                        type="white"
                        css={`
                            margin-top: 12px;
                        `}
                        onClick={popUpModalInfoHandler}
                    >
                        상세정보
                    </Button>
                </Overlay>
            )}
        </Container>
    );
};

const Container = styled.div`
    position: relative;
    overflow: hidden;
    border-radius: 8px;
`;

const ThumbnailArea = styled.div`
    position: relative;
    border: 1px solid ${({ theme }) => theme.smoke80};
    cursor: pointer;
`;

const Thumbnail = styled.img`
    display: block;
    width: 100%;
    height: 100%;
`;

const Overlay = styled.div`
    ${flexCenter};
    flex-direction: column;
    position: absolute;
    ${fullDisplay};
    background-color: rgb(0, 0, 0, 0.7);
    color: white;

    @media (max-width: 719px) {
        display: none;
    }
`;

export default HorizontalSwiperThumbnail;
