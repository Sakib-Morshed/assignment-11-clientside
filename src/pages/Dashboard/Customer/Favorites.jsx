import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router";

const Favorites = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: favorites = [], refetch } = useQuery({
    queryKey: ["favorites", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/favorites/${user.email}`);
      return result.data;
    },
  });

  const handleRemove = async (id) => {
    if (!confirm("Remove from Favorites?")) return;

    await axiosSecure.delete(`/favorites/${id}`);
    toast.success("Removed!");
    refetch();
  };

  return (
    <div className="p-4 sm:p-6 bg-white">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        My Favorite Meals
      </h2>

      {favorites.length === 0 && (
        <p className="text-lg text-gray-500 italic">
          No favorite meals added yet.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((f) => (
          <div
            key={f._id}
            className="
                    bg-white 
                    border border-gray-200 
                    rounded-lg 
                    p-4 
                    shadow-md 
                    hover:shadow-lg 
                    transition duration-200
                "
          >
            <p className="font-semibold text-3xl text-gray-700 mb-1 pt-3 text-center">
              {f.mealName}
            </p>
            <p className=" text-gray-500 text-xl">
              <b>Chef: </b>
              <span className="font-semibold text-2xl text-gray-700">
                {f.chefName}
              </span>
            </p>
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold text-green-600 mt-2">
                ${f.price}
              </p>
              <p className="text-lg font-bold  text-gray-600 mt-2">
                {" "}
                {new Date(f.addedTime).toLocaleDateString()}
              </p>
            </div>

            <button
              onClick={() => handleRemove(f._id)}
              className="
                        mt-4 
                        bg-red-500 
                        text-white 
                        text-sm 
                        px-4 py-2 
                        rounded 
                        hover:bg-red-600 
                        transition duration-150
                        ml-42
                    "
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
