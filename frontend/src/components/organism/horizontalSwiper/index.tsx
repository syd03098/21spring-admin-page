import React from 'react';
import movieMock from '@utils/jsons/movies.json';
import styled from 'styled-components';
import { SwiperMovies } from '@components/organism/horizontalSwiper/types';
import HorizontalSwiperRow from '@components/organism/horizontalSwiper/HorizontalSwiperRow';

const HorizontalSwiper = (): JSX.Element => {
    // todo: store 를 하나 마련하자 entranceInfoStore?
    const swiperMovies: SwiperMovies = movieMock as SwiperMovies;
    return (
        <Article>
            {swiperMovies.movieSet.map((movieCategory) => (
                <Section key={`section-${movieCategory.categoryId}`}>
                    <Contents>
                        <SectionTopArea>
                            <h2>{movieCategory.categoryName}</h2>
                            <p>{new Date(swiperMovies.currentTime).toLocaleTimeString()} 기준</p>
                        </SectionTopArea>
                        <HorizontalSwiperRow movieCategory={movieCategory} />
                    </Contents>
                </Section>
            ))}
        </Article>
    );
};

const Article = styled.article`
    margin: 0;
    padding: 0;
`;

const Section = styled.section`
    padding: 0;
    margin-bottom: 16px;
    @media (min-width: 720px) {
        margin-bottom: 24px;
    }
    @media (min-width: 960px) {
        margin-bottom: 32px;
    }
`;

const Contents = styled.div`
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
`;

const SectionTopArea = styled.div`
    padding: 0 5px;

    h2 {
        padding: 16px 0 4px 0;
        margin: 0;
        color: ${({ theme }) => theme.black80};
    }

    p {
        font-size: 12px;
        font-weight: 500;
        color: ${({ theme }) => theme.black60};
        margin: 0;
        padding: 0.5rem 0 0.75rem 0;
    }
`;

export default HorizontalSwiper;
