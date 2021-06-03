import { MovieGrade } from '@components/molecule/viewGrade/types';

export type SwiperMovieResources = {
    currentTime: number;
    categories: SwiperMovieCategory[];
};

export type SwiperMovieCategory = {
    categoryName: string;
    movies: SwiperMovieInfo[];
};

export type SwiperMovieInfo = {
    movieId: number;
    movieName: string;
    movieGrade: MovieGrade;
    moviePosterUrl: string;
};
