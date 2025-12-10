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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Reviews</h2>

      {reviews.length === 0 && <p>You have no reviews yet!</p>}

      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r._id} className="border p-4 rounded shadow">
            {editing === r._id ? (
              <div>
                <label className="block">Rating</label>
                <input
                  type="number"
                  className="border p-2 w-full mb-2"
                  value={editRating}
                  onChange={(e) => setEditRating(e.target.value)}
                />

                <label className="block">Comment</label>
                <textarea
                  className="border p-2 w-full mb-2"
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                />

                <button
                  onClick={handleUpdate}
                  className="bg-green-600 text-white px-4 py-2 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(null)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold">{r.reviewerName}</p>
                    <p className="text-yellow-500 font-bold">⭐ {r.rating}</p>
                    <p>{r.comment}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(r)}
                      className="bg-green-600 text-white mt-4 px-5 py-2 rounded-lg hover:bg-green-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(r._id)}
                      className=" bg-red-600 text-white rounded-lg hover:bg-red-800 mt-4 px-5 py-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
