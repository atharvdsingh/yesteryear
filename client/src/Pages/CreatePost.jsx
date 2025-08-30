import axios from 'axios';
import { Axis3D, Loader, LoaderCircle, LoaderIcon, LucideBadgePoundSterling, LucideClockFading } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router';

export default function CreatePost() {
    axios.defaults.baseURL=import.meta.env.VITE_BLOG_URL
  const { register, handleSubmit, reset, watch } = useForm();
  const [loading,setLoading]=useState(false)

  const onSubmit = async (data) => {
    try {
        setLoading(true)
        const respons=await axios.post('create-blog',data,{
            withCredentials:true
        })

        toast.success('done')
        
        
    } catch (error) {
        toast.error(error.response.data.message)
        setLoading(false)

        
    }
    setLoading(false)
    reset();
  };

  const isPublished = watch("publish");

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
      <div className="max-w-3xl mx-auto py-10 px-4">
        {/* Header */}
        <div className="flex justify-between items-center  mb-6">
          <h1 className="text-2xl font-bold">Create a Blog Post</h1>
          <Link  className='text-2xl text-green-400 font-bold border-b border-gray-300 dark:border-gray-700 pb-4 mb-6' to={'/all-post'} >All Post</Link>
        </div>

        {/* Blog Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-1 text-sm font-medium">Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter blog title"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block mb-1 text-sm font-medium">Content</label>
            <textarea
              {...register("content", { required: true })}
              rows="8"
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your blog content..."
            />
          </div>

          {/* Publish Toggle */}
          <div className="flex items-center gap-6">
            <label className="relative inline-block w-[60px] h-[32px]">
              <input
                type="checkbox"
                {...register("publish")}
                className="sr-only peer"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gray-600 rounded-full peer-checked:bg-green-500 transition" />
              <div className="absolute top-[3px] left-[3px] w-[26px] h-[26px] bg-white rounded-full shadow-md transition-transform peer-checked:translate-x-[28px]" />
            </label>

            {/* Toggle Label */}
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              {isPublished ? 'Published' : 'Not Published'}
            </span>
          </div>

          {/* Submit */}
          <button disabled={loading}
            type="submit"
            className="px-6  flex justify-center items-center py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all "
          >
            {
                loading ?(
                    <span className='px-5 ' >
                        
                        <LoaderCircle className='animate-spin ' />
                    </span>
                ):('Post Blog')
            }
            
          </button>
        </form>
      </div>
    </div>
  );
}
