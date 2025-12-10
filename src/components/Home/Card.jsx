import { Link } from "react-router";

const Card = ({ meal }) => {
  console.log(meal);
  return (
    <div className="w-full sm:w-64 max-w-sm mx-auto p-2 bg-white rounded-xl shadow-lg hover:shadow-amber-500/50 transition-all duration-300 transform hover:-translate-y-1">
      <div className="col-span-1 cursor-pointer group rounded-xl block">
        <div className="flex flex-col gap-3 w-full p-2">
          <div
            className="
          aspect-square
          w-full
          relative
          overflow-hidden
          rounded-lg
          shadow-md
        "
          >
            <img
              className="
            object-cover
            h-full
            w-full
            group-hover:scale-105
            transition-transform duration-500
          "
              src={meal.foodImage}
              alt="Food Image"
            />
            <div
              className="
            absolute
            top-2
            right-2
            bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full
          "
            >
              HOT
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="font-extrabold text-xl text-gray-800 truncate">
              {meal.foodName}
            </div>

            <div className="text-sm text-gray-500 truncate">
              By: {meal.chefName}
            </div>
            <div className="text-sm text-gray-500 truncate">
              id :{meal.chefId}
            </div>

            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center text-sm text-yellow-500">
                <span className="mr-1">⭐</span>
                <span className="font-semibold text-gray-700">
                  {meal.rating}
                </span>
              </div>

              <div className="font-bold text-xl text-red-600">
                {meal.price}$
              </div>
            </div>
          </div>

          <Link
            to={`/meal/${meal._id}`}
            className="
          w-full 
          bg-red-600 text-white font-semibold py-2 rounded-lg 
          hover:bg-red-700 active:bg-red-800 
          transition-colors duration-200
          mt-2 btn
        "
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
