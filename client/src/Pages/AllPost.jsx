import axios from "axios";
import { Edit, HomeIcon, LoaderCircle, Trash, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
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
        toast.error("Something went wrong");
        return;
      }
      setBlogs(data.data.data);
      dispatcher(add(data.data.data));
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch blogs");
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
      toast.success("Blog deleted");
      fetchData();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting");
    }
  };

  return (
    <div className="min-h-screen w-full px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
          <h1 className="text-3xl md:text-4xl font-playfair text-white">
            My Journals
          </h1>
          <div className="flex items-center gap-4">
            <Link 
              to={'/create-post'} 
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-black bg-white rounded-full hover:bg-gray-200 transition-all"
            > 
              <Plus size={18} />
              <span>Create</span>
            </Link>
            <Link to="/" className="p-2 text-gray-400 hover:text-white transition-colors">
              <HomeIcon size={24}/>
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <LoaderCircle className="animate-spin w-10 h-10 text-white" />
          </div>
        ) : (
          <div className="grid gap-6">
            {blogs && blogs.length > 0 ? (
              blogs.map((blog) => (
                <Link
                  key={blog._id}
                  to={`/blog/${blog._id}`}
                  className="group block border border-white/10 bg-white/5 rounded-2xl p-6 hover:border-white/30 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h2 className="text-xl md:text-2xl font-playfair text-white mb-2 group-hover:underline decoration-white/30 underline-offset-4">
                        {blog.title}
                      </h2>
                      <p className="text-sm text-gray-500 font-inter">
                        {blog.date}
                      </p>
                    </div>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          navigator(`/edit/${blog._id}`);
                        }}
                        className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          deleteBlog(blog._id);
                        }}
                        className="p-2 rounded-full text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
                        title="Delete"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-20 text-gray-500">
                <p>No journals yet. Start writing your story.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
