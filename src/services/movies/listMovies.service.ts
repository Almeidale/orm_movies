import { Repository } from "typeorm";
import { Movie } from "../../entities";
import { AppDataSource } from "../../data-source";
import { moviesSchemaResponse } from "../../schemas/movies.shcemas";
import {
  TMoviesPagination,
  TMoviesResponse,
} from "../../interfaces/movies.interfaces";

const listMoviesService = async (
  page: string | undefined,
  perPage: string | undefined,
  order: string | undefined,
  sort: string | undefined
): Promise<TMoviesPagination> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  let numericPage: number = 1;
  let numericPerPage: number = 5;
  let movies: Movie[] | undefined;
  let orderObject = {};
  let prevPageString: string | null = "";
  let nextPageString: string | null = "";

  if (page !== undefined) {
    numericPage = parseInt(page);
    if (numericPage <= 0 || isNaN(numericPage) === true) {
      numericPage = 1;
    }
  }

  if (perPage !== undefined) {
    numericPerPage = parseInt(perPage);

    if (
      numericPerPage > 5 ||
      numericPerPage <= 0 ||
      isNaN(numericPerPage) === true
    ) {
      numericPerPage = 5;
    }
  }

  if (order !== "desc" || order === undefined) {
    order = "asc";
  }

  if (sort === "price") {
    orderObject = {
      price: order,
    };
  } else if (sort === "duration") {
    orderObject = {
      duration: order,
    };
  } else {
    orderObject = {
      id: "asc",
    };
  }

  movies = await movieRepository.find({
    skip: (numericPage - 1) * numericPerPage,
    take: numericPerPage,
    order: orderObject,
  });

  const returnMovies: TMoviesResponse = moviesSchemaResponse.parse(movies);

  const moviesCount = await movieRepository.count();

  const pageCalc = Math.ceil(moviesCount / numericPerPage);

  if (numericPage - 1 <= 0) {
    prevPageString = null;
  } else {
    prevPageString = `http://localhost:3000/movies?page=${
      numericPage - 1
    }&perPage=${numericPerPage}`;
  }

  if (numericPage + 1 > pageCalc) {
    nextPageString = null;
  } else {
    nextPageString = `http://localhost:3000/movies?page=${
      numericPage + 1
    }&perPage=${numericPerPage}`;
  }

  return {
    prevPage: prevPageString,
    nextPage: nextPageString,
    count: moviesCount,
    data: returnMovies,
  };
};

export default listMoviesService;
