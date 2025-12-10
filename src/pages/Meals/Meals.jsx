import React, { useState } from "react";
import Container from "../../components/Shared/Container";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Card from "../../components/Home/Card";

const Meals = () => {
  const [sortOrder, setSortOrder] = useState("none");
  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/meals`);
      return result.data;
    },
  });

  console.log(meals);
  if (isLoading) return <LoadingSpinner />;

  const sortedItem = () => {
    if (sortOrder === "price-asc") {
      return [...meals].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-dsc") {
      return [...meals].sort((a, b) => b.price - a.price);
    } else {
      return meals;
    }
  };
  return (
    <div>
      <Container>
        <div className="mt-30">
          <h2 className="text-3xl text-center font-semibold text-red-600">
            The Meals Board
          </h2>
          <p className="text-md text-gray-500 truncate my-4 text-center">
            Quick access to your next favorite dish. View all chef-recommended
            specials and order today.
          </p>

            
          <span className="font-semibold text-2xl text-red-600">
            Sorting :{" "}
          </span>
          <label className="form-control w-full max-w-xs">
            <select
              className="select select-bordered text-gray-500 border-black"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="none" className=" text-gray-500">
                Sort by price
              </option>
              <option value="price-asc" className=" text-gray-500">
                Low-to-High
              </option>
              <option value="price-dsc" className=" text-gray-500">
                High-to-Low
              </option>
            </select>
          </label>
          {meals && meals.length > 0 ? (
            <div className="grid grid-cols-3 gap-4 mt-10">
              {sortedItem().map((meal) => (
                <Card key={meal._id} meal={meal} />
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </div>
  );
};

export default Meals;
