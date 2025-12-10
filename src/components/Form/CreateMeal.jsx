import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";

const CreateMeal = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const mealData = {
        foodName: data.foodName,
        chefName: data.chefName,
        foodImage: data.foodImageURL,
        price: parseFloat(data.price),
        rating: data.rating,
        ingredients: data.ingredients.split(","),
        estimatedDeliveryTime: data.estimatedDeliveryTime,
        chefExperience: data.chefExperience,
        chefId: user?.uid || "",
        userEmail: user?.email || "",
        createdAt: new Date().toISOString(),
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/meals`,
        mealData,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        }
      );

      if (res.data.insertedId) {
        toast.success("Meal Created Successfully!");
        reset();
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to create meal");
    }
  };
  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-10 bg-white rounded-2xl shadow-2xl border border-gray-100">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        🍽️ Add a New Meal
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
      >
        {/* Food Name */}
        <input
          {...register("foodName", { required: true })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 text-gray-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Food Name"
        />

        {/* Chef Name */}
        <input
          {...register("chefName", { required: true })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 text-gray-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Chef Name"
        />

        {/* Price */}
        <input
          {...register("price", { required: true, valueAsNumber: true })}
          type="number"
          step="0.01"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 text-gray-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Price in dollar"
        />
        {/* ratings */}

        <input
          {...register("rating", { required: true, valueAsNumber: true })}
          type="number"
          step="0.01"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 text-gray-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ratings in number"
        />

        {/* Estimated Delivery Time */}
        <input
          {...register("estimatedDeliveryTime", { required: true })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 text-gray-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Estimated Delivery Time in hour  "
        />

        {/* Chef Experience */}
        <input
          {...register("chefExperience", { required: true })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 text-gray-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Chef Experience in year "
        />

        {/* User Email  */}
        <input
          type="email"
          value={user?.email || "User Email"}
          readOnly
          className="w-full px-4 py-3 border border-dashed border-gray-300 rounded-xl shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed"
          placeholder="User Email "
        />

        {/* Food Image URL  */}
        <div className="md:col-span-2">
          <input
            {...register("foodImageURL", { required: true })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 text-gray-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="text"
            placeholder="Food Image URL"
          />
        </div>

        {/* Ingredients */}
        <div className="md:col-span-2">
          <textarea
            {...register("ingredients", { required: true })}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 text-gray-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="Ingredients (comma separated: rice, chicken, spices)"
          ></textarea>
        </div>

        {/* Submit Button  */}
        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold bg-red-500 text-white rounded-xl hover:bg-red-600 shadow-lg transition duration-300 transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            Create Meal
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateMeal;
