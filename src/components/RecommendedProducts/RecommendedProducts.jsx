import RecommendedCard from "./RecommendedCard/RecommendedCard";

function RecommendedProducts() {
  return (
    <div className="recommended-wrapper healthy__container section-padding">
      <h2 className="subTitle">Recommended</h2>
      <div className="flex justify-between flex-wrap shrink gap-4 ">
        <RecommendedCard />
        <RecommendedCard />
        <RecommendedCard />
        <RecommendedCard />
      </div>
    </div>
  );
}

export default RecommendedProducts;
