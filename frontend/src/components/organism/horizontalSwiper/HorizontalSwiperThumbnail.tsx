import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { flexCenter, fullDisplay } from '@utils/styleFunctions';
import Button from '@components/atom/Button';

interface Props {
    imgUrl: string;
    alt: string;
    popUpModalInfoHandler: () => void;
    popUpModalTicketsHandler: () => void;
}

const HorizontalSwiperThumbnail = ({
    imgUrl,
    alt,
    popUpModalInfoHandler,
    popUpModalTicketsHandler,
}: Props): JSX.Element => {
    const [isHovered, setHovered] = useState(false);
    const openOverlay = useCallback(() => {
        setHovered(true);
    }, []);

    const closeOverlay = useCallback(() => {
        setHovered(false);
    }, []);

    return (
        <Container onMouseEnter={openOverlay} onMouseLeave={closeOverlay} onMouseOver={openOverlay}>
            <ThumbnailArea onClick={popUpModalInfoHandler}>
                <Thumbnail src={imgUrl} alt={alt} loading="lazy" />
            </ThumbnailArea>
            {isHovered && (
                <Overlay>
                    <Button type="white" onClick={popUpModalTicketsHandler}>
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
