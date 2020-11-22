const express = require('express');
const MoviesServices = require('../services/movies');
const { moviIdSchema, createMovieSchema, updateMovieSchema } = require('../utils/schemas/movies');
const validationHandler = require('../utils/middleware/validationHandler');
const cacheResponse=require('../utils/cacheResponse');
const {FIVE_MINUTES_IN_SECOND,SIXTY_MINUTES_IN_SECOND}=require('../utils/time');

function moviesApi(app) {
  const router = express.Router(); // creacion del router
  app.use("/api/movies", router); //definimos la ruta de inicio donde utilizará el router

  const moviesServices = new MoviesServices();
  router.get("/", async function (req, res, next) {
    cacheResponse(res,FIVE_MINUTES_IN_SECOND);
    const { tags } = req.query;
    try {
      const movie = await moviesServices.getMovies({ tags });
      // throw new Error('Error getting movies');
      res.status(200).json({
        data: movie,
        message: 'movie retrieved'
      });
    } catch (error) {
      next(error);
    }
  });
  router.get("/:movieId",validationHandler({ movieId: moviIdSchema }, 'params'), async function (req, res, next) {
    cacheResponse(res,SIXTY_MINUTES_IN_SECOND);
    const { movieId } = req.params;
    try {
      const movie = await moviesServices.getMovie({ movieId });
      res.status(200).json({
        data: movie,
        message: 'movie retrieved'
      });
    } catch (error) {
      next(error);
    }
  });
  router.post("/", validationHandler(createMovieSchema), async function (req, res, next) {
    const { body: movie } = req;
    try {
      const createdMovieId = await moviesServices.createMovie({ movie });
      res.status(201).json({
        data: createdMovieId,
        message: 'movie created'
      });
    } catch (error) {
      next(error);
    }
  });
  router.put("/:movieId", validationHandler({ movieId: moviIdSchema }, 'params'), validationHandler(updateMovieSchema), async function (req, res, next) {
    const { movieId } = req.params;
    const { body: movie } = req;
    try {
      const updateMovieId = await moviesServices.updateMovie({
        movieId,
        movie
      });
      res.status(200).json({
        data: updateMovieId,
        message: 'movie update'
      });
    } catch (error) {
      next(error);
    }
  });
  router.delete("/:movieId", validationHandler({ movieId: moviIdSchema }, 'params'), async function (req, res, next) {
    const { movieId } = req.params;
    try {
      const deleteMovieId = await moviesServices.deleteMovie({ movieId });
      res.status(200).json({
        data: deleteMovieId,
        message: 'movie delete'
      });
    } catch (error) {
      next(error);
    }
  });
}
module.exports = moviesApi;

