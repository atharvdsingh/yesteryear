import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router";
import { ArrowLeft } from "lucide-react";

function Post() {
  const { id } = useParams();
  const blog = useSelector((state) => state.blog.blogData);

  // find the blog by id
  const gg = blog.find((s) => s._id === id);

  if (!gg) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen text-white">
        <h2 className="text-xl font-light">Journal entry not found</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full min-h-screen px-4 py-12">
      <div className="w-full max-w-3xl animate-fade-in-up">
        <Link to="/all-post" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={20} />
          <span className="text-sm">Back to Journals</span>
        </Link>
        
        <article className="prose prose-invert max-w-none">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-playfair text-white mb-4 leading-tight">{gg.title}</h1>

          {/* Date */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-10 font-inter border-b border-white/10 pb-6">
            <time>
              {new Date(gg.createdAt).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
            <span>{gg.userName || "Anonymous"}</span>
          </div>

          {/* Content */}
          <div className="text-lg md:text-xl text-gray-200 font-inter font-light leading-relaxed whitespace-pre-wrap">
            {gg.content}
          </div>
        </article>
      </div>
    </div>
  );
}

export default Post;
