// const { string } = require('@hapi/joi');
// const joi = require('@hapi/joi');
const {string,number,array}=require('yup');

const moviIdSchema = string().matches(/^[0-9a-fA-F]{24}$/); // validación del id
const moviTitleSchema = string().max(80);
const movieYearSchema = number().min(1888).max(2077);
const movieCoverSchema = string().url();
const movieDescriptionSchema = string().max(300);
const movieDurationSchema = number().min(1).max(300);
const movieContentRatingSchema = string().max(5);
const movieSourceSchema = string().url();
const movieTagsSchema = array(string().max(50));

const createMovieSchema = {
  title: moviTitleSchema.required(),
  year: movieYearSchema.required(),
  cover: movieCoverSchema.required(),
  description: movieDescriptionSchema.required(),
  duration: movieDurationSchema.required(),
  contentRating: movieContentRatingSchema.required(),
  source: movieSourceSchema.required(),
  tags: movieTagsSchema
}
const updateMovieSchema = {
  title: moviTitleSchema,
  year: movieYearSchema,
  cover: movieCoverSchema,
  description: movieDescriptionSchema,
  duration: movieDurationSchema,
  contentRating: movieContentRatingSchema,
  source: movieSourceSchema,
  tags: movieTagsSchema
}

module.exports = {
  moviIdSchema,
  createMovieSchema,
  updateMovieSchema
}