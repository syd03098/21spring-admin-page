import React, { useCallback, useRef, useState, MouseEvent } from 'react';
import styled from 'styled-components';
import { flexCenter, fullDisplay } from '@utils/styleFunctions';
import Button from '@components/atom/Button';
import { useModal } from '@stores/ModalStore';
import Information from '@components/organism/modal/information';

interface Props {
    imgUrl: string;
    alt: string;
}

const HorizontalSwiperThumbnail = ({ imgUrl, alt }: Props): JSX.Element => {
    const [isHovered, setHovered] = useState(false);
    const infoRef = useRef(null);
    const ticketRef = useRef(null);
    const { appendModal } = useModal();

    const openOverlay = useCallback(() => {
        setHovered(true);
    }, []);

    const closeOverlay = useCallback(() => {
        setHovered(false);
    }, []);

    const selectModalHandler = useCallback((e: MouseEvent<HTMLDivElement>) => {
        const { target } = e;
        switch (target) {
            case infoRef.current:
                // todo : information 모달띄우기
                console.log('상세정보');
                break;
            case ticketRef.current:
                // todo: ticket 모달띄우기
                console.log('예매하기');
                break;
            default:
                break;
        }
    }, []);

    return (
        <Container onMouseEnter={openOverlay} onMouseLeave={closeOverlay} onMouseOver={openOverlay}>
            <ThumbnailArea
                onClick={(): void => {
                    appendModal(<Information />, 'both');
                }}
            >
                <Thumbnail src={imgUrl} alt={alt} loading="lazy" />
            </ThumbnailArea>
            {isHovered && (
                <Overlay>
                    <Button ref={ticketRef} type="white" onClick={selectModalHandler}>
                        예매하기
                    </Button>
                    <Button
                        ref={infoRef}
                        type="white"
                        css={`
                            margin-top: 12px;
                        `}
                        onClick={selectModalHandler}
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
