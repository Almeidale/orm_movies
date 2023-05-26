import { z } from "zod";
import {
  movieSchema,
  movieSchemaRequest,
  moviesSchemaResponse,
} from "../schemas/movies.shcemas";
import { DeepPartial } from "typeorm";

type TMovie = z.infer<typeof movieSchema>;
type TMovieRequest = z.infer<typeof movieSchemaRequest>;
type TMoviesResponse = z.infer<typeof moviesSchemaResponse>;
type TMovieUpdateRequest = DeepPartial<TMovieRequest>;

type TMoviesPagination = {
  prevPage: string | null | undefined;
  nextPage: string | null | undefined;
  count: number;
  data: TMoviesResponse;
};

export {
  TMovie,
  TMovieRequest,
  TMoviesResponse,
  TMoviesPagination,
  TMovieUpdateRequest,
};
