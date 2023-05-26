import { Repository } from "typeorm";
import {
  TMovie,
  TMovieUpdateRequest,
} from "../../interfaces/movies.interfaces";
import { Movie } from "../../entities";
import { AppDataSource } from "../../data-source";
import { movieSchema } from "../../schemas/movies.shcemas";

const updateMovieService = async (
  movieId: number,
  movieData: TMovieUpdateRequest
): Promise<TMovie> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie: Movie | null = await movieRepository.findOneBy({
    id: movieId,
  });

  const newMovie: Movie = movieRepository.create({
    ...movie,
    ...movieData,
  });

  await movieRepository.save(newMovie);

  const returnMovie: TMovie = movieSchema.parse(newMovie);

  return returnMovie;
};

export default updateMovieService;
