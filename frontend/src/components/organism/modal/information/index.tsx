import React, { useMemo } from 'react';
import { useModal } from '@stores/ModalStore';
import { StyledPreventScroll } from '@utils/styleFunctions';
import {
    StyledModalContainer,
    StyledModalInner,
    StyledModalHeader,
    StyledDescriptionList,
    StyledDescription,
} from '@components/organism/modal/information/style';
import styled from 'styled-components';
import Button from '@components/atom/Button';
import Close from '@components/atom/icons/Close';
import FlexBox from '@components/atom/FlexBox';
import moment from 'moment/moment';
import { MovieInfoResponseBody } from '@utils/api/movieInfo';

interface Props {
    data: MovieInfoResponseBody;
}

const Information = ({ data }: Props): JSX.Element => {
    const { closeModal } = useModal();
    const { movieGen, movieRelease, movieTime, movieDistribute, movieName, movieDescription, director, actors } = data;

    const descriptionList = useMemo(() => {
        return (
            <div style={{ padding: '0 16px' }}>
                <StyledDescriptionList>
                    <Description>
                        <dt>영화명</dt>
                        <dd>{movieName}</dd>
                    </Description>
                    <Description>
                        <dt>개봉일</dt>
                        <dd>{moment(movieRelease).format('Y.MM.DD')}</dd>
                    </Description>
                    <Description>
                        <dt>장르</dt>
                        <dd>{movieGen}</dd>
                    </Description>
                    <Description>
                        <dt>배급사</dt>
                        <dd>{movieDistribute}</dd>
                    </Description>
                    <Description>
                        <dt>상영시간</dt>
                        <dd>{movieTime}분</dd>
                    </Description>
                    <Description>
                        <dt>감독</dt>
                        <dd>{director}</dd>
                    </Description>
                    <DescriptionLineBreak>
                        <dt>출연진</dt>
                        <dd>{actors}</dd>
                    </DescriptionLineBreak>
                    <DescriptionLineBreak>
                        <dt>시놉시스</dt>
                        <dd>{movieDescription}</dd>
                    </DescriptionLineBreak>
                </StyledDescriptionList>
            </div>
        );
    }, [actors, director, movieDescription, movieDistribute, movieGen, movieName, movieRelease, movieTime]);

    return (
        <StyledModalContainer>
            <StyledPreventScroll />
            <StyledModalInner>
                <StyledModalHeader>
                    <FlexBox justify="left">
                        <Button icon={<Close size={20} />} style={{ padding: '8px 0' }} onClick={closeModal} />
                    </FlexBox>
                    <FlexBox justify="left">
                        <h2>기본정보</h2>
                    </FlexBox>
                </StyledModalHeader>
                {descriptionList}
            </StyledModalInner>
        </StyledModalContainer>
    );
};

const Description = styled(StyledDescription)`
    display: flex;
    letter-spacing: -0.8px;
    dd {
        margin: 0 0 0 8px;
    }
`;

const DescriptionLineBreak = styled(StyledDescription)`
    display: block;
    dd {
        margin: 0;
        padding: 12px 0 0 0;
        white-space: normal;
    }
`;

export default Information;
