import axios from "axios";
import {
  CloudSnow,
  Edit,
  LoaderCircle,
  LucideClockFading,
  Trash,
} from "lucide-react";
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
  const data = useSelector((state) => state.blog.blogs);
  const navigator=useNavigate()
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
        toast.error("some thing went wrong");
        return;
      }
      console.log(data.data.data);
      setBlogs(data.data.data);
      dispatcher(add(data.data.data));
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteBlog = async (_id) => {
    try {
      const data = await axios.post(
        "delete-post",
        { _id },
        {
          withCredentials: true,
        }
      );
      fetchData();
    } catch (error) {
      console.log(error);
      toast.error("something wen wrong while deleting the blog");
    }
  };
  // const handleEdit=(_id)=>{
  //   navigator(`/edit/${_id}`)

  // }

  return (
    <div className="flex flex-col w-full font-serif items-center p-6 bg-black text-white min-h-screen">
      <h1 className="text-2xl font-bold border-b-2 border-white pb-2 mb-6">
        My Blog
      </h1>

      {loading ? (
        <LoaderCircle className="text-white animate-spin " />
      ) : (
        <ul className="w-full max-w-3xl space-y-4">
          {" "}
          {/* wider container */}
          {blogs &&
            blogs.map((blog) => (
              <Link
                key={blog._id}
                className="border flex justify-between items-center border-white p-4 rounded-xl"
                to={`/blog/${blog._id}`}
              >
                <div className="flex flex-col">
                  <div className="text-xl font-semibold">{blog.title}</div>
                  <div className="text-sm text-gray-400">{blog.date}</div>{" "}
                  {/* showing date instead of content */}
                </div>
                <div>
                  <button
                    onClick={(e) => {
                      e.preventDefault(),
                        e.stopPropagation(),
                        deleteBlog(blog._id);
                    }}
                    className="text-red-600 px-3 py-2 rounded-lg hover:text-red-700 cursor-pointer"
                  >
                    <Trash />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault(), e.stopPropagation(),navigator(`/edit/${blog._id}`)
                      // handleEdit(blog._id)
                      
                    }}
                    
                    className="text-red-600 px-3 py-2 rounded-lg hover:text-red-700 cursor-pointer"
                  >
                  

                    <Edit />
                  </button>
                </div>
              </Link>
            ))}
        </ul>
      )}
    </div>
  );
}
