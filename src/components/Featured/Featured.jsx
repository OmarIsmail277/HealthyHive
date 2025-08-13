export default function FeaturedCards() {
  const cards = [
    {
      id: 1,
      title: "Fresh Organic Salad",
      price: "LE50.00",
      image: "images/bg-pattern.png",
    },
    {
      id: 2,
      title: "Healthy Smoothie",
      price: "LE35.00",
      image: "images/balance_bar_png.png",
    },
    {
      id: 3,
      title: "Whole Grain Bread",
      price: "LE20.00",
      image: "images/balance_bar_png.png",
    },
  ];

  return (
    <div className="healthy__container w-[80%] mx-auto py-10">
      <h2 className="subTitle">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col h-[320px]"
          >
            <figure className="w-[100%] mx-auto flex justify-center items-center ">

            <img
              src={card.image}
              alt={card.title}
              className="w-full h-48 object-contain "
              />
              </figure>
            <div className="flex flex-col justify-between flex-1 p-4">
              <h3 className="text-lg font-semibold mb-4">{card.title}</h3>
              <div className="flex justify-between items-center pt-3 border-t border-gray-200 gap-3">
                <span className="text-green-600 font-bold text-lg whitespace-nowrap">
                  {card.price}
                </span>
                <button className="flex-1 bg-button text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200">
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
