import React from "react";

const Welcome = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 mb-8 mt-30 text-center">
      <h1 className="text-3xl font-bold text-red-500">
        Welcome to Your Dashboard
      </h1>
      <p className="text-gray-500 mt-2">
        Manage your meals, orders, and platform activities from one place.
      </p>
    </div>
  );
};

export default Welcome;
