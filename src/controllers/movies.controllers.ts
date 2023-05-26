import { Request, Response } from "express";
import {
  TMovie,
  TMovieRequest,
  TMovieUpdateRequest,
  TMoviesPagination,
} from "../interfaces/movies.interfaces";
import createMoviesService from "../services/movies/createMovies.service";
import listMoviesService from "../services/movies/listMovies.service";
import updateMovieService from "../services/movies/updateMovie.service";
import deleteMovieService from "../services/movies/deleteMovie.service";

const createMoviesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieData: TMovieRequest = req.body;

  const newMovie = await createMoviesService(movieData);

  return res.status(201).json(newMovie);
};

const listMoviesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const page: any = req.query.page;
  const perPage: any = req.query.perPage;
  const order: any = req.query.order;
  const sort: any = req.query.sort;
  const movies: TMoviesPagination = await listMoviesService(
    page,
    perPage,
    order,
    sort
  );
  return res.json(movies);
};

const updateMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieId: number = parseInt(req.params.id);
  const movieData: TMovieUpdateRequest = req.body;
  const newMovieData: TMovie = await updateMovieService(movieId, movieData);
  return res.json(newMovieData);
};

const deleteMovieController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieId: number = parseInt(req.params.id);
  const deleteMovie = await deleteMovieService(movieId);
  return res.status(204).json();
};

export {
  createMoviesController,
  listMoviesController,
  updateMovieController,
  deleteMovieController,
};
