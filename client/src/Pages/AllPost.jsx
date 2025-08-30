import axios from "axios";
import { Edit, LoaderCircle, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { add } from "../store/blogSlice";

export default function AllPost() {
  axios.defaults.baseURL = import.meta.env.VITE_BLOG_URL;
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState();
  const dispatcher = useDispatch();
  const navigator = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await axios.post(
        "get-all-blog",
        {},
        { withCredentials: true }
      );
      if (!data) {
        setLoading(false);
        toast.error("Something went wrong ❌");
        return;
      }
      setBlogs(data.data.data);
      dispatcher(add(data.data.data));
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch blogs ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteBlog = async (_id) => {
    try {
      await axios.post(
        "delete-post",
        { _id },
        {
          withCredentials: true,
        }
      );
      toast.success("Blog deleted ✅");
      fetchData();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting ❌");
    }
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <div className="max-w-3xl mx-auto py-10 px-4">
        <div className="flex justify-between px-3 items-center  ">

        <h1 className="text-2xl font-bold border-b border-gray-300 dark:border-gray-700 pb-4 mb-6">
          My Blogs
        </h1>

        <Link to={'/create-post'} className="text-2xl text-green-400 font-bold border-b border-gray-300 dark:border-gray-700 pb-4 mb-6" > Create Post </Link>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <LoaderCircle className="animate-spin w-8 h-8 text-blue-600" />
          </div>
        ) : (
          <ul className="space-y-4">
            {blogs &&
              blogs.map((blog) => (
                <Link
                  key={blog._id}
                  to={`/blog/${blog._id}`}
                  className="block border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-xl p-4 hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-center">
                    {/* Blog Info */}
                    <div>
                      <h2 className="text-lg font-semibold">{blog.title}</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {blog.date}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          deleteBlog(blog._id);
                        }}
                        className="p-2 rounded-lg cursor-pointer text-red-600 hover:bg-red-100 dark:hover:bg-red-900 transition"
                      >
                        <Trash />
                      </button>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigator(`/edit/${blog._id}`);
                        }}
                        className="p-2 rounded-lg  cursor-pointer text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 transition"
                      >
                        <Edit />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
