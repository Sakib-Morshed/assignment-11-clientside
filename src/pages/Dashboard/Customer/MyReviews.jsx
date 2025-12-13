import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [editing, setEditing] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState("");

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["my-reviews", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/my-reviews/${user.email}`);
      return result.data;
    },
  });

  const handleDelete = async (id) => {
    if (!confirm("Delete this review?")) return;
    await axiosSecure.delete(`/reviews/${id}`);
    toast.success("Review deleted !");
    refetch();
  };

  const openEdit = (r) => {
    setEditing(r._id);
    setEditRating(r.rating);
    setEditComment(r.comment);
  };

  const handleUpdate = async () => {
    await axiosSecure.patch(`/reviews/${editing}`, {
      rating: editRating,
      comment: editComment,
    });
    toast.success("Updated!");
    setEditing(null);
    refetch();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        My Reviews
      </h2>

      {reviews.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">You have no reviews yet!</p>
        </div>
      )}

      <div className="space-y-6">
        {reviews.map((r) => (
          <div
            key={r._id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <div className="p-6">
              {editing === r._id ? (
                <div className="space-y-4">
                  <div>
                    <label className="label">
                      <span className="label-text font-medium">
                        Rating (1-5)
                      </span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      className="input input-bordered w-full"
                      value={editRating}
                      onChange={(e) => setEditRating(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="label">
                      <span className="label-text font-medium">Comment</span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered w-full h-32"
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleUpdate}
                      className="btn btn-success flex-1"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditing(null)}
                      className="btn btn-ghost flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="avatar">
                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img
                            src={`https://ui-avatars.com/api/?name=${r.reviewerName}&background=encodeURIComponent}&background=6366f1&color=fff`}
                            alt={r.reviewerName}
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">
                          {r.reviewerName}
                        </h4>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500 text-xl">⭐</span>
                          <span className="font-bold text-lg">
                            {r.rating}.0
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mt-3 leading-relaxed">
                      {r.comment}
                    </p>
                  </div>

                  <div className="flex md:flex-col gap-3">
                    <button
                      onClick={() => openEdit(r)}
                      className="btn btn-outline btn-primary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(r._id)}
                      className="btn btn-outline btn-error"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
