import axios from 'axios';

export interface MovieInfoResponseBody {
    movieId: number;
    movieName: string;
    movieGrade: string;
    movieDistribute: string;
    movieRelease: string;
    director: string;
    actors: string;
    movieGen: string;
    movieTime: number;
    moviePosterUrl: string;
    movieDescription: string;
}

export const requestMovieInfo = async (movieId: number): Promise<MovieInfoResponseBody> => {
    return axios.get(`/movies/${movieId}`);
};
