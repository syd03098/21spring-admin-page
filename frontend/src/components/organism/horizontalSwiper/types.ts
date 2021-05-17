import { MovieGrade } from '@components/molecule/viewGrade/types';

export type BreakPoint = '240' | '320' | '480' | '720' | '960';

export type SwiperMovies = {
    currentTime: number;
    categories: SwiperCategory[];
};

export type SwiperCategory = {
    categoryName: string;
    movies: SwiperMovieInfo[];
};

export type SwiperMovieInfo = {
    movieId: number;
    movieName: string;
    movieGrade: MovieGrade;
    moviePosterUrl: string;
};
