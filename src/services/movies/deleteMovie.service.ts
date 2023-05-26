import { Repository } from "typeorm";
import { Movie } from "../../entities/index";
import { AppDataSource } from "../../data-source";

const deleteMovieService = async (movieId: number): Promise<number> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  await movieRepository.delete(movieId);

  return movieId;
};

export default deleteMovieService;
