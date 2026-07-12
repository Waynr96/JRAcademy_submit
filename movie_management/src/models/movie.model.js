let movies = [
  {
    id: 1,
    title: "Inception",
    description: "A skilled thief steals secrets from dreams.",
    types: ["Sci-Fi"],
    averageRating: 4.5,
    reviews: [
      { id: 1, content: "Amazing movie!", rating: 5 },
      { id: 2, content: "Great visuals.", rating: 4 },
    ],
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years.",
    types: ["Drama"],
    averageRating: 5,
    reviews: [{ id: 3, content: "A timeless classic.", rating: 5 }],
  },
  {
    id: 3,
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space.",
    types: ["Sci-Fi", "Adventure"],
    averageRating: 0,
    reviews: [],
  },
];

let nextMovieId = 4;
let nextReviewId = 4;

function getAll() {
  return movies;
}

function getById(id) {
  return movies.find((movie) => movie.id === id);
}

function create({ title, description, types }) {
  const movie = {
    id: nextMovieId++,
    title,
    description,
    types,
    averageRating: 0,
    reviews: [],
  };
  movies.push(movie);
  return movie;
}

function updateById(id, { title, description, types }) {
  const movie = getById(id);
  if (!movie) return null;
  if (title) movie.title = title;
  if (description) movie.description = description;
  if (types) movie.types = types;
  return movie;
}

function deleteById(id) {
  const index = movies.findIndex((movie) => movie.id === id);
  if (index === -1) return false;
  movies.splice(index, 1);
  return true;
}

function addReview(movieId, { content, rating }) {
  const movie = getById(movieId);
  if (!movie) return null;
  const review = { id: nextReviewId++, content, rating };
  movie.reviews.push(review);
  movie.averageRating = +(
    movie.reviews.reduce((sum, r) => sum + r.rating, 0) / movie.reviews.length
  ).toFixed(2);
  return review;
}

function getReviews(movieId) {
  const movie = getById(movieId);
  if (!movie) return null;
  return movie.reviews;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  addReview,
  getReviews,
};
