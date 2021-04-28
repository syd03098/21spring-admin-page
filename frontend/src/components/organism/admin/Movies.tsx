import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import FlexBox from '@components/atom/FlexBox';
import SearchIcon from '@components/atom/icons/Search';
import movies from '@utils//mock/movies.json';
import CheckBox from '@components/atom/CheckBox';
import { useToast } from '@stores/ToastStore';
import {
    StyledMovieComponentWrap,
    StyledMovieComponent,
    StyledTabSubTitle,
    StyledMovieSearchContainer,
} from './Movies.style';

const Movies = (): JSX.Element => {
    const [movieArray, setData] = useState<Movie[]>(movies.movies as Movie[]);
    const inputRef = useRef<HTMLInputElement>(null);
    const [page, setPage] = useState(0);
    const { appendToast } = useToast();

    const filteredMovieArray = useMemo(() => {
        return movieArray.filter((movie, num) => num < (page + 1) * 10);
    }, [movieArray, page]);

    useLayoutEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, []);

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
                <WhiteSpace>
                    {/* <StyledMovieListHeader> */}
                    {/*    <CheckBox /> */}
                    {/* </StyledMovieListHeader> */}
                    <StyledUl>
                        {filteredMovieArray.map((movie) => (
                            <StyledElement key={movie.id}>
                                <StyledCheckBox>
                                    <CheckBox />
                                </StyledCheckBox>
                                <StyledElementRowContent>
                                    <span>{movie.movieName}</span>
                                    <div>{new Date(movie.updatedAt).toLocaleTimeString()}</div>
                                </StyledElementRowContent>
                            </StyledElement>
                        ))}
                    </StyledUl>
                    {filteredMovieArray.length < movieArray.length && (
                        <FlexBox justify="center" style={{ fontSize: '14px', margin: '24px 0' }}>
                            <div
                                style={{ cursor: 'pointer' }}
                                onClick={(): void => {
                                    setPage(page + 1);
                                }}
                            >
                                더보기
                            </div>
                        </FlexBox>
                    )}
                </WhiteSpace>
            </StyledMovieComponent>
        </StyledMovieComponentWrap>
    );
};

const StyledMovieListHeader = styled.div`
    padding: 3px 8px;
    border-top: 1px solid ${({ theme }) => theme.smoke50};
    border-bottom: 1px solid ${({ theme }) => theme.smoke50};
`;

const StyledUl = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;

const StyledElement = styled.li`
    display: flex;
    align-items: stretch;
    width: 100%;
    height: 42px;
    border-bottom: 1px solid ${({ theme }) => theme.smoke50};
    font-size: 13px;
    font-weight: 500;

    &:hover {
        background-color: ${({ theme }) => theme.smoke30};
    }
`;

const StyledCheckBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
`;

const StyledElementRowContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
    padding: 0 4px;

    div {
        color: ${({ theme }) => theme.black30};
    }
`;

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
