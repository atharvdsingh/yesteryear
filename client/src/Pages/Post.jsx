import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

function Post() {
  const { id } = useParams();
  const blog = useSelector((state) => state.blog.blogData);

  // find the blog by id
  const gg = blog.find((s) => s._id === id);

  if (!gg) {
    return (
      <div className="flex justify-center items-center  min-h-screen text-white bg-black">
        <h2 className="text-xl font-semibold">Blog not found</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-black text-white p-6 font-poppins">
      <div className="w-full max-w-3xl border border-white p-6 rounded-xl shadow-lg">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-4">{gg.title}</h1>

        {/* Date */}
        <p className="text-sm text-gray-400 mb-6">
  {new Date(gg.createdAt).toLocaleDateString("en-US", {
    weekday: "long", // e.g. Wednesday
    year: "numeric",
    month: "long", // e.g. August
    day: "numeric",
  })}
</p>

        {/* Content */}
        <p className="text-lg leading-relaxed mb-6">{gg.content}</p>

       
      </div>
    </div>
  );
}

export default Post;
