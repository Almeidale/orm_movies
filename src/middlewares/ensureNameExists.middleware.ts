import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../error";

const ensureNameExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  if (req.body.name) {
    const movie = await movieRepository.exist({
      where: {
        name: req.body.name,
      },
    });

    if (movie === true) {
      throw new AppError("Movie already exists.", 409);
    }
  }

  return next();
};

export default ensureNameExists;
