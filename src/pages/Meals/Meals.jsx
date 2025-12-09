import React from "react";
import Container from "../../components/Shared/Container";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Card from "../../components/Home/Card";

const Meals = () => {
  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/meals`);
      return result.data;
    },
  });

  console.log(meals);
  if (isLoading) return <LoadingSpinner />;
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
          {meals && meals.length > 0 ? (
            <div className="grid grid-cols-3 gap-4 mt-10">
              {meals.map((meal) => (
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
