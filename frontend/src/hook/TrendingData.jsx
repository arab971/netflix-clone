import { useEffect, useState } from "react";
import  useContentStore  from "../store/content.js";
import axios from "axios";

const useGetTrendingContent = () => {
	const [trendingContent, setTrendingContent] = useState(null);
	const { contentType } = useContentStore();

	useEffect(() => {
	 const getTrendingContent = async () => {
      if(contentType==="movie"){
        const res = await axios.get(`http://localhost:5000/api/v1/movie/trending`);
        setTrendingContent(res.data.content);

      }
      if(contentType==="tv"){
        const res = await axios.get(`http://localhost:5000/api/v1/tv/trending`);
        setTrendingContent(res.data.content);
      }
		};

		getTrendingContent();
	}, [contentType]);

	return { trendingContent };
};
export default useGetTrendingContent;