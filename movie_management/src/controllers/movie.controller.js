const movieModel = require("../models/movie.model");

const getAllMovies = (req, res) => {
  let { keyword, sort, page = 1, limit = 10 } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  let filteredMovies = [...movieModel.getAll()];

  if (keyword) {
    filteredMovies = filteredMovies.filter((movie) => {
      const insensitiveTitle = movie.title.toLowerCase();
      const insensitiveDescription = movie.description.toLowerCase();
      const insensitiveKeyword = keyword.toLowerCase();
      return (
        insensitiveTitle.includes(insensitiveKeyword) ||
        insensitiveDescription.includes(insensitiveKeyword)
      );
    });
  }

  if (sort === "rating") {
    filteredMovies.sort((a, b) => a.averageRating - b.averageRating);
  } else if (sort === "-rating") {
    filteredMovies.sort((a, b) => b.averageRating - a.averageRating);
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  filteredMovies = filteredMovies.slice(startIndex, endIndex);

  res.json(filteredMovies);
};

const createMovie = (req, res) => {
  const { title, description, types } = req.body;
  if (!title || !description || !Array.isArray(types) || types.length === 0) {
    res.status(400).json({
      message: "All fields are required and types must be an non-empty array",
    });
    return;
  }

  const movie = movieModel.create({ title, description, types });
  res.status(201).json(movie);
};

const getMovieById = (req, res) => {
  const movie = movieModel.getById(parseInt(req.params.id));
  if (!movie) {
    res.status(404).json({ message: "Movie not found" });
    return;
  }
  res.json(movie);
};

const updateMovieById = (req, res) => {
  const { title, description, types } = req.body;
  if (types !== undefined && !Array.isArray(types)) {
    res.status(400).json({ message: "Types must be an array" });
    return;
  }

  const movie = movieModel.updateById(parseInt(req.params.id), { title, description, types });
  if (!movie) {
    res.status(404).json({ message: "Movie not found" });
    return;
  }
  res.json(movie);
};

const deleteMovieById = (req, res) => {
  const deleted = movieModel.deleteById(parseInt(req.params.id));
  if (!deleted) {
    res.status(404).json({ message: "Movie not found" });
    return;
  }
  res.sendStatus(204);
};

const createReview = (req, res) => {
  const { content, rating } = req.body;
  if (!content || !rating || rating < 1 || rating > 5) {
    res.status(400).json({
      message: "Content is required and rating must be between 1 and 5",
    });
    return;
  }

  const review = movieModel.addReview(parseInt(req.params.id), { content, rating });
  if (!review) {
    res.status(404).json({ message: "Movie not found" });
    return;
  }
  res.status(201).json(review);
};

const getReviews = (req, res) => {
  const reviews = movieModel.getReviews(parseInt(req.params.id));
  if (!reviews) {
    res.status(404).json({ message: "Movie not found" });
    return;
  }
  res.json(reviews);
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
