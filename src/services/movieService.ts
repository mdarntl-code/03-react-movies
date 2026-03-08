import axios from "axios";
import type { MovieResponse } from "../types/movie";

const apiClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

interface SearchOptions {
    query: string;
    page?: number;
    language?: string;
}

export const fetchMovies = async ({query, 
    page = 1, 
    language = 'en-US'
}: SearchOptions): Promise<MovieResponse> => {
    const {data} = await apiClient.get<MovieResponse>('/search/movie', {
        params:{
            query,
            include_adult: false,
            language,
            page,
        },
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
        }
    })

    return data;
};
