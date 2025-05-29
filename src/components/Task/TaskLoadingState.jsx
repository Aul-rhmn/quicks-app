import React from "react";
import LoadingSpinner from "../common/LoadingSpinner";

const TaskLoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-10 bg-white">
      <LoadingSpinner />
      <p className="mt-4 text-14px text-primary-gray-medium font-lato">
        Loading Tasks ...
      </p>
    </div>
  );
};

export default TaskLoadingState;
