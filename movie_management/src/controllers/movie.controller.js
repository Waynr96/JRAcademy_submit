const mongoose = require("mongoose");
const Movie = require("../models/movie.model");
const logger = require("../utils/logger");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getAllMovies = async (req, res) => {
  try {
    let { keyword, sort, page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const filter = {};
    if (keyword) {
      const regex = new RegExp(escapeRegex(keyword), "i");
      filter.$or = [{ title: regex }, { description: regex }];
    }

    let query = Movie.find(filter);

    if (sort === "rating") {
      query = query.sort({ averageRating: 1 });
    } else if (sort === "-rating") {
      query = query.sort({ averageRating: -1 });
    }

    const movies = await query.skip((page - 1) * limit).limit(limit);
    res.json(movies);
  } catch (err) {
    logger.error(`getAllMovies failed: ${err.message}`);
    res.status(500).json({ message: "Failed to fetch movies" });
  }
};

const createMovie = async (req, res) => {
  const { title, description, types } = req.body;
  if (!title || !description || !Array.isArray(types) || types.length === 0) {
    res.status(400).json({
      message: "All fields are required and types must be an non-empty array",
    });
    return;
  }

  try {
    const movie = await Movie.create({ title, description, types });
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getMovieById = async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    res.status(404).json({ message: "Movie not found" });
    return;
  }

  const movie = await Movie.findById(id);
  if (!movie) {
    res.status(404).json({ message: "Movie not found" });
    return;
  }
  res.json(movie);
};

const updateMovieById = async (req, res) => {
  const { id } = req.params;
  const { title, description, types } = req.body;
  if (types !== undefined && !Array.isArray(types)) {
    res.status(400).json({ message: "Types must be an array" });
    return;
  }
  if (!isValidId(id)) {
    res.status(404).json({ message: "Movie not found" });
    return;
  }

  const updates = {};
  if (title) updates.title = title;
  if (description) updates.description = description;
  if (types) updates.types = types;

  try {
    const movie = await Movie.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }
    res.json(movie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteMovieById = async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    res.status(404).json({ message: "Movie not found" });
    return;
  }

  const deleted = await Movie.findByIdAndDelete(id);
  if (!deleted) {
    res.status(404).json({ message: "Movie not found" });
    return;
  }
  res.sendStatus(204);
};

const createReview = async (req, res) => {
  const { id } = req.params;
  const { content, rating } = req.body;
  if (!content || !rating || rating < 1 || rating > 5) {
    res.status(400).json({
      message: "Content is required and rating must be between 1 and 5",
    });
    return;
  }
  if (!isValidId(id)) {
    res.status(404).json({ message: "Movie not found" });
    return;
  }

  const movie = await Movie.findById(id);
  if (!movie) {
    res.status(404).json({ message: "Movie not found" });
    return;
  }

  movie.reviews.push({ content, rating });
  movie.averageRating = +(
    movie.reviews.reduce((sum, r) => sum + r.rating, 0) / movie.reviews.length
  ).toFixed(2);
  await movie.save();

  res.status(201).json(movie.reviews[movie.reviews.length - 1]);
};

const getReviews = async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    res.status(404).json({ message: "Movie not found" });
    return;
  }

  const movie = await Movie.findById(id);
  if (!movie) {
    res.status(404).json({ message: "Movie not found" });
    return;
  }
  res.json(movie.reviews);
};

module.exports = {
  getAllMovies,
  createMovie,
  getMovieById,
  updateMovieById,
  deleteMovieById,
  createReview,
  getReviews,
};
