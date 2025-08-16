// CategoriesCard.jsx
import { useNavigate } from "react-router-dom";

function CategoriesCard({ category, image, path }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <div
      className="flex flex-col items-center group cursor-pointer w-full max-w-[150px] sm:max-w-[180px]"
      onClick={handleClick}
    >
      {/* Image Wrapper */}
      <div className="relative w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] rounded-full overflow-hidden border border-[#008459]/20 shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:scale-105">
        {/* Main Image */}
        <img
          src={image}
          alt={category}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Soft Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#008459]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Button */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <button className="bg-[#008459] text-white px-3 py-1.5 rounded-full text-xs font-medium hover:bg-[#006f47]">
            View More
          </button>
        </div>
      </div>

      {/* Title */}
      <h3 className="mt-3 text-center text-sm sm:text-base font-semibold text-[#008459] group-hover:text-[#006f47] transition-colors">
        {category}
      </h3>
    </div>
  );
}

export default CategoriesCard;
