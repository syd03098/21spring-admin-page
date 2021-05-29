import axios from 'axios';

export interface MovieInfoResponseBody {
    movieId: number;
    movieName: string;
    movieGrade: string;
    movieDistribute: string;
    movieRelease: string;
    directors: string;
    actors: string;
    movieGen: string;
    movieTime: string;
    moviePosterUrl: string;
    movieDescription: string;
}

export const requestMovieInfo = async (movieId: number): Promise<MovieInfoResponseBody> => {
    const response = await axios.get(`/api/movies/${movieId}`);
    return response.data;
};
