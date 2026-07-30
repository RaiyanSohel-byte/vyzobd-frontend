import FeaturedProducts from "@/components/home/FeaturedProducts";
import HeroSlider from "@/components/home/HeroSlider";
import Newsletter from "@/components/home/NewsLetter";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <HeroSlider />
      <FeaturedProducts />
      <Newsletter />
    </div>
  );
};

export default HomePage;
