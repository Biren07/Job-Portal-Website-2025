import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="py-10 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <Carousel className="w-full">
          <CarouselContent>
            {category.map((cat) => (
              <CarouselItem
                key={cat}
                className="
                  basis-[80%] 
                  sm:basis-1/2 
                  md:basis-1/3 
                  lg:basis-1/4 
                  px-2
                "
              >
                <Button
                  onClick={() => searchJobHandler(cat)}
                  variant="outline"
                  className="w-full sm:w-auto rounded-full text-sm sm:text-base"
                >
                  {cat}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default CategoryCarousel;
