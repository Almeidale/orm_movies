import { Router } from "express";
import {
  createMoviesController,
  deleteMovieController,
  listMoviesController,
  updateMovieController,
} from "../controllers/movies.controllers";
import {
  movieSchemaRequest,
  updateMovieSchema,
} from "../schemas/movies.shcemas";
import ensureBodyIsValid from "../middlewares/ensureBodyIsValid.middleware";
import ensureNameExists from "../middlewares/ensureNameExists.middleware";
import ensureIdExists from "../middlewares/ensureIdExists.middleware";

const moviesRoutes: Router = Router();

moviesRoutes.post(
  "",
  ensureNameExists,
  ensureBodyIsValid(movieSchemaRequest),
  createMoviesController
);

moviesRoutes.get("", listMoviesController);

moviesRoutes.patch(
  "/:id",
  ensureIdExists,
  ensureNameExists,
  ensureBodyIsValid(updateMovieSchema),
  updateMovieController
);

moviesRoutes.delete("/:id", ensureIdExists, deleteMovieController);

export default moviesRoutes;
