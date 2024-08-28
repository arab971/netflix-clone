import { getMovies } from "../services/movie.js";
import User from "../database/Schema.js";
export const searchperson = async (req, res) => {
  const { query } = req.params;
  try {
    const response = await getMovies(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results.length === 0) {
      return res.status(404).send(null);
    }
    await User.findOneAndUpdate(req.userId, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].profile_path,
          title: response.results[0].name,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });
    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("error in serchperson controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const searchtv = async (req, res) => {
  const { query } = req.params;
  try {
    const response = await getMovies(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results.length === 0) {
      return res.status(404).send(null);
    }
    await User.findByIdAndUpdate(req.userId, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].name,
          searchType: "tv",
          createdAt: new Date(),
        },
      },
    });
    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("error in serchtv controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const searchmovie = async (req, res) => {
  const { query } = req.params;
  try {
    const response = await getMovies(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results.length === 0) {
      return res.status(404).send(null);
    }
    await User.findByIdAndUpdate(req.userId, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          image: response.results[0].poster_path,
          title: response.results[0].name,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });
    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.log("error in serchmovie controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const getsearchhistory = async (req, res) => {
  const userId = await req.params.userId;
  try {
    const user = await User.findOne(userId).select(`searchHistory`);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, content: user.searchHistory });
  } catch (error) {
    console.log("error in getsearchhistory controller", error.message);
    res.status(500).json({ success: false, message: "hello" });
  }
};

export async function deletesearchhistory(req, res) {
	let { id } = req.params;

	id = parseInt(id);

	try {
		await User.findOneAndUpdate(req.userId, {
			$pull: {
				searchHistory: { id: id },
			},
		});

		res.status(200).json({ success: true, message: "Item removed from search history" });
	} catch (error) {
		console.log("Error in removeItemFromSearchHistory controller: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}
