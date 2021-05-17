import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { BreakPoint, SwiperCategory } from '@components/organism/horizontalSwiper/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { useCss } from 'react-use';
import HorizontalDirectionButton from '@components/organism/horizontalSwiper/HorizontalDirectionButton';
import HorizontalSwiperSlide from '@components/organism/horizontalSwiper/HorizontalSwiperSlide';
import { debounce } from 'throttle-debounce';
import ViewGrade from '@components/molecule/viewGrade';

interface Props {
    movieCategory: SwiperCategory;
}

interface SwiperInfo {
    isBeginning: boolean;
    isEnd: boolean;
    currentIdx: number;
    currentBreakPoint: string;
}

const HorizontalSwiperRow = ({ movieCategory }: Props): JSX.Element => {
    const [swiperComponent, setSwiperComponent] = useState<SwiperType>();
    const [swiperInfo, setSwiperInfo] = useState<SwiperInfo>();
    const slideCss = useCss({
        display: 'inline-block',
        position: 'relative',
    });
    // todo: useModal 과 연결하여 영화정보, 영화상영정보 띄우기

    const updateSwiperState = useCallback((swiper: SwiperType) => {
        setSwiperComponent(swiper);
        setSwiperInfo({
            isBeginning: swiper.isBeginning,
            isEnd: swiper.isEnd,
            currentIdx: swiper.realIndex,
            currentBreakPoint: swiper.currentBreakpoint,
        });
    }, []);

    const stepWidth = useCallback((width: BreakPoint) => {
        switch (width) {
            case '320':
                return 2;
            case '480':
                return 3;
            case '720':
                return 4;
            case '960':
                return 5;
            default:
                return 1;
        }
    }, []);

    const prevSlideHandler = useCallback(() => {
        if (swiperComponent && swiperInfo) {
            const step = stepWidth(swiperInfo.currentBreakPoint as BreakPoint);
            const nextTo = swiperInfo.currentIdx - step;
            swiperComponent.slideTo(nextTo);
        }
    }, [swiperComponent, swiperInfo, stepWidth]);

    const nextSlideHandler = useCallback(() => {
        if (swiperComponent && swiperInfo) {
            const step = stepWidth(swiperInfo.currentBreakPoint as BreakPoint);
            const nextTo = swiperInfo.currentIdx + step;
            swiperComponent.slideTo(nextTo);
        }
    }, [swiperComponent, swiperInfo, stepWidth]);

    const swiperDirectionButtons = useMemo(
        () => (
            <>
                {swiperInfo && (
                    <>
                        {!swiperInfo.isBeginning && (
                            <HorizontalDirectionButton direction="left" onClickHandler={prevSlideHandler} />
                        )}
                        {!swiperInfo.isEnd && (
                            <HorizontalDirectionButton direction="right" onClickHandler={nextSlideHandler} />
                        )}
                    </>
                )}
            </>
        ),
        [nextSlideHandler, prevSlideHandler, swiperInfo],
    );

    return (
        <>
            <HorizontalContainer
                slidesPerView="auto"
                speed={250}
                onResize={debounce(300, updateSwiperState)}
                onSwiper={updateSwiperState}
                onSlideChange={updateSwiperState}
                breakpoints={{
                    240: {
                        slidesPerView: 1.1,
                        allowTouchMove: true,
                    },
                    360: {
                        slidesPerView: 2.1,
                        allowTouchMove: true,
                    },
                    480: {
                        slidesPerView: 3.1,
                        allowTouchMove: true,
                    },
                    720: {
                        slidesPerView: 4.1,
                        allowTouchMove: false,
                    },
                    960: {
                        slidesPerView: 5.1,
                        allowTouchMove: false,
                    },
                }}
            >
                {movieCategory.movies.map((movie) => (
                    <SwiperSlide key={`slide-${movie.movieId}`} className={slideCss}>
                        <HorizontalSwiperSlide
                            label={movie.movieName}
                            imgUrl={movie.moviePosterUrl}
                            grade={<ViewGrade viewGrade={movie.movieGrade} style={{ top: '5px', right: '8px' }} />}
                        />
                    </SwiperSlide>
                ))}
            </HorizontalContainer>
            {swiperDirectionButtons}
        </>
    );
};

const HorizontalContainer = styled(Swiper)`
    position: relative;
    overflow: hidden;
    white-space: nowrap;
`;

export default HorizontalSwiperRow;
