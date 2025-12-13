import HeroCarousel from "../../components/HeroCarousel/HeroCarousel";
import HomeMeals from "../../components/Home/HomeMeals";
import HomeReview from "../../components/Home/HomeReview";

const Home = () => {
  return (
    <div>
      <HeroCarousel />
      <HomeMeals />
      <HomeReview />

      {/* More components */}
    </div>
  );
};

export default Home;
