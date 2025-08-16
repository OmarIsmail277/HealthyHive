import { useNavigate } from "react-router-dom";

function CategoriesCard({ category, image, path }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
<div
  className="flex flex-col items-center group cursor-pointer 
             w-full max-w-[220px]"
  onClick={handleClick}
>
  <div className="relative w-28 h-28 sm:w-40 sm:h-40 md:w-44 md:h-44 
                  rounded-full overflow-hidden border border-[#008459]/20 
                  shadow-sm transition-all duration-500 
                  group-hover:shadow-md group-hover:scale-105">
    <img
      src={image}
      alt={category}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#008459]/40 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="absolute bottom-[40%] left-1/2 -translate-x-1/2 
                    opacity-0 group-hover:opacity-100 transition-all duration-500">
      <button className="bg-[#008459] text-white  px-3 py-1.5 rounded-full hidden md:block lg:block xl:block 2xl:block 3xl:block 4xl:block
                         text-xs font-medium hover:bg-[#006f47]">
        View More
      </button>
    </div>
  </div>

  <h3 className="mt-3 text-center text-sm sm:text-base font-semibold 
                 text-[#008459] group-hover:text-[#006f47] transition-colors">
    {category}
  </h3>
</div>

  );
}

export default CategoriesCard;
