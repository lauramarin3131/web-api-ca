import express from 'express';
import asyncHandler from 'express-async-handler';
import {
  getMovies,
  getMovieById,
  getUpcomingMovies,
  getGenres,
} from "../tmdb-api";


const router = express.Router();

// movie routes to be added
router.get('/discover', asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
}));

router.get(
  "/upcoming",
  asyncHandler(async (req, res) => {
    const upcoming = await getUpcomingMovies();
    res.status(200).json(upcoming);
  })
);

router.get(
  "/genres",
  asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
  })
);  

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const movie = await getMovieById(req.params.id);
    res.status(200).json(movie);
  })
);



export default router;
