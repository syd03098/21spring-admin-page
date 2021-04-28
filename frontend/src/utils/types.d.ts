type Toast = {
    createdAt: number;
    message: string;
    timeout?: number;
    type: 'success' | 'error' | 'default';
};

type MovieGrade = 'all' | '12' | '15' | '18';

type Movie = {
    id: number;
    movieName: string;
    runningTime: number;
    viewGrade: number;
    director: string;
    actors: string[];
    genre: string[];
    updatedAt: number;
    releaseDate: string;
    description: string;
};
