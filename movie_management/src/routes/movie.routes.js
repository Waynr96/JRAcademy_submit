const express = require("express");
const {
  getAllMovies,
  createMovie,
  getMovieById,
  updateMovieById,
  deleteMovieById,
  createReview,
  getReviews,
} = require("../controllers/movie.controller");
const validateId = require("../middleware/validateId.middleware");

const movieRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         _id: { type: string, example: "65f1c2b8e4b0a1a2b3c4d5e6" }
 *         content: { type: string, example: "Amazing movie!" }
 *         rating: { type: number, example: 5 }
 *     Movie:
 *       type: object
 *       properties:
 *         _id: { type: string, example: "65f1c2b8e4b0a1a2b3c4d5e6" }
 *         title: { type: string, example: "Inception" }
 *         description: { type: string }
 *         types:
 *           type: array
 *           items: { type: string }
 *           example: ["Sci-Fi"]
 *         averageRating: { type: number, example: 4.5 }
 *         reviews:
 *           type: array
 *           items: { $ref: "#/components/schemas/Review" }
 */

/**
 * @swagger
 * /v1/movies:
 *   get:
 *     summary: List movies (keyword search, rating sort, pagination)
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema: { type: string }
 *         description: Search in title and description
 *       - in: query
 *         name: sort
 *         schema: { type: string, enum: [rating, -rating] }
 *         description: rating = ascending, -rating = descending
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: List of movies
 */
movieRouter.get("/", getAllMovies);

/**
 * @swagger
 * /v1/movies:
 *   post:
 *     summary: Create a movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, types]
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               types:
 *                 type: array
 *                 items: { type: string }
 *     responses:
 *       201: { description: Movie created }
 *       400: { description: Validation failed }
 */
movieRouter.post("/", createMovie);

/**
 * @swagger
 * /v1/movies/{id}:
 *   get:
 *     summary: Get a movie by id
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Movie found }
 *       404: { description: Movie not found }
 */
movieRouter.get("/:id", validateId, getMovieById);

/**
 * @swagger
 * /v1/movies/{id}:
 *   put:
 *     summary: Update a movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               types:
 *                 type: array
 *                 items: { type: string }
 *     responses:
 *       200: { description: Movie updated }
 *       400: { description: Validation failed }
 *       404: { description: Movie not found }
 */
movieRouter.put("/:id", validateId, updateMovieById);

/**
 * @swagger
 * /v1/movies/{id}:
 *   delete:
 *     summary: Delete a movie
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Movie deleted }
 *       404: { description: Movie not found }
 */
movieRouter.delete("/:id", validateId, deleteMovieById);

/**
 * @swagger
 * /v1/movies/{id}/reviews:
 *   post:
 *     summary: Add a review to a movie
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content, rating]
 *             properties:
 *               content: { type: string }
 *               rating: { type: number, minimum: 1, maximum: 5 }
 *     responses:
 *       201: { description: Review created }
 *       400: { description: Validation failed }
 *       404: { description: Movie not found }
 */
movieRouter.post("/:id/reviews", validateId, createReview);

/**
 * @swagger
 * /v1/movies/{id}/reviews:
 *   get:
 *     summary: List reviews for a movie
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: List of reviews }
 *       404: { description: Movie not found }
 */
movieRouter.get("/:id/reviews", validateId, getReviews);

module.exports = movieRouter;
