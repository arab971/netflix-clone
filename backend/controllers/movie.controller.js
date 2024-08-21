import { getMovies } from "../services/movie.js";
import env from "dotenv";
env.config();
export async function getTrendingMovie  (req, res) {
  try {
    const data = await getMovies(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.status(200).json({ success: true, content: randomMovie });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, content: error.message });
  }
};
export async function getTrendingTrailer(req, res) {
	const { id } = req.params;
	try {
		const data = await getMovies(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
		res.json({ success: true, trailers: data.results });
	} catch (error) {
		if (error.message.includes("404")) {
			return res.status(404).send(null);
		}

		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}
export async function getMovieDetails(req, res) {
	const { id } = req.params;
	try {
		const data = await getMovies(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
		res.status(200).json({ success: true, content: data });
	} catch (error) {
		if (error.message.includes("404")) {
			return res.status(404).send(null);
		}

		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}
export async function getSimilarMovies(req, res) {
	const { id } = req.params;
	try {
		const data = await getMovies(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
		res.status(200).json({ success: true, similar: data.results });
	} catch (error) {
	return	res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function getMoviesCategory(req, res) {
	const { category } = req.params;
	try {
		const data = await getMovies(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
		res.status(200).json({ success: true, content: data.results });
    
	} catch (error) {
    console.log(error.message)
		 res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}