import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

const ensureIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie = await movieRepository.exist({
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (movie === false) {
    throw new AppError("Movie not found", 404);
  }

  return next();
};

export default ensureIdExists;
