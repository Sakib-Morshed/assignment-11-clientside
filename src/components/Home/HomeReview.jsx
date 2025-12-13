import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import { FaRegCalendarAlt, FaStar } from "react-icons/fa";
import Container from "../Shared/Container";

const HomeReview = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/reviews`);
      return result.data;
    },
  });

  return (
    <Container>
      <div className="text-center mt-20">
        <h2 className="text-3xl text-center font-semibold text-red-600">
          What Our Customers Are Saying
        </h2>
        <p className="text-xl text-gray-500 truncate my-4 text-center">
          Real reviews from real food lovers
        </p>
      </div>
      <marquee className='width="60%" direction="right" height="100px scrollamount="18"'>
        <div className="flex gap-4 my-20">
          {reviews.map((r) => (
            <>
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200 md:w-[400px]">
                <div className="card-body p-6">
                  {/* Reviewer Info */}

                  <div className="flex items-center gap-4 mb-4">
                    <div className="avatar">
                      <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={r.reviewerImage} alt={r.reviewerName} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{r.reviewerName}</h3>
                      <div className="flex items-center gap-2 text-sm text-base-400">
                        <FaRegCalendarAlt className="text-xs" />
                        <span>{new Date(r.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-lg ${
                          i < r.rating ? "text-yellow-500" : "text-base-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium text-base-500">
                      ({r.rating}.0)
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-base-600 leading-relaxed italic">
                    "{r.comment}"
                  </p>
                </div>

                {/* Optional subtle quote decoration */}
                <div className="absolute top-4 right-6 opacity-10 text-8xl select-none pointer-events-none">
                  ❝
                </div>
              </div>
            </>
          ))}
        </div>
      </marquee>
    </Container>
  );
};

export default HomeReview;
