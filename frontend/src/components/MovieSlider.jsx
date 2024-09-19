import contentstore from "../store/content.js";
import { useEffect,useState,useRef } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constant";
import { ChevronLeft, ChevronRight } from "lucide-react";
const MovieSlider = ({category}) => {
    const {contentType} = contentstore();
    const [content, setContent] = useState([]);
    const [showeer, setShoweer] = useState(false);
    const ref = useRef(null);
    const formattedCategoryName =
		category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);
	const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";

    useEffect(() => {
		const getContent = async () => {
			const res = await axios.get(`http://localhost:5000/api/v1/${contentType}/${category}`);
			setContent(res.data.content);
		};

		getContent();
	}, [contentType, category]);
    const scrollLeft = () => {
		if (ref.current) {
			ref.current.scrollBy({ left: -ref.current.offsetWidth, behavior: "smooth" });
		}
	};
	const scrollRight = () => {
		ref.current.scrollBy({ left: ref.current.offsetWidth, behavior: "smooth" });
	};

  return (
    <div
			className='bg-black text-white relative px-5 md:px-20'
onMouseEnter={() => setShoweer(true)}
onMouseLeave={() => setShoweer(false)}

		>
          <h2 className='mb-4 text-2xl font-bold'>
				{formattedCategoryName} {formattedContentType}
			</h2>
            
			<div ref={ref} className='flex space-x-4 overflow-x-scroll scrollbar-hide' >
				{content.map((item) => (
					<Link to={`/watch/${item.id}`} className='min-w-[250px] relative group' key={item.id}>
						<div className='rounded-lg overflow-hidden'>
							<img
								src={SMALL_IMG_BASE_URL + item.backdrop_path}
								alt='Movie image'
								className='transition-transform duration-300 ease-in-out group-hover:scale-125'
							/>
						</div>
						<p className='mt-2 text-center'>{item.title || item.name}</p>
					</Link>
				))}
                {showeer && (
				<>
					<button
						className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
            '
						onClick={scrollLeft}
					>
						<ChevronLeft size={24} />
					</button>

					<button
						className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
            '
						onClick={scrollRight}
					>
						<ChevronRight size={24} />
					</button>
				</>
			)}
			</div>

        </div>
  )
}
MovieSlider.propTypes = {
    category: PropTypes.string.isRequired,
  };

export default MovieSlider
