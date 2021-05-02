import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import FlexBox from '@components/atom/FlexBox';
import SearchIcon from '@components/atom/icons/Search';
import { useToast } from '@stores/ToastStore';
import {
    StyledMovieComponentWrap,
    StyledMovieComponent,
    StyledTabSubTitle,
    StyledMovieSearchContainer,
} from '@components/organism/adminDashboard/Movie.style';
import { useEffectOnce } from 'react-use';

const Movies = (): JSX.Element => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { appendToast } = useToast();

    useEffectOnce(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    });

    return (
        <StyledMovieComponentWrap>
            <StyledMovieComponent>
                <StyledTabSubTitle
                    onClick={(): void => {
                        appendToast('테스트 메세지입니다.', { type: 'error' });
                    }}
                >
                    영화 정보
                </StyledTabSubTitle>
                <StyledMovieSearchContainer>
                    <SearchBarIcon>
                        <SearchIcon />
                    </SearchBarIcon>
                    <MovieSearchInput ref={inputRef} placeholder="Search" />
                </StyledMovieSearchContainer>
                <WhiteSpace />
            </StyledMovieComponent>
        </StyledMovieComponentWrap>
    );
};

const WhiteSpace = styled.div`
    width: 100%;
    margin: 8px 0;
`;

const SearchBarIcon = styled(FlexBox)`
    align-items: center;
    justify-content: center;
    width: 30px;
`;

const MovieSearchInput = styled.input`
    color: ${({ theme }) => theme.black80};
    width: 100%;
    font-size: 15px;
    padding: 0 4px;
    &::placeholder {
        color: ${({ theme }) => theme.black30};
        font-size: 16px;
    }
`;

export default Movies;
