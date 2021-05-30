import React, { useMemo } from 'react';
import { StyledDescriptionList, StyledDescription } from '@components/organism/modal/information/style';
import styled from 'styled-components';
import Close from '@components/atom/icons/Close';
import moment from 'moment/moment';
import { MovieInfoResponseBody } from '@utils/api/movieInfo';
import FullModalLayout from '@components/layouts/FullModalLayout';

interface Props {
    data: MovieInfoResponseBody;
}

const Information = ({ data }: Props): JSX.Element => {
    const { movieGen, movieRelease, movieTime, movieDistribute, movieName, movieDescription, directors, actors } = data;

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
                        <dd>{movieTime}</dd>
                    </Description>
                    <Description>
                        <dt>감독</dt>
                        <dd>{directors}</dd>
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
    }, [actors, directors, movieDescription, movieDistribute, movieGen, movieName, movieRelease, movieTime]);

    return <FullModalLayout closeIcon={<Close size={20} />} title="기본정보" contents={descriptionList} />;
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
        white-space: pre-line;
    }
`;

export default Information;
