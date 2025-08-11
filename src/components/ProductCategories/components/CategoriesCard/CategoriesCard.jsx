import { useNavigate } from "react-router-dom";

function CategoriesCard({ category, image, path }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <div className="flex flex-col items-center group cursor-pointer w-48">
      <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-xl">
        <img
          src={image}
          alt={category}
          className="w-full h-full object-cover transition-all duration-300 group-hover:blur-sm"
        />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
          <button
            onClick={handleClick}
            className="bg-[#008459] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#006f47] transition-colors duration-300"
          >
            View More
          </button>
        </div>
      </div>

      <h3 className="mt-3 text-center text-lg font-semibold text-[#008459]">
        {category}
      </h3>
    </div>
  );
}

export default CategoriesCard;