import { useQuery } from "@tanstack/react-query";
import Container from "../../components/Shared/Container";

import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { Link, useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";

const MealDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  //fetch meals
  const { data: meal = {}, isLoading } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const result = await axiosSecure.get(`/meals/${id}`);
      return result.data;
    },
  });

  //fetch reviews

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const result = await axiosSecure.get(`/reviews/${id}`);
      return result.data;
    },
  });

  const handleSubmitReview = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const newReview = {
      foodId: id,
      reviewerName: user.displayName,
      reviewerImage: user.photoURL,
      reviewerEmail: user.email,
      rating,
      comment,
    };

    await axiosSecure.post("/reviews", newReview);

    toast.success("Review added!");
    setIsOpen(false);
    setRating(5);
    setComment("");

    refetch();
  };

  //Add to favorite list

  const handleFavorite = async () => {
    if (!user) {
      return navigate("/login");
    }

    const fav = {
      userEmail: user.email,
      mealId: meal._id,
      mealName: meal.foodName,
      chefId: meal.chefId,
      chefName: meal.chefName,
      price: meal.price,
    };
    const res = await axiosSecure.post("/favorites", fav);

    if (res.data.message === "Already added") {
      return toast.error("Already in favorites!");
    }
    toast.success("Added to favorites");
  };

  console.log(meal);
  if (isLoading) return <LoadingSpinner />;

  const {
    foodName,
    foodImage,
    chefName,
    price,
    ingredients,
    estimatedDeliveryTime,
    chefExperience,
    chefId,
  } = meal;

  return (
    <Container>
      <div className="max-w-5xl mx-auto p-6 mt-20">
        <div className="flex justify-center items-center">
          <h1 className="text-3xl font-semibold mb-6 mt-6 text-center bg-black/50 text-white py-2 w-60 rounded-md">
            {foodName}
          </h1>
        </div>

        <div className="bg-white shadow-neutral-400 hover:bg-neutral-50 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Food Image */}
          <img
            src={foodImage}
            alt={meal.foodName}
            className="rounded-md w-full h-40 md:h-84 object-cover"
          />

          {/* Right Details */}
          <div className="space-y-3 text-lg">
            <p>
              <span className="font-semibold">Chef:</span> {chefName}
            </p>
            <p>
              <span className="font-semibold">Price:</span> ${price}
            </p>
            <p>
              <span className="font-semibold">Rating:</span> ⭐ {rating}
            </p>

            <p>
              <span className="font-semibold">Ingredients:</span> {ingredients}
            </p>

            <p>
              <span className="font-semibold">Delivery Time:</span>{" "}
              {estimatedDeliveryTime}
            </p>
            <p>
              <span className="font-semibold">Chef Experience:</span>{" "}
              {chefExperience}
            </p>
            <p>
              <span className="font-semibold">Chef Id:</span> {chefId}
            </p>

            {/* Order button */}
            <Link
              to={`/order/${meal._id}`}
              className="inline-block mt-4 bg-red-600 text-white rounded-full hover:bg-red-800 font-semibold px-8 py-3  transition"
            >
              Order Now
            </Link>
          </div>
        </div>
        <button
          onClick={handleFavorite}
          className=" bg-red-600 text-white rounded-lg hover:bg-red-800 mt-4 px-5 py-2"
        >
          Add to Favorite
        </button>

        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 text-white mt-4 ml-3 px-5 py-2 rounded-lg hover:bg-green-700"
        >
          Give Review
        </button>
      </div>

      <div className="mt-10 bg-white rounded-xl p-6 shadow">
        <h3 className="text-2xl font-bold mb-4">Reviews</h3>

        {reviews.length === 0 && <p>No reviews yet!</p>}

        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r._id} className="border rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <img src={r.reviewerImage} className="w-12 h-12 rounded-full" />
                <div>
                  <p className="font-semibold">{r.reviewerName}</p>
                  <p className="text-yellow-500 font-bold">⭐ {r.rating}</p>
                </div>
              </div>
              <p className="mt-2">{r.comment}</p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(r.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Add Review</h3>

            <label className="block font-semibold">Rating ⭐</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />

            <label className="block font-semibold">Comment</label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />

            <div className="flex gap-2">
              <button
                onClick={handleSubmitReview}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Submit
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default MealDetails;
