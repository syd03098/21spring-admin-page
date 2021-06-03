import React from 'react';
import styled from 'styled-components';
import HorizontalSwiperRow from '@components/organism/horizontalSwiper/HorizontalSwiperRow';
import Chat from '@components/atom/icons/Chat';
import { flexCenter } from '@utils/styleFunctions';
import { SwiperMovieResources } from '@utils/api/movie/types';
import moment from 'moment/moment';

interface Props {
    resources: SwiperMovieResources;
}

const HorizontalSwiper = ({ resources }: Props): JSX.Element => {
    // todo: store 를 하나 마련하자 entranceInfoStore?
    const { currentTime: fetchedTime, categories } = resources;
    const displayedTime = moment(fetchedTime).format('yy.MM.DD hh:m');

    return (
        <Article>
            {categories.map(
                (category) =>
                    category.movies.length !== 0 && (
                        <Section key={`section-${category.categoryName}`}>
                            <Contents>
                                <TopArea>
                                    <h2>{category.categoryName}</h2>
                                    <p>{displayedTime} 기준</p>
                                </TopArea>
                                <HorizontalSwiperRow movieCategory={category} />
                            </Contents>
                        </Section>
                    ),
            )}
            {categories.length === 0 && (
                <NoMovies>
                    <Chat />
                    <p>등록된 영화가없습니다.</p>
                </NoMovies>
            )}
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
    padding: 0 8px;

    @media (min-width: 480px) {
        padding: 0 10px;
    }

    @media (min-width: 720px) {
        padding: 0 12px;
    }
`;

const TopArea = styled.div`
    padding: 0 5px;

    h2 {
        padding: 16px 0 4px 0;
        margin: 0;
        color: ${({ theme }) => theme.black80};
        letter-spacing: -0.8px;
    }

    p {
        font-size: 12px;
        font-weight: 500;
        color: ${({ theme }) => theme.black60};
        margin: 0;
        padding: 0.5rem 0 0.75rem 0;
    }
`;

const NoMovies = styled.div`
    ${flexCenter};
    flex-direction: column;
    height: calc(100vh - 120px);

    p {
        font-size: 14px;
        font-weight: 500;
        letter-spacing: -0.8px;
    }
`;

export default HorizontalSwiper;
